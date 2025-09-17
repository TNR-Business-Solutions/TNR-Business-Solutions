const fs = require('fs');
const path = require('path');
const https = require('https');
const { JSDOM } = require('jsdom');

class ComprehensiveSiteScraper {
  constructor() {
    this.baseUrl = 'https://www.tnrbusinesssolutions.com';
    this.scrapedData = {
      pages: [],
      images: [],
      styles: [],
      content: {},
      navigation: {},
      forms: [],
      seo: {},
    };
    this.processedUrls = new Set();
  }

  async scrapeSite() {
    console.log('🚀 Starting comprehensive site scraping...');

    try {
      // Start with homepage
      await this.scrapePage('/');

      // Discover and scrape all linked pages
      await this.discoverAndScrapePages();

      // Save all scraped data
      await this.saveScrapedData();

      console.log('✅ Site scraping completed successfully!');
      console.log(`📊 Scraped ${this.scrapedData.pages.length} pages`);
      console.log(`🖼️ Found ${this.scrapedData.images.length} images`);
      console.log(`🎨 Extracted ${this.scrapedData.styles.length} style files`);
    } catch (error) {
      console.error('❌ Error during scraping:', error);
    }
  }

  async scrapePage(urlPath) {
    if (this.processedUrls.has(urlPath)) {
      return;
    }

    const fullUrl = this.baseUrl + urlPath;
    console.log(`📄 Scraping: ${fullUrl}`);

    try {
      const html = await this.fetchPage(fullUrl);
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Extract page data
      const pageData = {
        url: urlPath,
        title: document.title,
        metaDescription: this.getMetaContent(document, 'description'),
        metaKeywords: this.getMetaContent(document, 'keywords'),
        headings: this.extractHeadings(document),
        content: this.extractMainContent(document),
        images: this.extractImages(document),
        links: this.extractLinks(document),
        forms: this.extractForms(document),
        styles: this.extractStyles(document),
        scripts: this.extractScripts(document),
        structuredData: this.extractStructuredData(document),
      };

      this.scrapedData.pages.push(pageData);
      this.processedUrls.add(urlPath);

      // Add images to global collection
      pageData.images.forEach(img => {
        if (
          !this.scrapedData.images.find(existing => existing.src === img.src)
        ) {
          this.scrapedData.images.push(img);
        }
      });

      // Add styles to global collection
      pageData.styles.forEach(style => {
        if (
          !this.scrapedData.styles.find(
            existing => existing.href === style.href
          )
        ) {
          this.scrapedData.styles.push(style);
        }
      });

      // Extract navigation
      if (urlPath === '/') {
        this.scrapedData.navigation = this.extractNavigation(document);
      }
    } catch (error) {
      console.error(`❌ Error scraping ${fullUrl}:`, error.message);
    }
  }

  async discoverAndScrapePages() {
    const allLinks = new Set();

    // Collect all internal links from scraped pages
    this.scrapedData.pages.forEach(page => {
      page.links.forEach(link => {
        if (link.href.startsWith('/') && !link.href.startsWith('//')) {
          allLinks.add(link.href);
        }
      });
    });

    // Scrape each discovered page
    for (const link of allLinks) {
      if (!this.processedUrls.has(link)) {
        await this.scrapePage(link);
        // Small delay to be respectful
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  async fetchPage(url) {
    return new Promise((resolve, reject) => {
      const request = https.get(
        url,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          },
        },
        response => {
          let data = '';
          response.on('data', chunk => (data += chunk));
          response.on('end', () => resolve(data));
        }
      );

      request.on('error', reject);
      request.setTimeout(10000, () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  getMetaContent(document, name) {
    const meta = document.querySelector(`meta[name="${name}"]`);
    return meta ? meta.getAttribute('content') : '';
  }

  extractHeadings(document) {
    const headings = [];
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
      document.querySelectorAll(tag).forEach(heading => {
        headings.push({
          level: parseInt(tag.charAt(1)),
          text: heading.textContent.trim(),
          id: heading.id || null,
        });
      });
    });
    return headings;
  }

  extractMainContent(document) {
    const main =
      document.querySelector('main') ||
      document.querySelector('#main') ||
      document.querySelector('.main');
    if (main) {
      return {
        html: main.innerHTML,
        text: main.textContent.trim(),
      };
    }
    return { html: '', text: '' };
  }

  extractImages(document) {
    const images = [];
    document.querySelectorAll('img').forEach(img => {
      images.push({
        src: img.src,
        alt: img.alt || '',
        title: img.title || '',
        width: img.width || null,
        height: img.height || null,
        className: img.className || '',
      });
    });
    return images;
  }

  extractLinks(document) {
    const links = [];
    document.querySelectorAll('a[href]').forEach(link => {
      links.push({
        href: link.href,
        text: link.textContent.trim(),
        title: link.title || '',
        className: link.className || '',
      });
    });
    return links;
  }

  extractForms(document) {
    const forms = [];
    document.querySelectorAll('form').forEach(form => {
      const formData = {
        action: form.action || '',
        method: form.method || 'get',
        className: form.className || '',
        inputs: [],
      };

      form.querySelectorAll('input, select, textarea').forEach(input => {
        formData.inputs.push({
          type: input.type || input.tagName.toLowerCase(),
          name: input.name || '',
          placeholder: input.placeholder || '',
          required: input.required || false,
          className: input.className || '',
        });
      });

      forms.push(formData);
    });
    return forms;
  }

  extractStyles(document) {
    const styles = [];
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      styles.push({
        href: link.href,
        media: link.media || 'all',
      });
    });
    return styles;
  }

  extractScripts(document) {
    const scripts = [];
    document.querySelectorAll('script[src]').forEach(script => {
      scripts.push({
        src: script.src,
        type: script.type || 'text/javascript',
      });
    });
    return scripts;
  }

  extractStructuredData(document) {
    const structuredData = [];
    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach(script => {
        try {
          structuredData.push(JSON.parse(script.textContent));
        } catch (e) {
          console.warn('Could not parse structured data:', e.message);
        }
      });
    return structuredData;
  }

  extractNavigation(document) {
    const nav =
      document.querySelector('nav') ||
      document.querySelector('.nav') ||
      document.querySelector('.navigation');
    if (nav) {
      return {
        html: nav.innerHTML,
        links: this.extractLinks(nav),
      };
    }
    return { html: '', links: [] };
  }

  async saveScrapedData() {
    const outputDir = path.join(__dirname, '..', 'scraped-content');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save main data file
    fs.writeFileSync(
      path.join(outputDir, 'complete-site-data.json'),
      JSON.stringify(this.scrapedData, null, 2)
    );

    // Save individual page files
    this.scrapedData.pages.forEach(page => {
      const filename =
        page.url === '/'
          ? 'homepage'
          : page.url.replace(/\//g, '-').replace(/^-/, '');
      fs.writeFileSync(
        path.join(outputDir, `${filename}.json`),
        JSON.stringify(page, null, 2)
      );
    });

    // Save images list
    fs.writeFileSync(
      path.join(outputDir, 'images.json'),
      JSON.stringify(this.scrapedData.images, null, 2)
    );

    // Save styles list
    fs.writeFileSync(
      path.join(outputDir, 'styles.json'),
      JSON.stringify(this.scrapedData.styles, null, 2)
    );

    // Save navigation
    fs.writeFileSync(
      path.join(outputDir, 'navigation.json'),
      JSON.stringify(this.scrapedData.navigation, null, 2)
    );

    console.log('💾 All scraped data saved to scraped-content/ directory');
  }
}

// Run the scraper
const scraper = new ComprehensiveSiteScraper();
scraper.scrapeSite().catch(console.error);
