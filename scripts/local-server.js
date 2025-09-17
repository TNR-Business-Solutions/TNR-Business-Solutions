#!/usr/bin/env node
/**
 * Local Development Server for TNR Business Solutions Website
 * Serves the website locally for testing and development
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

class LocalServer {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.host = 'localhost';
    this.publicDir = path.join(__dirname, '..', 'dist', 'preview');
    this.mediaDir = path.join(__dirname, '..', 'media');
    this.contentDir = path.join(__dirname, '..', 'content');

    this.mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.mp4': 'video/mp4',
      '.pdf': 'application/pdf',
      '.txt': 'text/plain',
      '.md': 'text/markdown',
    };
  }

  log(message, type = 'info') {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      server: '🚀',
    };
    console.log(`${icons[type]} ${message}`);
  }

  getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return this.mimeTypes[ext] || 'application/octet-stream';
  }

  serveFile(filePath, res) {
    try {
      if (!fs.existsSync(filePath)) {
        this.serve404(res);
        return;
      }

      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        // Try to serve index.html in directory
        const indexFile = path.join(filePath, 'index.html');
        if (fs.existsSync(indexFile)) {
          this.serveFile(indexFile, res);
        } else {
          this.serve404(res);
        }
        return;
      }

      const mimeType = this.getMimeType(filePath);
      const content = fs.readFileSync(filePath);

      res.writeHead(200, {
        'Content-Type': mimeType,
        'Content-Length': content.length,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      });

      res.end(content);
      this.log(`Served: ${path.relative(this.publicDir, filePath)}`, 'info');
    } catch (error) {
      this.log(`Error serving file: ${error.message}`, 'error');
      this.serve500(res);
    }
  }

  serve404(res) {
    const errorPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found | TNR Business Solutions</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .error-container {
            background: white;
            border-radius: 12px;
            padding: 3rem;
            max-width: 600px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .error-code {
            font-size: 6rem;
            font-weight: bold;
            color: #e74c3c;
            margin: 0;
            line-height: 1;
        }
        .error-title {
            font-size: 2rem;
            color: #2c3e50;
            margin: 1rem 0;
        }
        .error-message {
            font-size: 1.1rem;
            color: #7f8c8d;
            margin: 1rem 0 2rem;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 0.5rem;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #2980b9;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-code">404</div>
        <h1 class="error-title">Page Not Found</h1>
        <p class="error-message">Sorry, the page you're looking for doesn't exist.</p>
        <a href="/" class="btn">Go Home</a>
    </div>
</body>
</html>`;

    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(errorPage);
  }

  serve500(res) {
    const errorPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>500 - Server Error | TNR Business Solutions</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .error-container {
            background: white;
            border-radius: 12px;
            padding: 3rem;
            max-width: 600px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .error-code {
            font-size: 6rem;
            font-weight: bold;
            color: #e74c3c;
            margin: 0;
            line-height: 1;
        }
        .error-title {
            font-size: 2rem;
            color: #2c3e50;
            margin: 1rem 0;
        }
        .error-message {
            font-size: 1.1rem;
            color: #7f8c8d;
            margin: 1rem 0 2rem;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 0.5rem;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #2980b9;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-code">500</div>
        <h1 class="error-title">Server Error</h1>
        <p class="error-message">Something went wrong on our end. We're working to fix it.</p>
        <a href="/" class="btn">Go Home</a>
    </div>
</body>
</html>`;

    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(errorPage);
  }

  handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Remove leading slash
    if (pathname.startsWith('/')) {
      pathname = pathname.substring(1);
    }

    // Default to index.html
    if (pathname === '' || pathname === '/') {
      pathname = 'index.html';
    } else if (!pathname.includes('.') && !pathname.endsWith('/')) {
      // Add .html extension if no extension is provided
      pathname = pathname + '.html';
    }

    let filePath;

    // Route different types of requests
    if (pathname.startsWith('media/')) {
      filePath = path.join(this.mediaDir, pathname.substring(6));
    } else if (pathname.startsWith('content/')) {
      filePath = path.join(this.contentDir, pathname.substring(8));
    } else if (pathname.endsWith('.md')) {
      // Serve markdown files from content directory
      filePath = path.join(this.contentDir, pathname);
    } else {
      // Serve from public directory
      filePath = path.join(this.publicDir, pathname);
    }

    this.serveFile(filePath, res);
  }

  start() {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });

    server.listen(this.port, this.host, () => {
      this.log('🚀 TNR Business Solutions Local Server Started', 'server');
      this.log('===============================================', 'info');
      this.log(
        `📍 Server running at: http://${this.host}:${this.port}`,
        'success'
      );
      this.log(`📁 Serving from: ${this.publicDir}`, 'info');
      this.log(`🎨 Media files: ${this.mediaDir}`, 'info');
      this.log(`📝 Content files: ${this.contentDir}`, 'info');
      this.log('', 'info');
      this.log('🌐 Available Pages:', 'info');
      this.log('   • Homepage: http://localhost:3000/', 'info');
      this.log('   • Services: http://localhost:3000/services/', 'info');
      this.log(
        '   • Privacy Policy: http://localhost:3000/content/privacy-policy.md',
        'info'
      );
      this.log(
        '   • Terms & Conditions: http://localhost:3000/content/terms-conditions.md',
        'info'
      );
      this.log('', 'info');
      this.log('💡 Tips:', 'info');
      this.log('   • Press Ctrl+C to stop the server', 'info');
      this.log(
        '   • The server will auto-reload when you make changes',
        'info'
      );
      this.log('   • Check the browser console for any errors', 'info');
      this.log('', 'info');
      this.log('🎯 Ready for development!', 'success');
    });

    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        this.log(
          `Port ${this.port} is already in use. Trying port ${
            this.port + 1
          }...`,
          'warning'
        );
        this.port += 1;
        this.start();
      } else {
        this.log(`Server error: ${err.message}`, 'error');
      }
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      this.log('\n🛑 Shutting down server...', 'warning');
      server.close(() => {
        this.log('✅ Server stopped successfully', 'success');
        process.exit(0);
      });
    });
  }
}

// Run if called directly
if (require.main === module) {
  const server = new LocalServer();
  server.start();
}

module.exports = LocalServer;
