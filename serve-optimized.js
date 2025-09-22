#!/usr/bin/env node

/**
 * Optimized HTTP Server for TNR Business Solutions Website
 * Clean, efficient serving with proper path handling
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

let PORT = 3000;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.webp': 'image/webp',
};

// Get MIME type based on file extension
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

// Serve static files with caching headers
function serveFile(res, filePath) {
  const mimeType = getMimeType(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>404 - Page Not Found</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #1a3d0a; color: #f4e4a6; }
              .error { font-size: 24px; margin-bottom: 20px; }
              .back-link a { color: #f4e4a6; text-decoration: none; padding: 10px 20px; border: 1px solid #f4e4a6; border-radius: 5px; }
              .back-link a:hover { background: #f4e4a6; color: #1a3d0a; }
            </style>
          </head>
          <body>
            <div class="error">🚫 404 - Page Not Found</div>
            <p>The requested page could not be found.</p>
            <div class="back-link">
              <a href="/">← Back to Home</a>
            </div>
          </body>
          </html>
        `);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
      return;
    }

    // Set cache headers for static assets
    if (
      mimeType.includes('css') ||
      mimeType.includes('js') ||
      mimeType.includes('image')
    ) {
      res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour cache
    }

    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': data.length,
    });
    res.end(data);
  });
}

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // Add CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle root path - serve homepage
  if (pathname === '/' || pathname === '/index.html') {
    pathname = '/dist/preview/index.html';
  }

  // Handle specific routes without .html extension
  else if (pathname === '/packages') {
    pathname = '/dist/preview/packages.html';
  } else if (pathname === '/about') {
    pathname = '/dist/preview/about.html';
  } else if (pathname === '/contact') {
    pathname = '/dist/preview/contact.html';
  } else if (pathname === '/careers') {
    pathname = '/dist/preview/careers.html';
  } else if (pathname === '/blog') {
    pathname = '/dist/preview/blog.html';
  } else if (pathname === '/web-design') {
    pathname = '/dist/preview/web-design.html';
  } else if (pathname === '/seo-services') {
    pathname = '/dist/preview/seo-services.html';
  } else if (pathname === '/auto-insurance') {
    pathname = '/dist/preview/auto-insurance.html';
  } else if (pathname === '/business-insurance') {
    pathname = '/dist/preview/business-insurance.html';
  } else if (pathname === '/life-insurance') {
    pathname = '/dist/preview/life-insurance.html';
  } else if (pathname === '/home-insurance') {
    pathname = '/dist/preview/home-insurance.html';
  } else if (pathname === '/paid-advertising') {
    pathname = '/dist/preview/paid-advertising.html';
  } else if (pathname === '/social-media') {
    pathname = '/dist/preview/social-media.html';
  } else if (pathname === '/email-marketing') {
    pathname = '/dist/preview/email-marketing.html';
  } else if (pathname === '/content-creation') {
    pathname = '/dist/preview/content-creation.html';
  } else if (pathname === '/bop-insurance') {
    pathname = '/dist/preview/bop-insurance.html';
  }

  // Handle HTML pages - serve from dist/preview
  else if (pathname.endsWith('.html') && !pathname.startsWith('/dist/')) {
    pathname = '/dist/preview' + pathname;
  }

  // Handle assets - serve from dist/preview/assets
  else if (pathname.startsWith('/assets/')) {
    pathname = '/dist/preview' + pathname;
  }

  // Handle media files - serve from root media folder
  else if (pathname.startsWith('/media/')) {
    // Keep pathname as is - media files are in root /media/ folder
  }

  // Remove leading slash and build file path
  const filePath = path.join(__dirname, pathname.substring(1));

  // Security check - prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Serve the file
  serveFile(res, filePath);
});

// Start the server
server.listen(PORT, () => {
  console.log('🚀 TNR Business Solutions - Optimized Server Started!');
  console.log('================================================');
  console.log(`📍 Server running at: http://localhost:${PORT}`);
  console.log(`🏠 Homepage: http://localhost:${PORT}`);
  console.log(`📦 Packages: http://localhost:${PORT}/packages.html`);
  console.log(
    `🏠 Home Insurance: http://localhost:${PORT}/home-insurance.html`
  );
  console.log('================================================');
  console.log('💼 Professional business website - Full Capacity');
  console.log('🎯 Digital marketing and insurance services');
  console.log('📱 Mobile responsive design included');
  console.log('⚡ Optimized performance with caching');
  console.log('================================================');
  console.log('Press Ctrl+C to stop the server');
});

// Handle server errors
server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `❌ Port ${PORT} is already in use. Please try a different port or stop the existing server.`
    );
    console.log('💡 You can also try: node serve-optimized.js 3001');
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server stopped successfully');
    process.exit(0);
  });
});

// Handle command line arguments for custom port
const customPort = process.argv[2];
if (customPort && !isNaN(customPort)) {
  PORT = parseInt(customPort);
}
