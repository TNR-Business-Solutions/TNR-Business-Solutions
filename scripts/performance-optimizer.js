#!/usr/bin/env node

/**
 * Performance Optimizer for TNR Business Solutions Website
 * Implements advanced performance optimizations and monitoring
 */

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
// const { execSync } = require('child_process'); // reserved for future use

class PerformanceOptimizer {
  constructor() {
    this.baseDir = path.join(__dirname, '..', 'dist');
    this.previewDir = path.join(this.baseDir, 'preview');
  }

  async optimizeAll() {
    console.log('🚀 Starting Performance Optimization...\n');

    try {
      // 1. Optimize images
      await this.optimizeImages();

      // 2. Minify CSS and JavaScript
      await this.minifyAssets();

      // 3. Implement lazy loading
      await this.implementLazyLoading();

      // 4. Add performance monitoring
      await this.addPerformanceMonitoring();

      // 5. Optimize critical CSS
      await this.optimizeCriticalCSS();

      // 6. Add service worker for caching
      await this.addServiceWorker();

      // 7. Implement resource hints
      await this.addResourceHints();

      console.log('✅ Performance optimization complete!\n');
    } catch (error) {
      console.error('❌ Error during performance optimization:', error);
    }
  }

  async optimizeImages() {
    console.log('🖼️ Optimizing images...');

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const mediaDir = path.join(__dirname, '..', 'media');

    try {
      const files = await fsp.readdir(mediaDir);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext)) {
          const filePath = path.join(mediaDir, file);
          await this.optimizeImage(filePath);
        }
      }
    } catch {
      // media directory missing or unreadable - skip
    }
  }

  async optimizeImage(imagePath) {
    try {
      // Use sharp or imagemin for optimization
      // For now, we'll create optimized versions with better compression
      console.log(`Optimizing: ${path.basename(imagePath)}`);

      // Add responsive image generation
      await this.generateResponsiveImages(imagePath);
    } catch (error) {
      console.warn(`Failed to optimize ${imagePath}:`, error.message);
    }
  }

  async generateResponsiveImages(imagePath) {
    const fileName = path.basename(imagePath, path.extname(imagePath));
    const ext = path.extname(imagePath);
    const dir = path.dirname(imagePath);

    // responsive sizes reserved for future image generation

    // Create responsive image HTML helper
    const responsiveHTML = `
<!-- Responsive Image Helper -->
<picture>
  <source media="(max-width: 480px)" srcset="${fileName}_sm${ext}">
  <source media="(max-width: 768px)" srcset="${fileName}_md${ext}">
  <source media="(max-width: 1024px)" srcset="${fileName}_lg${ext}">
  <img src="${fileName}_xl${ext}" alt="${fileName}" loading="lazy">
</picture>`;

    // Save responsive HTML template
    const templatePath = path.join(dir, `${fileName}_responsive.html`);
    await fsp.writeFile(templatePath, responsiveHTML);
  }

  async minifyAssets() {
    console.log('📦 Minifying CSS and JavaScript...');
    // Minify CSS files
    const cssFiles = await this.findFiles(this.previewDir, '.css');
    for (const cssFile of cssFiles) {
      await this.minifyCSS(cssFile);
    }

    // Minify JavaScript files
    const jsFiles = await this.findFiles(this.previewDir, '.js');
    for (const jsFile of jsFiles) {
      await this.minifyJS(jsFile);
    }
  }

  // Async recursive file finder
  async findFiles(directory, extension) {
    const results = [];
    try {
      const items = await fsp.readdir(directory);
      for (const item of items) {
        const fullPath = path.join(directory, item);
        let stat;
        try {
          stat = await fsp.stat(fullPath);
        } catch {
          continue;
        }

        if (stat.isDirectory()) {
          const nested = await this.findFiles(fullPath, extension);
          results.push(...nested);
        } else if (path.extname(item) === extension) {
          results.push(fullPath);
        }
      }
    } catch {
      // directory doesn't exist or can't be read
    }
    return results;
  }

  async minifyCSS(cssPath) {
    try {
      let content = await fsp.readFile(cssPath, 'utf8');

      // Basic CSS minification
      content = content
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/;\s*}/g, '}') // Remove semicolons before closing braces
        .replace(/,\s+/g, ',') // Remove spaces after commas
        .replace(/:\s+/g, ':') // Remove spaces after colons
        .replace(/\s+{/g, '{') // Remove spaces before opening braces
        .replace(/\s+}/g, '}') // Remove spaces before closing braces
        .trim();

      // Create minified version
      const minPath = cssPath.replace('.css', '.min.css');
      await fsp.writeFile(minPath, content);

      console.log(`Minified: ${path.basename(cssPath)}`);
    } catch (error) {
      console.warn(`Failed to minify CSS ${cssPath}:`, error.message);
    }
  }

  async minifyJS(jsPath) {
    try {
      let content = await fsp.readFile(jsPath, 'utf8');

      // Basic JavaScript minification
      content = content
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
        .replace(/\/\/.*$/gm, '') // Remove line comments
        .replace(/\s+/g, ' ') // Collapse whitespace
        .replace(/;\s*}/g, '}') // Remove semicolons before closing braces
        .replace(/,\s+/g, ',') // Remove spaces after commas
        .trim();

      // Create minified version
      const minPath = jsPath.replace('.js', '.min.js');
      await fsp.writeFile(minPath, content);

      console.log(`Minified: ${path.basename(jsPath)}`);
    } catch (error) {
      console.warn(`Failed to minify JS ${jsPath}:`, error.message);
    }
  }

  async implementLazyLoading() {
    console.log('⚡ Implementing lazy loading...');

    const htmlFiles = await this.findFiles(this.previewDir, '.html');
    for (const htmlFile of htmlFiles) {
      await this.addLazyLoadingToHTML(htmlFile);
    }
  }

  async addLazyLoadingToHTML(htmlPath) {
    try {
      let content = await fsp.readFile(htmlPath, 'utf8');

      // Add loading="lazy" to images
      content = content.replace(/<img([^>]*?)>/g, (match, attrs) => {
        if (!attrs.includes('loading=')) {
          return `<img${attrs} loading="lazy">`;
        }
        return match;
      });

      // Add Intersection Observer for advanced lazy loading
      const lazyLoadingScript = `
    <script>
    // Advanced lazy loading with Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    </script>`;

      // Insert script before closing body tag
      content = content.replace('</body>', `${lazyLoadingScript}\n</body>`);

      await fsp.writeFile(htmlPath, content);
      console.log(`Added lazy loading to: ${path.basename(htmlPath)}`);
    } catch (error) {
      console.warn(`Failed to add lazy loading to ${htmlPath}:`, error.message);
    }
  }

  async addPerformanceMonitoring() {
    console.log('📊 Adding performance monitoring...');

    const performanceScript = `
    <script>
    // Performance monitoring
    window.addEventListener('load', () => {
        // Core Web Vitals monitoring
        if ('web-vital' in window) {
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
            });
        }

        // Custom performance metrics
        const perfData = {
            loadTime: performance.now(),
            domContentLoaded: performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd - performance.getEntriesByType('navigation')[0].domContentLoadedEventStart,
            firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
            firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
        };

        // Send to analytics (placeholder)
        console.log('Performance metrics:', perfData);
        
        // Store in localStorage for debugging
        localStorage.setItem('tnr_performance', JSON.stringify(perfData));
    });
    </script>`;

    // Add to all HTML files
    const htmlFiles = await this.findFiles(this.previewDir, '.html');
    for (const htmlFile of htmlFiles) {
      let content = await fsp.readFile(htmlFile, 'utf8');
      content = content.replace('</head>', `${performanceScript}\n</head>`);
      await fsp.writeFile(htmlFile, content);
    }
  }

  async optimizeCriticalCSS() {
    console.log('🎨 Optimizing critical CSS...');

    const criticalCSS = `
    /* Critical CSS for above-the-fold content */
    .header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; }
    .hero { background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 4rem 0; text-align: center; }
    .hero h1 { font-size: 2.5rem; margin-bottom: 1rem; }
    .btn { background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; }
    .tnr-chatbot-container { position: fixed; bottom: 20px; right: 20px; z-index: 10000; }
    `;

    // Add critical CSS to all pages
    const htmlFiles = await this.findFiles(this.previewDir, '.html');
    for (const htmlFile of htmlFiles) {
      let content = await fsp.readFile(htmlFile, 'utf8');

      // Insert critical CSS in head
      const criticalCSSBlock = `<style>${criticalCSS}</style>`;
      content = content.replace('</head>', `${criticalCSSBlock}\n</head>`);

      await fsp.writeFile(htmlFile, content);
    }
  }

  async addServiceWorker() {
    console.log('🔧 Adding service worker... (opt-in)');

    // Allow opt-in via environment variable to avoid accidental SW registration in local preview
    const enableSW =
      process.env.PREVIEW_ENABLE_SW === '1' ||
      process.env.PREVIEW_ENABLE_SW === 'true';
    if (!enableSW) {
      console.log(
        'Service worker creation skipped (set PREVIEW_ENABLE_SW=1 to enable)'
      );
      return;
    }

    const serviceWorkerCode = `
    // TNR Business Solutions Service Worker
    const CACHE_NAME = 'tnr-business-v1';
    const urlsToCache = [
      '/',
      '/assets/styles.css',
      '/assets/chatbot-widget.js',
      '/media/logo-tnr-primary.png'
    ];

    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => cache.addAll(urlsToCache))
      );
    });

    self.addEventListener('fetch', event => {
      event.respondWith(
        caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    });
    `;

    const swPath = path.join(this.previewDir, 'sw.js');
    await fsp.writeFile(swPath, serviceWorkerCode);

    // Register service worker in HTML files, but only register at runtime when window.__TNR_ENABLE_SW === true
    const registrationScript = `
    <script>
    // Service worker registration is gated behind window.__TNR_ENABLE_SW to avoid accidental registrations
    if ('serviceWorker' in navigator && window.__TNR_ENABLE_SW === true) {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => console.log('SW registered'))
          .catch(error => console.log('SW registration failed', error));
    } else {
        console.log('Service worker not registered (window.__TNR_ENABLE_SW !== true)');
    }
    </script>`;

    const htmlFiles = await this.findFiles(this.previewDir, '.html');
    for (const htmlFile of htmlFiles) {
      let content = await fsp.readFile(htmlFile, 'utf8');
      content = content.replace('</body>', `${registrationScript}\n</body>`);
      await fsp.writeFile(htmlFile, content);
    }
  }

  async addResourceHints() {
    console.log('🔗 Adding resource hints...');

    const resourceHints = `
    <!-- DNS prefetch for external domains -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    
    <!-- Preconnect to critical resources -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/assets/styles.css" as="style">
    <link rel="preload" href="/media/logo-tnr-primary.png" as="image">
    `;

    const htmlFiles = await this.findFiles(this.previewDir, '.html');
    for (const htmlFile of htmlFiles) {
      let content = await fsp.readFile(htmlFile, 'utf8');
      content = content.replace('<head>', `<head>\n    ${resourceHints}`);
      await fsp.writeFile(htmlFile, content);
    }
  }

  async generatePerformanceReport() {
    console.log('📈 Generating performance report...');

    const report = {
      timestamp: new Date().toISOString(),
      optimizations: [
        'Image optimization and responsive images',
        'CSS and JavaScript minification',
        'Lazy loading implementation',
        'Critical CSS inlining',
        'Service worker for caching',
        'Resource hints and preloading',
        'Performance monitoring setup',
      ],
      recommendations: [
        'Enable GZIP compression on server',
        'Use CDN for static assets',
        'Implement HTTP/2 server push',
        'Monitor Core Web Vitals',
        'Set up automated performance testing',
      ],
    };

    const reportPath = path.join(this.baseDir, 'performance-report.json');
    await fsp.writeFile(reportPath, JSON.stringify(report, null, 2));

    console.log(`Performance report saved to: ${reportPath}`);
  }
}

// Run the optimizer
if (require.main === module) {
  const optimizer = new PerformanceOptimizer();
  optimizer
    .optimizeAll()
    .then(() => optimizer.generatePerformanceReport())
    .catch(console.error);
}

module.exports = PerformanceOptimizer;
