const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PAGES_DIR = path.resolve(__dirname, '..', 'scraped-content', 'pages');
const OUT_DIR = path.resolve(__dirname, '..', 'scraped-content', 'styles');

async function ensureDir(d) {
  await fs.promises.mkdir(d, { recursive: true });
}

async function listHtmlFiles(dir) {
  const files = await fs.promises.readdir(dir);
  return files.filter(f => f.endsWith('.html')).map(f => path.join(dir, f));
}

async function capturePageStyles(browser, filePath) {
  const page = await browser.newPage();
  const fileUrl = 'file://' + filePath;

  try {
    await page.goto(fileUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // collect all <link rel="stylesheet"> hrefs and inline <style> contents
    const styles = await page.evaluate(() => {
      const out = { inline: [], external: [] };
      document.querySelectorAll('style').forEach(s => out.inline.push(s.innerHTML));
      document.querySelectorAll('link[rel="stylesheet"]').forEach(l => {
        if (l.href) out.external.push(l.href);
      });
      return out;
    });

    // try to fetch external stylesheet contents
    const externalContents = [];
    for (const href of styles.external) {
      try {
        const resp = await page.goto(href, { waitUntil: 'networkidle2', timeout: 20000 });
        if (resp && resp.ok()) {
          const text = await resp.text();
          externalContents.push({ href, text });
        }
      } catch (e) {
        // ignore fetch failures
      }
    }

    // build output filename
    const base = path.basename(filePath, '.html');
    const outFile = path.join(OUT_DIR, `${base}.css`);

    let combined = '';
    if (styles.inline.length) combined += '/* inline styles */\n' + styles.inline.join('\n') + '\n';
    if (externalContents.length) {
      combined += '\n/* external styles fetched at runtime */\n';
      for (const e of externalContents) {
        combined += `/* ${e.href} */\n` + e.text + '\n';
      }
    }

    if (!combined.trim()) {
      return { file: outFile, written: false };
    }

    await fs.promises.writeFile(outFile, combined, 'utf8');
    return { file: outFile, written: true };
  } finally {
    try { await page.close(); } catch (e) {}
  }
}

(async function main() {
  await ensureDir(OUT_DIR);
  const htmlFiles = await listHtmlFiles(PAGES_DIR);
  if (!htmlFiles.length) {
    console.log('No scraped pages to process.');
    process.exit(0);
  }

  const browser = await puppeteer.launch({ headless: true });
  try {
    for (const fp of htmlFiles) {
      process.stdout.write(`Capturing styles for ${path.basename(fp)}... `);
      const result = await capturePageStyles(browser, fp);
      if (result.written) console.log(`saved -> ${path.relative(process.cwd(), result.file)}`);
      else console.log('none found');
    }
  } finally {
    await browser.close();
  }
})();
