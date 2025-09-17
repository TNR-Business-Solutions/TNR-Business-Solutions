/**
 * Fix Headers Across All HTML Pages
 * Standardizes the header with logo image across all pages
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist', 'preview');

// Standard header logo HTML
const STANDARD_LOGO = `            <a href="/" class="logo">
                <img src="media/logo.png" alt="TNR Business Solutions Logo" style="height: 40px; margin-right: 10px;">
                <span class="logo-text">TNR Business Solutions</span>
            </a>`;

// Old logo patterns to replace
const OLD_LOGO_PATTERNS = [
  /<div class="logo-text" style="font-size: 1\.5rem; font-weight: bold; color: var\(--tnr-primary\);">TNR<\/div>\s*<span class="logo-text">TNR Business Solutions<\/span>/g,
  /<div class="logo-text" style="font-size: 1\.5rem; font-weight: bold; color: var\(--tnr-primary\);">TNR<\/div>\s*<span class="logo-text">TNR Business Solutions<\/span>/g,
];

function fixHeaderInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace old logo patterns
    for (const pattern of OLD_LOGO_PATTERNS) {
      if (pattern.test(content)) {
        content = content.replace(
          pattern,
          STANDARD_LOGO.replace(/^            /gm, '')
        );
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed header in: ${path.basename(filePath)}`);
      return true;
    } else {
      console.log(`⏭️  No changes needed: ${path.basename(filePath)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function fixAllHeaders() {
  console.log('🔧 Fixing headers across all HTML pages...\n');

  const files = fs.readdirSync(DIST_DIR).filter(file => file.endsWith('.html'));
  let fixedCount = 0;

  for (const file of files) {
    const filePath = path.join(DIST_DIR, file);
    if (fixHeaderInFile(filePath)) {
      fixedCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`✅ Fixed ${fixedCount} files`);
  console.log(`📁 Total files processed: ${files.length}`);
}

// Run the script
fixAllHeaders();
