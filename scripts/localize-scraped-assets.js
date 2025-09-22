#!/usr/bin/env node
// Localizer for scraped pages: download external images/icons into scraped-content/assets
// and sanitize external runtime scripts (wix/thunderbolt/etc).

const fs = require('fs').promises;
const fssync = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { JSDOM } = require('jsdom');

const PAGES_DIR = path.join(__dirname, '..', 'scraped-content', 'pages');
const ASSETS_DIR = path.join(__dirname, '..', 'scraped-content', 'assets');

async function ensureDirs() {
  await fs.mkdir(ASSETS_DIR, { recursive: true });
}

function downloadToFile(url, dest) {
  return new Promise((resolve, reject) => {
    try {
      if (!url) {
        return reject(new Error('empty url'));
      }
      if (url.startsWith('//')) {
        url = 'https:' + url;
      }
      const client = url.startsWith('https') ? https : http;
      client
        .get(url, res => {
          if (!res || res.statusCode >= 400) {
            return reject(new Error('bad status ' + (res && res.statusCode)));
          }
          const fileStream = fssync.createWriteStream(dest);
          res.pipe(fileStream);
          fileStream.on('finish', () => fileStream.close(resolve));
          fileStream.on('error', reject);
        })
        .on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
}

async function uniqueFilename(basename) {
  let name = basename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  let candidate = name;
  let i = 1;
  while (true) {
    try {
      await fs.access(path.join(ASSETS_DIR, candidate));
      // file exists
      const ext = path.extname(name);
      const base = name.slice(0, name.length - ext.length);
      candidate = `${base}_${i}${ext}`;
      i++;
    } catch {
      return candidate;
    }
  }
}

function isExternalUrl(u) {
  return /^https?:\/\//i.test(u) || /^\/\//.test(u);
}

function sanitizeScriptTag(script) {
  const src = script.getAttribute('src') || '';
  const text = script.textContent || '';
  const externalBad =
    /(wixstatic|thunderbolt|frame\.js|parastorage|sentry|wix\.com|static\.wix|static\.parastorage)/i;
  if (src && externalBad.test(src)) {
    return true;
  }
  if (!src && externalBad.test(text)) {
    return true;
  }
  // also remove registration of service workers
  if (
    /navigator\.serviceWorker|serviceWorker\.register|window\.__TNR_ENABLE_SW/gi.test(
      text
    )
  ) {
    return true;
  }
  return false;
}

async function processPage(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  const dom = new JSDOM(raw);
  const doc = dom.window.document;

  // Images
  const imgs = Array.from(doc.querySelectorAll('img[src]'));
  for (const img of imgs) {
    const src = img.getAttribute('src');
    if (!src) {
      continue;
    }
    if (src.startsWith('data:')) {
      continue;
    } // already embedded
    if (!isExternalUrl(src)) {
      continue;
    } // local already
    try {
      const parsed = new URL(src.startsWith('//') ? 'https:' + src : src);
      const basename = path.basename(parsed.pathname) || 'image';
      const filename = await uniqueFilename(basename);
      const dest = path.join(ASSETS_DIR, filename);
      await downloadToFile(parsed.toString(), dest);
      // rewrite to relative path from pages dir
      const rel = path.posix.join('..', 'assets', filename);
      img.setAttribute('src', rel);
      // also set data-original for traceability
      img.setAttribute('data-original-src', src);
      console.log(`Downloaded image: ${src} -> ${filename}`);
    } catch (err) {
      console.warn(`Failed to download image ${src}: ${err.message}`);
    }
  }

  // Icons / favicons
  const icons = Array.from(
    doc.querySelectorAll(
      'link[rel~="icon"][href], link[rel~="shortcut icon"][href]'
    )
  );
  for (const link of icons) {
    const href = link.getAttribute('href');
    if (!href) {
      continue;
    }
    if (!isExternalUrl(href)) {
      continue;
    }
    try {
      const parsed = new URL(href.startsWith('//') ? 'https:' + href : href);
      const basename = path.basename(parsed.pathname) || 'icon';
      const filename = await uniqueFilename(basename);
      const dest = path.join(ASSETS_DIR, filename);
      await downloadToFile(parsed.toString(), dest);
      const rel = path.posix.join('..', 'assets', filename);
      link.setAttribute('href', rel);
      link.setAttribute('data-original-href', href);
      console.log(`Downloaded icon: ${href} -> ${filename}`);
    } catch (err) {
      console.warn(`Failed to download icon ${href}: ${err.message}`);
    }
  }

  // Remove scripts referencing Wix/runtime/thunderbolt and service worker registration
  const scripts = Array.from(doc.querySelectorAll('script'));
  let removedCount = 0;
  for (const script of scripts) {
    if (sanitizeScriptTag(script)) {
      script.parentNode.removeChild(script);
      removedCount++;
    }
  }
  if (removedCount) {
    console.log(
      `Removed ${removedCount} external runtime script(s) from ${path.basename(
        filePath
      )}`
    );
  }

  // Save modified HTML
  await fs.writeFile(filePath, dom.serialize(), 'utf8');
}

async function run() {
  await ensureDirs();
  const files = await fs.readdir(PAGES_DIR);
  for (const f of files) {
    if (!/\.html?$/.test(f)) {
      continue;
    }
    const full = path.join(PAGES_DIR, f);
    try {
      await processPage(full);
    } catch (err) {
      console.error(`Error processing ${f}: ${err.message}`);
    }
  }
  console.log('Localization complete. Assets in:', ASSETS_DIR);
}

if (require.main === module) {
  run().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
