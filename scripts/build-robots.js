#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const outDir = path.join(__dirname,'..','dist','preview');
fs.mkdirSync(outDir,{recursive:true});
const lines = [
  'User-agent: *',
  'Disallow:',
  'Allow: /',
  'Sitemap: https://www.tnrbusinesssolutions.com/sitemap.xml'
];
fs.writeFileSync(path.join(outDir,'robots.txt'), lines.join('\n'));
console.log('robots.txt written');