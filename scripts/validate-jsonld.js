#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

function extractJsonBlocks(markdown) {
  const blocks = [];
  const regex = /```json\n([\s\S]*?)```/g;
  let m;
  while ((m = regex.exec(markdown)) !== null) {
    blocks.push(m[1]);
  }
  return blocks;
}

let errors = 0;
const files = glob.sync('**/*.md', { ignore: 'node_modules/**' });
files.forEach(f => {
  const md = fs.readFileSync(f, 'utf8');
  const blocks = extractJsonBlocks(md);
  blocks.forEach((b, i) => {
    try {
      JSON.parse(b);
    } catch (e) {
      console.error(`Invalid JSON in ${f} block #${i + 1}: ${e.message}`);
      errors++;
    }
  });
});
if (errors > 0) {
  console.error(`JSON-LD validation failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('All JSON code blocks parsed successfully.');
}
