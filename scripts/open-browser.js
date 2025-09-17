#!/usr/bin/env node
/**
 * Browser Launcher for TNR Business Solutions Website
 * Opens the local server in the default browser
 */

const { exec } = require('child_process');
const os = require('os');

function openBrowser(url) {
  const platform = os.platform();
  let command;

  switch (platform) {
    case 'win32':
      command = `start ${url}`;
      break;
    case 'darwin':
      command = `open ${url}`;
      break;
    case 'linux':
      command = `xdg-open ${url}`;
      break;
    default:
      console.log(`Please open your browser and go to: ${url}`);
      return;
  }

  exec(command, error => {
    if (error) {
      console.log(`Could not open browser automatically. Please go to: ${url}`);
    } else {
      console.log(`🌐 Opening browser to: ${url}`);
    }
  });
}

// Get URL from command line argument or use default
const url = process.argv[2] || 'http://localhost:3001';
openBrowser(url);
