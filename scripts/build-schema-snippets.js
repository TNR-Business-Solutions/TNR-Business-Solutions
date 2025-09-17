#!/usr/bin/env node
/** Produce ready-to-paste HTML <script> tags for various schema combos */
const fs = require('fs');
const path = require('path');
const outDir = path.join(__dirname,'..','dist','jsonld');
function readJSON(name){
  const p = path.join(outDir,name);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p,'utf8')) : null;
}

const org = readJSON('organization.json');
const local = readJSON('localbusiness.json');
const faq = readJSON('faq.json');
const insurance = readJSON('insuranceagency.json');
const services = readJSON('services-schemas.json');

function scriptTag(objOrArr){
  return `<script type="application/ld+json">${JSON.stringify(objOrArr,null,2)}</script>`;
}
const snippets = {};
if (org && local) {snippets.global_basic = scriptTag([org, local]);}
if (org && local && faq) {snippets.homepage = scriptTag([org, local, faq]);}
if (insurance) {snippets.insurance_page = scriptTag(insurance);}
if (services) {snippets.all_services_batch = scriptTag(services);}

fs.writeFileSync(path.join(outDir,'schema-snippets.json'), JSON.stringify(snippets,null,2));
console.log('Wrote schema-snippets.json with keys:', Object.keys(snippets).join(', '));
