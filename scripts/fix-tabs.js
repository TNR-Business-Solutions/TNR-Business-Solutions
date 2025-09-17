#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

const files = glob.sync('**/*.md', { ignore: 'node_modules/**' });
let changed = 0;
files.forEach(f => {
  const txt = fs.readFileSync(f, 'utf8');
  if (txt.includes('\t')) {
    const out = txt.replace(/\t/g, '  '); // replace tabs with two spaces
    if (out !== txt) {
      fs.writeFileSync(f, out, 'utf8');
      console.log('Fixed tabs in', f);
      changed++;
    }
  }
});
console.log(`Completed. Files changed: ${changed}`);
