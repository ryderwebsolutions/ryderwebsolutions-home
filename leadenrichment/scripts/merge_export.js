// Merges original spreadsheet columns with per-lead checkpoint state (state/*.json)
// for every lead in data/sample_50.json, writes the enriched CSV, and prints a summary.
// Re-runnable at any time: only reflects whatever is currently checkpointed, so it can be
// run mid-way through a batch to inspect progress without disturbing in-flight work.

const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const OUT_CSV = process.argv[2]
  ? path.join(ROOT, process.argv[2])
  : path.join(ROOT, 'garageleads_enriched_test_50.csv');

const sample = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'sample_50.json'), 'utf8'));

const NEW_COLS = [
  'email',
  'instagram_url',
  'facebook_url',
  'google_business_url',
  'other_listing_url',
  'enrichment_source',
  'match_confidence',
  'enrichment_status',
];

function csvEscape(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

const originalCols = Object.keys(sample[0].row);
const header = [...originalCols, ...NEW_COLS];
const lines = [header.map(csvEscape).join(',')];

const summary = {
  total: 0,
  email: 0,
  instagram: 0,
  facebook: 0,
  googleBusiness: 0,
  otherListing: 0,
  noneFound: 0,
  needsReview: 0,
  notFound: 0,
  enriched: 0,
  partial: 0,
  stateMissing: 0,
};

for (const lead of sample) {
  const stateFile = path.join(ROOT, 'state', `${lead.lead_id}.json`);
  let s;
  if (fs.existsSync(stateFile)) {
    s = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  } else {
    summary.stateMissing++;
    s = { email: '', instagram_url: '', facebook_url: '', google_business_url: '', other_listing_url: '', enrichment_source: '', match_confidence: 'LOW', enrichment_status: 'NOT_FOUND' };
  }
  summary.total++;
  if (s.email) summary.email++;
  if (s.instagram_url) summary.instagram++;
  if (s.facebook_url) summary.facebook++;
  if (s.google_business_url) summary.googleBusiness++;
  if (s.other_listing_url) summary.otherListing++;
  if (!s.email && !s.instagram_url && !s.facebook_url && !s.other_listing_url) summary.noneFound++;
  if (s.enrichment_status === 'NEEDS_REVIEW') summary.needsReview++;
  if (s.enrichment_status === 'NOT_FOUND') summary.notFound++;
  if (s.enrichment_status === 'ENRICHED') summary.enriched++;
  if (s.enrichment_status === 'PARTIAL') summary.partial++;

  const row = [...originalCols.map((c) => lead.row[c]), ...NEW_COLS.map((c) => s[c] || '')];
  lines.push(row.map(csvEscape).join(','));
}

fs.writeFileSync(OUT_CSV, lines.join('\r\n'), 'utf8');

console.log('Wrote', OUT_CSV);
console.log(JSON.stringify(summary, null, 2));
