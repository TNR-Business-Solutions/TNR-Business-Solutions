/**
 * TNR Business Solutions Website - Complete Optimization Script
 * This script runs all optimization tasks in the correct order
 */

const { exec } = require('child_process');
// runCommand uses child_process.exec to execute shell commands
const fs = require('fs');
const path = require('path');

function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`🔄 ${description}...`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`❌ ${description} failed:`);
        console.log(stderr || error.message);
        reject(error);
        return;
      }

      console.log(`✅ ${description} completed`);
      if (stdout) {
        console.log(stdout);
      }
      resolve(stdout);
    });
  });
}

async function optimizeWebsite() {
  console.log('🚀 TNR Business Solutions Website - Complete Optimization');
  console.log('========================================================\\n');

  try {
    // 1. Fix any formatting issues
    await runCommand(
      'npm run fix:tabs',
      'Fixing tab formatting in markdown files'
    );

    // 2. Validate current content
    await runCommand('npm run lint:md', 'Linting markdown files');

    // 3. Build all structured data
    await runCommand(
      'npm run build:jsonld',
      'Building JSON-LD structured data'
    );

    // 4. Generate service schemas
    await runCommand(
      'npm run build:schemas:services',
      'Generating service schemas'
    );

    // 5. Build global schemas
    await runCommand('npm run build:schemas:global', 'Building global schemas');

    // 6. Generate FAQ data
    await runCommand('npm run build:faq', 'Building FAQ structured data');

    // 7. Create sitemap
    await runCommand('npm run build:sitemap', 'Generating XML sitemap');

    // 8. Generate robots.txt
    await runCommand('npm run build:robots', 'Creating robots.txt');

    // 9. Build preview site
    await runCommand('npm run preview:build', 'Building preview website');

    // 10. Export data to CSV for backup
    await runCommand('npm run export:csv', 'Exporting services to CSV');
    await runCommand(
      'npm run export:homepage:csv',
      'Exporting homepage sections to CSV'
    );

    // 11. Validate JSON-LD
    await runCommand(
      'npm run test:jsonld',
      'Validating JSON-LD structured data'
    );

    console.log('\\n🎉 Website Optimization Complete!');
    console.log('==================================\\n');

    // Check if authentication is working
    console.log('🔐 Testing Wix Authentication...');
    try {
      await runCommand('npm run auth:token', 'Testing Wix authentication');
      console.log('✅ Authentication working - ready to deploy!');
      console.log('   Run: npm run push:wix:enhanced');
    } catch {
      // Authentication test failed (details intentionally ignored here)
      console.log('❌ Authentication needs setup');
      console.log('   Run: npm run auth:setup');
    }

    console.log('\\n📋 Optimization Summary:');
    console.log('   ✅ All content built and validated');
    console.log('   ✅ Structured data generated');
    console.log('   ✅ SEO elements created (sitemap, robots.txt)');
    console.log('   ✅ Preview site ready');
    console.log('   ✅ Data exported for backup');

    console.log('\\n🚀 Next Steps:');
    console.log('   1. Start preview: npm run preview:serve');
    console.log('   2. Setup auth (if needed): npm run auth:setup');
    console.log('   3. Deploy to Wix: npm run push:wix:enhanced');
    console.log('   4. Verify deployment: npm run wix:query');

    // Show file sizes
    console.log('\\n📊 Generated Files:');
    const distDir = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distDir)) {
      const files = fs.readdirSync(distDir, { recursive: true });
      files.forEach(file => {
        const filePath = path.join(distDir, file);
        if (fs.statSync(filePath).isFile()) {
          const { size } = fs.statSync(filePath);
          const sizeStr =
            size > 1024 ? `${Math.round(size / 1024)}KB` : `${size}B`;
          console.log(`   📄 ${file}: ${sizeStr}`);
        }
      });
    }
  } catch (error) {
    console.log('\\n❌ Optimization failed at step:', error.message);
    console.log('\\n🔧 Troubleshooting:');
    console.log('   1. Check if all dependencies are installed: npm install');
    console.log('   2. Verify .env file exists with Wix credentials');
    console.log('   3. Check individual script logs above');
    process.exit(1);
  }
}

if (require.main === module) {
  optimizeWebsite()
    .then(() => {
      console.log(
        '\\n🎯 TNR Business Solutions website optimization completed successfully!'
      );
      process.exit(0);
    })
    .catch(error => {
      console.error('\\n💥 Optimization failed:', error.message);
      process.exit(1);
    });
}

module.exports = { optimizeWebsite };
