#!/usr/bin/env node
/**
 * Build a lightweight static preview site into dist/preview
 * - Converts homepage markdown to HTML
 * - Converts services markdown to HTML pages
 * - Injects structured data (Organization + LocalBusiness + FAQ for homepage, Service schema per service)
 */
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const matter = require('gray-matter');
let remark, remarkHtml;
async function mdToHtml(md) {
  if (!remark) {
    const r = await import('remark');
    remark = r.remark;
    const h = await import('remark-html');
    remarkHtml = h.default || h;
  }
  const file = await remark().use(remarkHtml).process(md);
  return String(file);
}
const ROOT = path.join(__dirname, '..');
const CONTENT = path.join(ROOT, 'content');
const DIST = path.join(ROOT, 'dist', 'preview');
fs.mkdirSync(DIST, { recursive: true });

async function readJSON(p) {
  const txt = await fsp.readFile(p, 'utf8');
  return JSON.parse(txt);
}
const jsonldDir = path.join(ROOT, 'dist', 'jsonld');
let org = null;
let local = null;
let faq = null;
let tokens = {};

function stripTags(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function truncate(str, len) {
  if (typeof str !== 'string') {
    return '';
  }

  if (str.length <= len) {
    return str;
  }

  return str.slice(0, len - 1).trim() + '…';
}
async function wrapHtml(title, body, schemas, metaOverride) {
  const script = `<script type="application/ld+json">${JSON.stringify(
    schemas,
    null,
    2
  ).replace(/<\/script>/gi, '<\\/script>')}</script>`;
  const c = tokens.colors || {};
  const f = tokens.fonts || {};
  const r = tokens.radius || {};
  const s = tokens.spacing || {};
  const plain = stripTags(body);
  const metaDesc = metaOverride || truncate(plain, 155);
  const siteUrl = 'https://www.tnrbusinesssolutions.com';
  const pageUrl =
    title.toLowerCase() === 'homepage preview' ||
    title.toLowerCase().includes('tnr business solutions')
      ? siteUrl + '/'
      : siteUrl +
        '/' +
        encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
  const ogImage = siteUrl + (tokens.ogImage || '/media/hero-home.webp');
  // header snippet
  let headerHTML = '';
  const headerPath = path.join(ROOT, 'data', 'header-snippet.html');
  try {
    await fsp.access(headerPath);
    headerHTML = await fsp.readFile(headerPath, 'utf8');
  } catch (err) {
    // file missing or unreadable — fallback will be used
  }
  if (!headerHTML) {
    headerHTML = `<header class="preview-fallback"><h1>TNR Business Solutions</h1><nav><a href="/index.html">Home</a><a href="/services/index.html">Services</a></nav></header>`;
  }
  // footer snippet
  let footerHTML = '';
  const footerPath = path.join(ROOT, 'data', 'footer-snippet.html');
  try {
    await fsp.access(footerPath);
    footerHTML = await fsp.readFile(footerPath, 'utf8');
  } catch (err) {
    // missing footer — fallback will be used
  }
  if (!footerHTML) {
    footerHTML = `<footer class="preview-fallback"><div>&copy; ${new Date().getFullYear()} TNR Business Solutions · Preview mode</div></footer>`;
  }
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<title>${title}</title>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="description" content="${metaDesc}"/>
<link rel="canonical" href="${pageUrl}"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="TNR Business Solutions"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${metaDesc}"/>
<meta property="og:url" content="${pageUrl}"/>
<meta property="og:image" content="${ogImage}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${title}"/>
<meta name="twitter:description" content="${metaDesc}"/>
<meta name="twitter:image" content="${ogImage}"/>
${script}
<!-- load exported site assets (preview will normalize /assets/ -> assets/) -->
<link rel="stylesheet" href="assets/styles.css" />
<link rel="stylesheet" href="assets/styles-global.css" />
<link rel="stylesheet" href="assets/menu-dropdown.css" />
<style>
  :root { --c-bg:${c.background || '#fff'}; --c-bg-alt:${
    c.backgroundAlt || '#f5f7fa'
  }; --c-text:${c.text || '#1e293b'}; --c-text-light:${
    c.textLight || '#64748b'
  }; --c-primary:${c.primary || '#0f4c81'}; --c-primary-accent:${
    c.primaryAccent || '#1976d2'
  }; --c-secondary:${c.secondary || '#ffb347'}; --c-border:${
    c.border || '#e2e8f0'
  }; --radius-sm:${r.sm || '4px'}; --radius-md:${r.md || '8px'}; --radius-lg:${
    r.lg || '16px'
  }; --space-md:${s.md || '16px'}; }
  *{box-sizing:border-box;} body{font-family:${
    f.base || 'Arial,Helvetica,sans-serif'
  };margin:0;background:var(--c-bg);color:var(--c-text);line-height:1.55;} a{text-decoration:none;color:var(--c-primary-accent);} a:hover{color:var(--c-primary);} img{max-width:100%;height:auto;border-radius:var(--radius-sm);} 
  .preview-fallback{background:linear-gradient(90deg,var(--c-primary),var(--c-primary-accent));color:#fff;padding:14px 32px;display:flex;align-items:center;gap:40px;}
  .preview-fallback h1{font-family:${
    f.heading || f.base
  };font-size:1.15rem;margin:0;letter-spacing:.5px;}
  main{max-width:1180px;margin:0 auto;padding:40px 28px;}
  footer.preview-fallback{margin-top:64px;}
  h1,h2,h3,h4{font-family:${
    f.heading || f.base
  };line-height:1.2;margin-top:2.2em;font-weight:600;} h1{margin-top:0;}
  table{border-collapse:collapse;width:100%;margin:24px 0;} td,th{border:1px solid var(--c-border);padding:8px 10px;text-align:left;font-size:.92rem;}
  pre{background:#111;color:#eee;padding:16px;border-radius:var(--radius-sm);overflow:auto;font-size:.85rem;}
  code{font-family:${f.mono || 'monospace'};}
  .service-grid{display:grid;gap:28px;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));margin:40px 0;}
  .card{background:#fff;border:1px solid var(--c-border);padding:18px 18px 22px;border-radius:var(--radius-md);display:flex;flex-direction:column;gap:12px;position:relative;box-shadow:0 4px 12px rgba(0,0,0,0.06);} 
  .card h3{margin:0;font-size:1.05rem;}
  .badge{display:inline-block;background:var(--c-secondary);color:#222;padding:2px 8px;border-radius:999px;font-size:.62rem;letter-spacing:.5px;text-transform:uppercase;font-weight:700;}
  .card a.button{align-self:flex-start;background:var(--c-primary);color:#fff;padding:8px 14px;border-radius:var(--radius-sm);font-size:.8rem;font-weight:600;box-shadow:0 2px 4px rgba(0,0,0,0.15);} .card a.button:hover{background:var(--c-primary-accent);} 
  .hero-img{margin:8px 0 32px;box-shadow:0 6px 16px rgba(0,0,0,.15);} 
  .cta-bar{background:linear-gradient(90deg,var(--c-primary),var(--c-primary-accent));color:#fff;padding:36px;border-radius:var(--radius-lg);display:flex;flex-direction:column;gap:14px;margin:56px 0;}
  .cta-bar h2{margin:0;font-size:1.4rem;color:#fff;}
  .cta-bar a.button{background:#fff;color:var(--c-primary);padding:12px 22px;border-radius:var(--radius-md);text-decoration:none;font-weight:600;box-shadow:0 2px 6px rgba(0,0,0,.25);} .cta-bar a.button:hover{background:var(--c-secondary);color:#222;}
  .divider{height:1px;background:var(--c-border);margin:56px 0;}
  @media (max-width:720px){.preview-fallback{flex-direction:column;align-items:flex-start;gap:12px;} main{padding:32px 20px;} .service-grid{grid-template-columns:repeat(auto-fill,minmax(180px,1fr));}}
  </style></head><body>${headerHTML}<main>${body}</main>${footerHTML}</body></html>`;
}

(async () => {
  // Load JSON-LD and tokens asynchronously early in the build
  try {
    org = await readJSON(path.join(jsonldDir, 'organization.json'));
  } catch (err) {
    console.debug &&
      console.debug(
        'organization.json not loaded:',
        err && err.message ? err.message : err
      );
  }
  try {
    local = await readJSON(path.join(jsonldDir, 'localbusiness.json'));
  } catch (err) {
    console.debug &&
      console.debug(
        'localbusiness.json not loaded:',
        err && err.message ? err.message : err
      );
  }
  try {
    faq = await readJSON(path.join(jsonldDir, 'faq.json'));
  } catch (err) {
    console.debug &&
      console.debug(
        'faq.json not loaded:',
        err && err.message ? err.message : err
      );
  }
  try {
    tokens = await readJSON(path.join(ROOT, 'data', 'design-tokens.json'));
  } catch (err) {
    console.debug &&
      console.debug(
        'design-tokens.json not loaded:',
        err && err.message ? err.message : err
      );
  }
  // Copy media assets for preview
  const mediaDir = path.join(ROOT, 'media');
  if (fs.existsSync(mediaDir)) {
    const mediaTarget = path.join(DIST, 'media');
    fs.mkdirSync(mediaTarget, { recursive: true });
    for (const f of fs.readdirSync(mediaDir)) {
      try {
        fs.copyFileSync(path.join(mediaDir, f), path.join(mediaTarget, f));
      } catch (err) {
        // Non-fatal: log which file failed to copy
        console.warn(
          'copy media failed for',
          f,
          err && err.message ? err.message : err
        );
      }
    }
  }

  // Homepage
  const hpPath = path.join(CONTENT, 'homepage-draft.md');
  if (fs.existsSync(hpPath)) {
    const raw = fs.readFileSync(hpPath, 'utf8');
    const parsed = matter(raw);
    const body = await mdToHtml(parsed.content);
    const schemas = faq ? [org, local, faq] : [org, local];
    const pageTitle =
      parsed.data && parsed.data.metaTitle
        ? parsed.data.metaTitle
        : parsed.data && parsed.data.title
        ? parsed.data.title
        : 'Homepage Preview';
    const pageMeta =
      parsed.data && parsed.data.metaDescription
        ? parsed.data.metaDescription
        : null;
    const html = await wrapHtml(pageTitle, body, schemas, pageMeta);
    fs.writeFileSync(path.join(DIST, 'index.html'), html);
  }
  // Services index & pages
  const servicesDir = path.join(CONTENT, 'services');
  const serviceSchemasAll = readJSON(
    path.join(jsonldDir, 'services-schemas.json')
  );
  const svcOutDir = path.join(DIST, 'services');
  fs.mkdirSync(svcOutDir, { recursive: true });
  for (const file of fs.readdirSync(servicesDir)) {
    if (!file.endsWith('.md')) {
      continue;
    }
    const raw = fs.readFileSync(path.join(servicesDir, file), 'utf8');
    const parsed = matter(raw);
    const slug = file.replace(/\.md$/, '');
    const html = await mdToHtml(parsed.content);
    const serviceSchema = serviceSchemasAll.find(s =>
      (s['@id'] || '').includes(`/services/${slug}#`)
    );
    const schemas = [org, local];
    if (serviceSchema) {
      schemas.push(serviceSchema);
    }
    const pageHtml = await wrapHtml(
      slug,
      `<h1>${parsed.data.title || slug}</h1>${html}`,
      schemas
    );
    fs.writeFileSync(path.join(svcOutDir, slug + '.html'), pageHtml);
  }

  const servicesGrid = serviceSchemasAll
    .map(s => {
      const slug = s['@id'].split('/services/')[1].split('#')[0];
      const { name } = s;
      return `<div class=card><span class=badge>Service</span><h3><a href="${slug}.html">${name}</a></h3><p>${(
        s.description || ''
      )
        .replace(/^#\s*/, '')
        .slice(
          0,
          110
        )}...</p><a class=button href="${slug}.html">View</a></div>`;
    })
    .join('');

  const servicesIndexHtml = await wrapHtml(
    'Services',
    `<h1>Services</h1><div class="service-grid">${servicesGrid}</div>`,
    [org, local]
  );
  fs.writeFileSync(path.join(svcOutDir, 'index.html'), servicesIndexHtml);

  // Post-process generated HTML files to convert leading-root asset paths into relative paths
  // This makes the preview work from both file:// and http://localhost:8080/ without broken /media or /assets references.
  function normalizeHtmlPaths(dir) {
    const items = fs.readdirSync(dir);
    for (const it of items) {
      const p = path.join(dir, it);
      const stat = fs.statSync(p);

      if (stat.isDirectory()) {
        normalizeHtmlPaths(p);
        continue;
      }

      if (!it.endsWith('.html')) {
        continue;
      }

      try {
        let txt = fs.readFileSync(p, 'utf8');
        // replace src="/media/..." and src='/media/...' preserving quote style
        txt = txt.replace(/src=("|')\/media\//g, (m, q) => `src=${q}media/`);
        txt = txt.replace(/href=("|')\/media\//g, (m, q) => `href=${q}media/`);
        // assets
        txt = txt.replace(/src=("|')\/assets\//g, (m, q) => `src=${q}assets/`);
        txt = txt.replace(
          /href=("|')\/assets\//g,
          (m, q) => `href=${q}assets/`
        );
        // url('/media/...') or url("/media/...") -> url('media/...') preserving quote
        txt = txt.replace(
          /url\(("|')?\/media\//g,
          (m, q) => `url(${q || ''}media/`
        );
        txt = txt.replace(
          /url\(("|')?\/assets\//g,
          (m, q) => `url(${q || ''}assets/`
        );

        fs.writeFileSync(p, txt, 'utf8');
      } catch (e) {
        console.error(
          'normalizeHtmlPaths error for',
          p,
          e && e.message ? e.message : e
        );
      }
    }
  }

  // Ensure relative asset paths for file:// preview usage
  normalizeHtmlPaths(DIST);
  console.log('Preview build complete: dist/preview');
})();
