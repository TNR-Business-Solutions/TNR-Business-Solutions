#!/usr/bin/env node
/** Extract FAQPage JSON-LD from homepage markdown into dist/jsonld/faq.json */
const fs = require('fs');
const path = require('path');
const homepagePath = path.join(__dirname, '..', 'content', 'homepage-draft.md');
const outDir = path.join(__dirname, '..', 'dist', 'jsonld');
fs.mkdirSync(outDir, { recursive: true });
let faq = null;
if (fs.existsSync(homepagePath)) {
  const raw = fs.readFileSync(homepagePath, 'utf8');
  // Primary: fenced json block
  let match = raw.match(
    /```json\r?\n({[\s\S]*?"@type"\s*:\s*"FAQPage"[\s\S]*?})\r?\n```/
  );
  if (!match) {
    // Fallback: find first JSON object containing "@type":"FAQPage"
    const objMatch = raw.match(/({[^{]*?"@type"\s*:\s*"FAQPage"[\s\S]*?})/);
    if (objMatch) {
      match = objMatch;
    }
  }
  if (match) {
    try {
      faq = JSON.parse(match[1]);
    } catch {
      /* ignore parse error */
    }
  }
}
if (faq) {
  fs.writeFileSync(path.join(outDir, 'faq.json'), JSON.stringify(faq, null, 2));
  console.log('Extracted FAQ schema to faq.json');
} else {
  console.log('No FAQ schema found in homepage markdown.');
}
