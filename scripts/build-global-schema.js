#!/usr/bin/env node
/**
 * Aggregate Organization, LocalBusiness, FAQ (if present), InsuranceAgency (optional), and Services schemas.
 * Output: dist/jsonld/global-structured-data.json
 */
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'dist', 'jsonld');
const files = ['organization.json','localbusiness.json','insuranceagency.json','services-schemas.json','homepage-combined.json'];
const seen = new Set();
const aggregated = [];

function add(obj){
  if (!obj || typeof obj !== 'object') {return;}
  const id = obj['@id'] || (obj['@type']+Math.random());
  if (seen.has(id)) {return;}
  seen.add(id);
  aggregated.push(obj);
}

for (const f of files) {
  const p = path.join(outDir, f);
  if (!fs.existsSync(p)) {continue;}
  const data = JSON.parse(fs.readFileSync(p,'utf8'));
  if (Array.isArray(data)) {data.forEach(add);} else {add(data);}
}

fs.writeFileSync(path.join(outDir,'global-structured-data.json'), JSON.stringify(aggregated, null, 2));
console.log('Wrote global-structured-data.json with', aggregated.length, 'objects');
