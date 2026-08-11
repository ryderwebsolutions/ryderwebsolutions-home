// Initializes per-lead checkpoint files in state/ for every lead in data/sample_50.json.
// Idempotent/resumable: never overwrites a file that already exists (so re-running after
// an interruption does not lose completed work or re-queue DONE leads).

const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const STATE_DIR = path.join(ROOT, 'state');
const sample = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'sample_50.json'), 'utf8'));

let created = 0, skipped = 0;
for (const lead of sample) {
  const file = path.join(STATE_DIR, `${lead.lead_id}.json`);
  if (fs.existsSync(file)) { skipped++; continue; }
  const r = lead.row;
  const record = {
    lead_id: lead.lead_id,
    name: r.name,
    phone: r.phone,
    normalized_phone: lead.normalized_phone,
    address: r.address,
    city: r.city,
    state: r.state,
    category: r.category,
    place_id: r.place_id,
    status: 'PENDING', // PENDING | IN_PROGRESS | DONE | FAILED
    email: '',
    instagram_url: '',
    facebook_url: '',
    // Google Maps URL is already authoritative in the source dataset itself (it *is* a
    // Google Maps export keyed by place_id) - carried forward, not re-searched.
    google_business_url: r.location_link || '',
    other_listing_url: '',
    enrichment_source: r.location_link ? `google_business_url:${r.location_link} (existing dataset / place_id ${r.place_id})` : '',
    match_confidence: r.location_link ? 'HIGH' : 'LOW',
    enrichment_status: 'PARTIAL',
    notes: '',
    processed_at: null,
  };
  fs.writeFileSync(file, JSON.stringify(record, null, 2));
  created++;
}
console.log(`Initialized ${created} new state files, skipped ${skipped} already present.`);
