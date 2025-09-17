#!/usr/bin/env node
/**
 * Generate Service schema objects for each service markdown file.
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const servicesDir = path.join(__dirname, '..', 'content', 'services');
const outDir = path.join(__dirname, '..', 'dist', 'jsonld');
fs.mkdirSync(outDir, { recursive: true });

const baseUrl = 'https://www.tnrbusinesssolutions.com';

function titleCase(slug) {
  return slug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
}

const serviceSchemas = [];
for (const file of fs.readdirSync(servicesDir)) {
  if (!file.endsWith('.md')) {continue;}
  const full = path.join(servicesDir, file);
  const raw = fs.readFileSync(full,'utf8');
  const parsed = matter(raw);
  const slug = file.replace(/\.md$/,'');
  const name = parsed.data.title || titleCase(slug);
  const description = (parsed.content.split('\n').find(l => l.trim()) || name).slice(0,300);
  serviceSchemas.push({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/services/${slug}#service`,
    'name': name,
    'url': `${baseUrl}/services/${slug}`,
    'description': description,
    'provider': { '@id': `${baseUrl}/#org` }
  });
}
fs.writeFileSync(path.join(outDir,'services-schemas.json'), JSON.stringify(serviceSchemas, null, 2));
for (const s of serviceSchemas) {
  const slug = s['@id'].split('/services/')[1].split('#')[0];
  fs.writeFileSync(path.join(outDir, `service-${slug}.json`), JSON.stringify(s, null, 2));
}
console.log('Generated services-schemas.json and', serviceSchemas.length, 'individual Service schema files');
