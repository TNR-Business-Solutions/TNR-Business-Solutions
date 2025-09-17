#!/usr/bin/env node

/**
 * Optimized HTTP Server for TNR Business Solutions Website
 * Professional business website with clean, fast serving
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
};

// Get MIME type based on file extension
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

// Serve static files
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
            <title>404 - File Not Found</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
              .error { color: #e74c3c; font-size: 24px; }
              .message { color: #7f8c8d; margin-top: 20px; }
              .back-link { margin-top: 30px; }
              .back-link a { color: #3498db; text-decoration: none; }
              .back-link a:hover { text-decoration: underline; }
            </style>
          </head>
          <body>
            <div class="error">🚫 404 - File Not Found</div>
            <div class="message">The requested file "${path.basename(
              filePath
            )}" could not be found.</div>
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

    res.writeHead(200, { 'Content-Type': mimeType });
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

  // Handle root path
  if (pathname === '/') {
    pathname = '/dist/preview/index.html';
  }

  // Handle asset requests - redirect to dist/preview/assets
  if (pathname.startsWith('/assets/')) {
    pathname = '/dist/preview' + pathname;
  }
  
  // Handle HTML page requests - redirect to dist/preview
  if (pathname.startsWith('/dist/preview/')) {
    // Keep the path as is - it's already correct
  } else if (pathname.endsWith('.html') && !pathname.startsWith('/dist/')) {
    // If it's an HTML file not in dist/preview, redirect to dist/preview
    pathname = '/dist/preview' + pathname;
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
  console.log('🚀 TNR Business Solutions Website Server Started!');
  console.log('================================================');
  console.log(`📍 Server running at: http://localhost:${PORT}`);
  console.log(`🏠 Homepage: http://localhost:${PORT}`);
  console.log(
    `📦 Packages: http://localhost:${PORT}/dist/preview/packages.html`
  );
  console.log(
    `🏠 Home Insurance: http://localhost:${PORT}/dist/preview/home-insurance.html`
  );
  console.log('================================================');
  console.log('💼 Professional business website - Optimized');
  console.log('🎯 Digital marketing and insurance services');
  console.log('📱 Mobile responsive design included');
  console.log('================================================');
  console.log('Press Ctrl+C to stop the server');
});

// Handle server errors
server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `❌ Port ${PORT} is already in use. Please try a different port or stop the existing server.`
    );
    console.log('💡 You can also try: node serve.js 3001');
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
