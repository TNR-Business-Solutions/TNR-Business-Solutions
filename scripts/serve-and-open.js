#!/usr/bin/env node
// Serve dist/preview with the existing static-serve and open default browser (Windows friendly)
const { spawn } = require('child_process');
const path = require('path');
const open = require('child_process');

const port = process.argv[2] || 8080;
const cwd = path.join(__dirname, '..');
const serverScript = path.join(__dirname, 'static-serve.js');

// Start server as a detached process so it keeps running
const server = spawn(process.execPath, [serverScript, port], {
  cwd,
  detached: true,
  stdio: 'ignore',
});
server.unref();

// open default browser to the preview URL (Windows: start)
const url = `http://127.0.0.1:${port}`;
if (process.platform === 'win32') {
  spawn('cmd', ['/c', 'start', '', url]);
} else if (process.platform === 'darwin') {
  spawn('open', [url]);
} else {
  spawn('xdg-open', [url]);
}

console.log(`Started preview server (detached) and opened ${url}`);
