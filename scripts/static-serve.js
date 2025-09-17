#!/usr/bin/env node
// Minimal static server for preview folder. Use: node scripts/static-serve.js [port]
const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.txt': 'text/plain',
};
const root = path.join(__dirname, '..', 'dist', 'preview');
const port = parseInt(process.argv[2], 10) || 8080;
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') {
    p = '/index.html';
  }
  const filePath = path.join(root, p.replace(/^\/+/, ''));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  fs.stat(filePath, (err, st) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    const ext = path.extname(filePath).toLowerCase();
    const ct = mime[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Static preview server running at http://127.0.0.1:${port}`);
});
