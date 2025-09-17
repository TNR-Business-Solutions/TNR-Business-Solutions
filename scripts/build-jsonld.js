#!/usr/bin/env node
/**
 * Build consolidated JSON-LD artifacts from data/org-profile.json.
 * Outputs:
 *  dist/jsonld/organization.json
 *  dist/jsonld/localbusiness.json
 *  dist/jsonld/insuranceagency.json (scaffold)
 *  dist/jsonld/homepage-combined.json (org + local + faq placeholder)
 */
const fs = require('fs');
const path = require('path');

const ORG_PROFILE = path.join(__dirname, '..', 'data', 'org-profile.json');
if (!fs.existsSync(ORG_PROFILE)) {
  console.error('org-profile.json not found.');
  process.exit(1);
}
const profile = JSON.parse(fs.readFileSync(ORG_PROFILE, 'utf8'));

function hoursToOpeningSpec(hours) {
  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const openWeek = weekdays.every(d => hours[d] && hours[d].length === 2);
  if (!openWeek) {
    return [];
  }
  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: hours.monday[0],
      closes: hours.monday[1],
    },
  ];
}

function socialLinks(socialObj) {
  return Object.values(socialObj || {}).filter(Boolean);
}

const baseUrl = 'https://www.tnrbusinesssolutions.com';

const logoUrl = profile.logo
  ? baseUrl + profile.logo
  : baseUrl + '/media/logo.png';
const heroUrl = profile.heroImage
  ? baseUrl + profile.heroImage
  : baseUrl + '/media/hero-home.webp';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': baseUrl + '/#org',
  name: profile.brandName || profile.legalName,
  url: baseUrl + '/',
  logo: {
    '@type': 'ImageObject',
    url: logoUrl,
  },
  sameAs: socialLinks(profile.social),
  description:
    'Integrated digital marketing, web design, branding, SEO and personal & commercial insurance (no health) in Greensburg, PA and Westmoreland County.',
  foundingDate: String(profile.foundingDate || ''),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: profile.telephone,
      areaServed: 'US-PA',
      availableLanguage: ['en'],
    },
  ],
};

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': baseUrl + '/#local',
  name: profile.brandName,
  image: heroUrl,
  url: baseUrl + '/',
  telephone: profile.telephone,
  priceRange: profile.priceRange,
  description:
    'Local partner for digital marketing, SEO, web & branding, AI marketing enablement, and comprehensive insurance solutions (excluding health).',
  address: {
    '@type': 'PostalAddress',
    streetAddress: profile.streetAddress,
    addressLocality: profile.locality,
    addressRegion: profile.region,
    postalCode: profile.postalCode,
    addressCountry: profile.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: profile.geo.lat,
    longitude: profile.geo.lng,
  },
  areaServed: [
    'Greensburg PA',
    'Latrobe PA',
    'Jeannette PA',
    'Mount Pleasant PA',
    'Irwin PA',
    'North Huntingdon PA',
    'Ligonier PA',
    'Hempfield Township PA',
    'Youngwood PA',
    'Delmont PA',
    'Murrysville PA',
  ],
  openingHoursSpecification: hoursToOpeningSpec(profile.hours),
  sameAs: socialLinks(profile.social),
  additionalType: [
    'https://schema.org/ProfessionalService',
    'https://schema.org/ConsultingService',
  ],
};

const insuranceAgency = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  '@id': baseUrl + '/insurance-services#agency',
  name: profile.brandName + ' Insurance Services',
  url: baseUrl + '/insurance-services',
  parentOrganization: { '@id': organization['@id'] },
  image: heroUrl.replace('hero-home', 'hero-insurance'), // heuristic swap
  telephone: profile.telephone,
  address: localBusiness.address,
  areaServed: 'US-PA',
  description:
    'Personal (auto, home, life, umbrella, specialty) and commercial (BOP, GL, property, auto, cyber, workers’ comp*) insurance solutions. No health insurance.',
};
if (profile.insuranceLicense) {
  insuranceAgency['identifier'] = {
    '@type': 'PropertyValue',
    propertyID: 'Insurance License',
    value: profile.insuranceLicense,
  };
}

// FAQ extraction (from homepage file if present)
let faqEntities = [];
try {
  const homepage = fs.readFileSync(
    path.join(__dirname, '..', 'content', 'homepage-draft.md'),
    'utf8'
  );
  let match = homepage.match(
    /```json\r?\n({[\s\S]*?"@type"\s*:\s*"FAQPage"[\s\S]*?})\r?\n```/
  );
  if (!match) {
    const fallback = homepage.match(
      /({[^{]*?"@type"\s*:\s*"FAQPage"[\s\S]*?})/
    );
    if (fallback) {
      match = fallback;
    }
  }
  if (match) {
    const parsed = JSON.parse(match[1]);
    if (parsed['@type'] === 'FAQPage') {
      faqEntities = [parsed];
    }
  }
} catch {
  /* ignore */
}

const combinedHome = [organization, localBusiness, ...faqEntities];

const outDir = path.join(__dirname, '..', 'dist', 'jsonld');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'organization.json'),
  JSON.stringify(organization, null, 2)
);
fs.writeFileSync(
  path.join(outDir, 'localbusiness.json'),
  JSON.stringify(localBusiness, null, 2)
);
fs.writeFileSync(
  path.join(outDir, 'insuranceagency.json'),
  JSON.stringify(insuranceAgency, null, 2)
);
fs.writeFileSync(
  path.join(outDir, 'homepage-combined.json'),
  JSON.stringify(combinedHome, null, 2)
);

console.log('JSON-LD build complete:');
console.log(
  Object.fromEntries(
    fs.readdirSync(outDir).map(f => {
      const { size } = fs.statSync(path.join(outDir, f));
      return [f, size + ' bytes'];
    })
  )
);
