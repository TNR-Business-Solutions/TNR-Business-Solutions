#!/usr/bin/env node
/** Build a basic sitemap.xml covering home + services + insurance */
const fs = require('fs');
const path = require('path');
const servicesDir = path.join(__dirname,'..','content','services');
const outDir = path.join(__dirname,'..','dist');
fs.mkdirSync(outDir,{recursive:true});
const baseUrl = 'https://www.tnrbusinesssolutions.com';
const urls = new Set([
  `${baseUrl}/`,
  `${baseUrl}/services`,
  `${baseUrl}/bundles`,
  `${baseUrl}/services/insurance-services`
]);
for (const f of fs.readdirSync(servicesDir)) {
  if (f.endsWith('.md')) {
    const slug = f.replace(/\.md$/,'');
    urls.add(`${baseUrl}/services/${slug}`);
  }
}
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`+
  Array.from(urls).sort().map(u=>`  <url><loc>${u}</loc></url>`).join('\n')+
  '\n</urlset>\n';
fs.writeFileSync(path.join(outDir,'sitemap.xml'), xml);
console.log('Generated sitemap.xml with', urls.size, 'urls');
