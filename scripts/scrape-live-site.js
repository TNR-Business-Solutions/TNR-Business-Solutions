#!/usr/bin/env node
/**
 * Live Site Scraper for TNR Business Solutions
 * Scans www.tnrbusinesssolutions.com and extracts styling, content, and structure
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

class LiveSiteScraper {
  constructor() {
    this.baseUrl = 'https://www.tnrbusinesssolutions.com';
    this.outputDir = path.join(__dirname, '..', 'scraped-content');
    this.stylesDir = path.join(this.outputDir, 'styles');
    this.pagesDir = path.join(this.outputDir, 'pages');
    this.assetsDir = path.join(this.outputDir, 'assets');

    this.scrapedData = {
      pages: [],
      styles: [],
      assets: [],
      structure: {},
      colors: new Set(),
      fonts: new Set(),
      components: [],
    };

    this.ensureDirectories();
  }

  ensureDirectories() {
    [this.outputDir, this.stylesDir, this.pagesDir, this.assetsDir].forEach(
      dir => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      }
    );
  }

  log(message, type = 'info') {
    const icons = {
      info: '🔍',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      scrape: '🕷️',
      style: '🎨',
    };
    console.log(`${icons[type]} ${message}`);
  }

  async fetchPage(url) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;

      protocol
        .get(url, res => {
          let data = '';

          res.on('data', chunk => {
            data += chunk;
          });

          res.on('end', () => {
            resolve({
              url,
              content: data,
              statusCode: res.statusCode,
              headers: res.headers,
            });
          });
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async scrapePage(url) {
    try {
      this.log(`Scraping: ${url}`, 'scrape');
      const response = await this.fetchPage(url);

      if (response.statusCode !== 200) {
        this.log(`Failed to fetch ${url}: ${response.statusCode}`, 'error');
        return null;
      }

      const dom = new JSDOM(response.content);
      const document = dom.window.document;

      // Extract page data
      const pageData = {
        url,
        title: document.title,
        metaDescription: this.getMetaContent(document, 'description'),
        metaKeywords: this.getMetaContent(document, 'keywords'),
        headings: this.extractHeadings(document),
        links: this.extractLinks(document),
        images: this.extractImages(document),
        styles: this.extractStyles(document),
        scripts: this.extractScripts(document),
        content: this.extractMainContent(document),
        structure: this.analyzeStructure(document),
      };

      // Save page content
      const filename = this.urlToFilename(url);
      fs.writeFileSync(
        path.join(this.pagesDir, `${filename}.html`),
        response.content
      );

      this.scrapedData.pages.push(pageData);
      this.log(`✅ Scraped: ${url}`, 'success');

      return pageData;
    } catch (error) {
      this.log(`Error scraping ${url}: ${error.message}`, 'error');
      return null;
    }
  }

  getMetaContent(document, name) {
    const meta = document.querySelector(`meta[name="${name}"]`);
    return meta ? meta.getAttribute('content') : '';
  }

  extractHeadings(document) {
    const headings = {};
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
      const elements = document.querySelectorAll(tag);
      headings[tag] = Array.from(elements).map(el => ({
        text: el.textContent.trim(),
        id: el.id,
        className: el.className,
      }));
    });
    return headings;
  }

  extractLinks(document) {
    const links = [];
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        links.push({
          text: link.textContent.trim(),
          href: href,
          className: link.className,
          target: link.target,
        });
      }
    });
    return links;
  }

  extractImages(document) {
    const images = [];
    document.querySelectorAll('img').forEach(img => {
      images.push({
        src: img.src,
        alt: img.alt,
        className: img.className,
        width: img.width,
        height: img.height,
      });
    });
    return images;
  }

  extractStyles(document) {
    const styles = [];

    // Inline styles
    document.querySelectorAll('style').forEach(style => {
      styles.push({
        type: 'inline',
        content: style.textContent,
      });
    });

    // External stylesheets
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      styles.push({
        type: 'external',
        href: link.href,
        media: link.media,
      });
    });

    return styles;
  }

  extractScripts(document) {
    const scripts = [];
    document.querySelectorAll('script').forEach(script => {
      if (script.src) {
        scripts.push({
          type: 'external',
          src: script.src,
        });
      } else if (script.textContent.trim()) {
        scripts.push({
          type: 'inline',
          content: script.textContent.trim(),
        });
      }
    });
    return scripts;
  }

  extractMainContent(document) {
    // Try to find main content areas
    const mainSelectors = [
      'main',
      '.main-content',
      '.content',
      '#content',
      '.page-content',
    ];
    let mainContent = null;

    for (const selector of mainSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        mainContent = element.innerHTML;
        break;
      }
    }

    if (!mainContent) {
      // Fallback to body content
      mainContent = document.body.innerHTML;
    }

    return mainContent;
  }

  analyzeStructure(document) {
    const structure = {
      header: this.analyzeElement(document.querySelector('header')),
      navigation: this.analyzeElement(document.querySelector('nav')),
      main: this.analyzeElement(document.querySelector('main')),
      footer: this.analyzeElement(document.querySelector('footer')),
      sections: [],
    };

    // Analyze sections
    document.querySelectorAll('section').forEach(section => {
      structure.sections.push(this.analyzeElement(section));
    });

    return structure;
  }

  analyzeElement(element) {
    if (!element) {
      return null;
    }

    return {
      tagName: element.tagName.toLowerCase(),
      id: element.id,
      className: element.className,
      textContent: element.textContent.trim().substring(0, 100),
      children: element.children.length,
      attributes: this.getElementAttributes(element),
    };
  }

  getElementAttributes(element) {
    const attributes = {};
    for (const attr of element.attributes) {
      attributes[attr.name] = attr.value;
    }
    return attributes;
  }

  async downloadStyles(styles) {
    this.log('Downloading external stylesheets...', 'style');

    for (const style of styles) {
      if (style.type === 'external') {
        try {
          const url = style.href.startsWith('http')
            ? style.href
            : `${this.baseUrl}${style.href}`;
          const response = await this.fetchPage(url);

          if (response.statusCode === 200) {
            const filename = path.basename(style.href);
            fs.writeFileSync(
              path.join(this.stylesDir, filename),
              response.content
            );

            this.scrapedData.styles.push({
              filename,
              url: style.href,
              content: response.content,
            });

            this.log(`✅ Downloaded: ${filename}`, 'success');
          }
        } catch (error) {
          this.log(
            `Error downloading ${style.href}: ${error.message}`,
            'error'
          );
        }
      }
    }
  }

  analyzeColors() {
    this.log('Analyzing color scheme...', 'style');

    this.scrapedData.styles.forEach(style => {
      const content = style.content;

      // Extract hex colors
      const hexColors = content.match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g);
      if (hexColors) {
        hexColors.forEach(color => this.scrapedData.colors.add(color));
      }

      // Extract rgb/rgba colors
      const rgbColors = content.match(/rgba?\([^)]+\)/g);
      if (rgbColors) {
        rgbColors.forEach(color => this.scrapedData.colors.add(color));
      }

      // Extract named colors
      const namedColors = content.match(
        /\b(red|blue|green|yellow|orange|purple|pink|brown|black|white|gray|grey)\b/g
      );
      if (namedColors) {
        namedColors.forEach(color => this.scrapedData.colors.add(color));
      }
    });
  }

  analyzeFonts() {
    this.log('Analyzing font families...', 'style');

    this.scrapedData.styles.forEach(style => {
      const content = style.content;

      // Extract font-family declarations
      const fontMatches = content.match(/font-family:\s*([^;]+)/g);
      if (fontMatches) {
        fontMatches.forEach(match => {
          const fonts = match.replace('font-family:', '').trim();
          this.scrapedData.fonts.add(fonts);
        });
      }
    });
  }

  generateStyleReport() {
    const report = `# Live Site Style Analysis Report

## Color Palette
${Array.from(this.scrapedData.colors)
  .map(color => `- ${color}`)
  .join('\n')}

## Font Families
${Array.from(this.scrapedData.fonts)
  .map(font => `- ${font}`)
  .join('\n')}

## Pages Analyzed
${this.scrapedData.pages
  .map(page => `- ${page.url} (${page.title})`)
  .join('\n')}

## Style Files
${this.scrapedData.styles.map(style => `- ${style.filename}`).join('\n')}

## Recommendations
1. Extract primary color scheme from live site
2. Apply consistent typography
3. Match layout structure
4. Preserve responsive design patterns
5. Maintain brand consistency
`;

    fs.writeFileSync(
      path.join(this.outputDir, 'style-analysis-report.md'),
      report
    );
  }

  async discoverPages(startUrl) {
    this.log('Discovering pages to scrape...', 'scrape');

    const pagesToScrape = [startUrl];
    const discoveredPages = new Set([startUrl]);

    // Start with homepage
    const homepage = await this.scrapePage(startUrl);
    if (homepage) {
      // Extract internal links
      homepage.links.forEach(link => {
        if (
          link.href.startsWith('/') ||
          link.href.includes('tnrbusinesssolutions.com')
        ) {
          let fullUrl = link.href;
          if (link.href.startsWith('/')) {
            fullUrl = `${this.baseUrl}${link.href}`;
          }

          if (
            !discoveredPages.has(fullUrl) &&
            fullUrl.includes('tnrbusinesssolutions.com')
          ) {
            pagesToScrape.push(fullUrl);
            discoveredPages.add(fullUrl);
          }
        }
      });
    }

    // Limit to first 10 pages to avoid overwhelming
    const limitedPages = pagesToScrape.slice(0, 10);

    this.log(`Found ${limitedPages.length} pages to scrape`, 'info');
    return limitedPages;
  }

  urlToFilename(url) {
    return (
      url
        .replace(this.baseUrl, '')
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/^-+|-+$/g, '') || 'homepage'
    );
  }

  async run() {
    this.log('🕷️ Starting Live Site Scraping', 'scrape');
    this.log('=====================================');

    try {
      // Discover pages
      const pagesToScrape = await this.discoverPages(this.baseUrl);

      // Scrape each page
      for (const url of pagesToScrape) {
        await this.scrapePage(url);
        // Small delay to be respectful
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Download external stylesheets
      const allStyles = this.scrapedData.pages.flatMap(page => page.styles);
      await this.downloadStyles(allStyles);

      // Analyze styling
      this.analyzeColors();
      this.analyzeFonts();

      // Generate report
      this.generateStyleReport();

      this.log('\n📊 Scraping Complete!', 'success');
      this.log('=====================');
      this.log(`Pages scraped: ${this.scrapedData.pages.length}`, 'info');
      this.log(`Styles downloaded: ${this.scrapedData.styles.length}`, 'info');
      this.log(`Colors found: ${this.scrapedData.colors.size}`, 'info');
      this.log(`Fonts found: ${this.scrapedData.fonts.size}`, 'info');
      this.log(`Output directory: ${this.outputDir}`, 'info');
    } catch (error) {
      this.log(`Scraping failed: ${error.message}`, 'error');
    }
  }
}

// Run if called directly
if (require.main === module) {
  const scraper = new LiveSiteScraper();
  scraper.run();
}

module.exports = LiveSiteScraper;
