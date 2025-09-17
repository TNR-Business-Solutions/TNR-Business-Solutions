/**
 * Standardize Image Sizing Across All HTML Pages
 * Ensures consistent image dimensions and styling
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist', 'preview');

// Standard image styles
const IMAGE_STYLES = {
  hero: 'width: 100%; height: 300px; object-fit: cover; border-radius: var(--tnr-radius-lg); box-shadow: var(--tnr-shadow-md);',
  card: 'width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;',
  small:
    'width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;',
  logo: 'height: 40px; margin-right: 10px;',
};

function standardizeImagesInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix hero images (height: 300px)
    const heroPattern = /style="([^"]*height:\s*300px[^"]*)"/g;
    content = content.replace(heroPattern, (match, style) => {
      modified = true;
      return `style="${IMAGE_STYLES.hero}"`;
    });

    // Fix card images (height: 200px)
    const cardPattern = /style="([^"]*height:\s*200px[^"]*)"/g;
    content = content.replace(cardPattern, (match, style) => {
      modified = true;
      return `style="${IMAGE_STYLES.card}"`;
    });

    // Fix small images (height: 150px)
    const smallPattern = /style="([^"]*height:\s*150px[^"]*)"/g;
    content = content.replace(smallPattern, (match, style) => {
      modified = true;
      return `style="${IMAGE_STYLES.small}"`;
    });

    // Fix logo images
    const logoPattern = /style="height:\s*40px;\s*margin-right:\s*10px;"/g;
    content = content.replace(logoPattern, match => {
      modified = true;
      return `style="${IMAGE_STYLES.logo}"`;
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Standardized images in: ${path.basename(filePath)}`);
      return true;
    } else {
      console.log(`⏭️  No image changes needed: ${path.basename(filePath)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function standardizeAllImages() {
  console.log('🖼️  Standardizing image sizing across all HTML pages...\n');

  const files = fs.readdirSync(DIST_DIR).filter(file => file.endsWith('.html'));
  let fixedCount = 0;

  for (const file of files) {
    const filePath = path.join(DIST_DIR, file);
    if (standardizeImagesInFile(filePath)) {
      fixedCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`✅ Standardized ${fixedCount} files`);
  console.log(`📁 Total files processed: ${files.length}`);
  console.log(`\n📐 Image Standards Applied:`);
  console.log(`   • Hero Images: 300px height`);
  console.log(`   • Card Images: 200px height`);
  console.log(`   • Small Images: 150px height`);
  console.log(`   • Logo Images: 40px height`);
}

// Run the script
standardizeAllImages();
