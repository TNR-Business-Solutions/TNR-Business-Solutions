const fs = require('fs');
const path = require('path');

class LogoFixer {
  constructor() {
    this.previewDir = path.join(__dirname, '..', 'dist', 'preview');
  }

  fixAllPages() {
    console.log('🔧 Fixing logo references in all HTML files...');

    const files = fs
      .readdirSync(this.previewDir)
      .filter(file => file.endsWith('.html'));

    files.forEach(file => {
      this.fixLogoInFile(file);
    });

    console.log('✅ All logo references fixed!');
  }

  fixLogoInFile(filename) {
    const filePath = path.join(this.previewDir, filename);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the logo img tag with text-based logo
    const oldLogo = `<img src="/media/logo-tnr-primary.png" alt="TNR Business Solutions" class="logo-img">`;
    const newLogo = `<div class="logo-text" style="font-size: 1.5rem; font-weight: bold; color: var(--tnr-primary);">TNR</div>`;

    if (content.includes(oldLogo)) {
      content = content.replace(oldLogo, newLogo);
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed logo in ${filename}`);
    } else {
      console.log(`ℹ️ No logo found in ${filename}`);
    }
  }
}

// Run the fixer
const fixer = new LogoFixer();
fixer.fixAllPages();
