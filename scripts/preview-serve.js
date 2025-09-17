#!/usr/bin/env node
/** Simple static server for dist/preview */
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname,'..','dist','preview');
const port = process.env.PORT || 8080;

function contentType(p){
  if (p.endsWith('.html')) {return 'text/html; charset=utf-8';}
  if (p.endsWith('.json')) {return 'application/json; charset=utf-8';}
  if (p.endsWith('.xml')) {return 'application/xml; charset=utf-8';}
  if (p.endsWith('.webp')) {return 'image/webp';}
  if (p.endsWith('.png')) {return 'image/png';}
  if (p.endsWith('.jpg')||p.endsWith('.jpeg')) {return 'image/jpeg';}
  if (p.endsWith('.css')) {return 'text/css';}
  if (p.endsWith('.js')) {return 'application/javascript';}
  return 'text/plain; charset=utf-8';
}

http.createServer((req,res)=>{
  let filePath = decodeURIComponent(req.url.split('?')[0]);
  if (filePath === '/' || filePath === '') {filePath = '/index.html';}
  const abs = path.join(root, filePath.replace(/^\//,''));
  if (!abs.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(abs,(err,data)=>{
    if (err){ res.writeHead(404); return res.end('Not found'); }
    res.setHeader('Content-Type', contentType(abs));
    res.end(data);
  });
}).listen(port, ()=>{
  console.log('Preview server running at http://localhost:'+port+'/');
});
