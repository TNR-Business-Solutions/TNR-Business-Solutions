#!/usr/bin/env node
// Very lightweight accessibility scan for preview output
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist', 'preview');
if (!fs.existsSync(DIST)) {
  console.error('Preview not built. Run preview:build first.');
  process.exit(1);
}
const issues = [];
function scanFile(f) {
  const html = fs.readFileSync(f, 'utf8');
  // Anchor with no text & no aria-label
  const anchorRegex = /<a\b([^>]*?)>(.*?)<\/a>/gis;
  let m;
  while ((m = anchorRegex.exec(html))) {
    const attrs = m[1];
    const inner = m[2].replace(/<[^>]*>/g, '').trim();
    if (!inner && !/aria-label="[^"]+"/i.test(attrs)) {
      issues.push({
        file: path.relative(DIST, f),
        type: 'empty-link',
        snippet: m[0].slice(0, 120),
      });
    }
  }
  // Images missing alt
  const imgRegex = /<img\b([^>]*?)>/gis;
  while ((m = imgRegex.exec(html))) {
    const attrs = m[1];
    if (!/alt="[^"]*"/i.test(attrs)) {
      issues.push({
        file: path.relative(DIST, f),
        type: 'img-missing-alt',
        snippet: m[0].slice(0, 120),
      });
    }
  }
}
function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (entry.endsWith('.html')) {
      scanFile(full);
    }
  }
}
walk(DIST);
if (issues.length) {
  console.log('A11Y ISSUES FOUND:', issues.length);
  console.log(JSON.stringify(issues, null, 2));
  process.exitCode = 1;
} else {
  console.log('No basic accessibility issues detected.');
}
