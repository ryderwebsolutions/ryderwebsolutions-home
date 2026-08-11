// Selects a representative, deduplicated sample of leads from garageleads.xlsx
// Output: data/sample_50.json  (array of {lead_id, row})
// Also writes data/full_dataset.json (all rows w/ lead_id + normalized_phone) for future full-run reuse.

const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'garageleads.xlsx');
const SAMPLE_SIZE = parseInt(process.argv[2] || '50', 10);
const SEED = 42;

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(SEED);
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizePhone(raw) {
  if (!raw) return '';
  let digits = String(raw).replace(/\D/g, '');
  if (digits.startsWith('353')) digits = '0' + digits.slice(3);
  else if (digits.startsWith('00353')) digits = '0' + digits.slice(5);
  return digits;
}

const wb = XLSX.readFile(SRC);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

const allLeads = rows.map((row, idx) => ({
  lead_id: 'L' + String(idx + 1).padStart(5, '0'),
  normalized_phone: normalizePhone(row.phone),
  row,
}));

fs.writeFileSync(path.join(ROOT, 'data', 'full_dataset.json'), JSON.stringify(allLeads, null, 2));

// Dedup by normalized phone (keep first occurrence); track duplicates for reporting
const seenPhones = new Map();
const duplicatePhoneGroups = [];
const deduped = [];
for (const lead of allLeads) {
  const key = lead.normalized_phone || `__noPhone_${lead.lead_id}`;
  if (seenPhones.has(key)) {
    seenPhones.get(key).push(lead.lead_id);
  } else {
    seenPhones.set(key, [lead.lead_id]);
    deduped.push(lead);
  }
}
for (const [key, ids] of seenPhones) {
  if (ids.length > 1 && !key.startsWith('__noPhone_')) duplicatePhoneGroups.push({ phone: key, lead_ids: ids });
}

// Stratify by county (state field, e.g. "Co. Monaghan") proportional to group size, capped at SAMPLE_SIZE
const byState = new Map();
for (const lead of deduped) {
  const state = lead.row.state || 'Unknown';
  if (!byState.has(state)) byState.set(state, []);
  byState.get(state).push(lead);
}

const states = shuffle([...byState.keys()]);
const totalDeduped = deduped.length;
let allocations = states.map((s) => {
  const groupSize = byState.get(s).length;
  return { state: s, target: Math.max(1, Math.round((groupSize / totalDeduped) * SAMPLE_SIZE)) };
});

// Trim/pad allocations to hit exactly SAMPLE_SIZE
let sum = allocations.reduce((a, b) => a + b.target, 0);
let i = 0;
while (sum > SAMPLE_SIZE) {
  if (allocations[i % allocations.length].target > 1) {
    allocations[i % allocations.length].target--;
    sum--;
  }
  i++;
}
i = 0;
while (sum < SAMPLE_SIZE) {
  const s = allocations[i % allocations.length].state;
  if (allocations[i % allocations.length].target < byState.get(s).length) {
    allocations[i % allocations.length].target++;
    sum++;
  }
  i++;
  if (i > 10000) break;
}

const sample = [];
for (const alloc of allocations) {
  const pool = shuffle(byState.get(alloc.state));
  // prefer category diversity within the state
  const seenCategories = new Set();
  const picked = [];
  for (const lead of pool) {
    if (picked.length >= alloc.target) break;
    const cat = lead.row.category || '';
    if (!seenCategories.has(cat)) {
      seenCategories.add(cat);
      picked.push(lead);
    }
  }
  for (const lead of pool) {
    if (picked.length >= alloc.target) break;
    if (!picked.includes(lead)) picked.push(lead);
  }
  sample.push(...picked);
}

const finalSample = shuffle(sample).slice(0, SAMPLE_SIZE);

fs.writeFileSync(path.join(ROOT, 'data', 'sample_50.json'), JSON.stringify(finalSample, null, 2));
fs.writeFileSync(
  path.join(ROOT, 'data', 'duplicate_phone_groups.json'),
  JSON.stringify(duplicatePhoneGroups, null, 2)
);

console.log(`Total rows in spreadsheet: ${allLeads.length}`);
console.log(`Unique-phone rows after dedup: ${deduped.length}`);
console.log(`Duplicate phone groups found: ${duplicatePhoneGroups.length}`);
console.log(`Sample selected: ${finalSample.length}`);
console.log('States represented in sample:', [...new Set(finalSample.map((l) => l.row.state))].join(', '));
console.log('Categories represented in sample:', [...new Set(finalSample.map((l) => l.row.category))].join(', '));
