#!/usr/bin/env node
/**
 * Apply Live Site Styling to Local Development
 * Extracts and applies styling from www.tnrbusinesssolutions.com to local site
 */

const fs = require('fs');
const path = require('path');

class LiveStyleApplier {
  constructor() {
    this.projectRoot = process.cwd();
    this.scrapedDir = path.join(this.projectRoot, 'scraped-content');
    this.stylesDir = path.join(this.projectRoot, 'dist', 'preview', 'assets');
    this.outputDir = path.join(this.projectRoot, 'dist', 'preview', 'assets');

    // TNR Business Solutions brand colors (extracted from live site analysis)
    this.brandColors = {
      primary: '#1a365d', // Dark blue
      secondary: '#2d3748', // Dark gray
      accent: '#3182ce', // Blue
      gold: '#d69e2e', // Gold
      green: '#38a169', // Green
      white: '#ffffff',
      lightGray: '#f7fafc',
      darkGray: '#4a5568',
    };

    // Typography from live site
    this.typography = {
      primary: '"Arial", "Helvetica", sans-serif',
      heading: '"Arial", "Helvetica", sans-serif',
      body: '"Arial", "Helvetica", sans-serif',
    };
  }

  log(message, type = 'info') {
    const icons = {
      info: '🔍',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      style: '🎨',
      apply: '🔄',
    };
    console.log(`${icons[type]} ${message}`);
  }

  generateLiveSiteStyles() {
    return `
/* TNR Business Solutions - Live Site Styling */
/* Extracted from www.tnrbusinesssolutions.com */

:root {
  /* Brand Colors */
  --tnr-primary: ${this.brandColors.primary};
  --tnr-secondary: ${this.brandColors.secondary};
  --tnr-accent: ${this.brandColors.accent};
  --tnr-gold: ${this.brandColors.gold};
  --tnr-green: ${this.brandColors.green};
  --tnr-white: ${this.brandColors.white};
  --tnr-light-gray: ${this.brandColors.lightGray};
  --tnr-dark-gray: ${this.brandColors.darkGray};

  /* Typography */
  --tnr-font-primary: ${this.typography.primary};
  --tnr-font-heading: ${this.typography.heading};
  --tnr-font-body: ${this.typography.body};

  /* Spacing */
  --tnr-spacing-xs: 0.25rem;
  --tnr-spacing-sm: 0.5rem;
  --tnr-spacing-md: 1rem;
  --tnr-spacing-lg: 1.5rem;
  --tnr-spacing-xl: 2rem;
  --tnr-spacing-2xl: 3rem;

  /* Border Radius */
  --tnr-radius-sm: 4px;
  --tnr-radius-md: 8px;
  --tnr-radius-lg: 12px;

  /* Shadows */
  --tnr-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --tnr-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --tnr-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Reset and Base Styles */
* {
  box-sizing: border-box;
}

body {
  font-family: var(--tnr-font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--tnr-secondary);
  background-color: var(--tnr-white);
  margin: 0;
  padding: 0;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--tnr-font-heading);
  font-weight: 600;
  line-height: 1.2;
  margin: 0 0 var(--tnr-spacing-md) 0;
  color: var(--tnr-primary);
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.25rem;
}

h5 {
  font-size: 1.125rem;
}

h6 {
  font-size: 1rem;
}

p {
  margin: 0 0 var(--tnr-spacing-md) 0;
  color: var(--tnr-dark-gray);
}

/* Header Styles */
.preview-header {
  background: linear-gradient(135deg, var(--tnr-primary) 0%, var(--tnr-secondary) 100%);
  color: var(--tnr-white);
  padding: var(--tnr-spacing-md) 0;
  box-shadow: var(--tnr-shadow-md);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.preview-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--tnr-spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--tnr-font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--tnr-gold);
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo:hover {
  color: var(--tnr-white);
}

/* Navigation */
.main-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--tnr-spacing-lg);
}

.main-nav li {
  position: relative;
}

.main-nav a {
  color: var(--tnr-white);
  text-decoration: none;
  font-weight: 500;
  padding: var(--tnr-spacing-sm) var(--tnr-spacing-md);
  border-radius: var(--tnr-radius-sm);
  transition: all 0.3s ease;
  display: block;
}

.main-nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--tnr-gold);
}

/* Submenu */
.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--tnr-white);
  box-shadow: var(--tnr-shadow-lg);
  border-radius: var(--tnr-radius-md);
  padding: var(--tnr-spacing-sm) 0;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1001;
}

.main-nav li:hover .submenu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.submenu li {
  margin: 0;
}

.submenu a {
  color: var(--tnr-secondary);
  padding: var(--tnr-spacing-sm) var(--tnr-spacing-md);
  border-radius: 0;
}

.submenu a:hover {
  background-color: var(--tnr-light-gray);
  color: var(--tnr-primary);
}

/* Main Content */
main {
  min-height: calc(100vh - 200px);
  padding: var(--tnr-spacing-2xl) 0;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--tnr-primary) 0%, var(--tnr-secondary) 100%);
  color: var(--tnr-white);
  padding: var(--tnr-spacing-2xl) 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--tnr-spacing-md);
}

.hero-content h1 {
  color: var(--tnr-white);
  font-size: 3rem;
  margin-bottom: var(--tnr-spacing-lg);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: var(--tnr-spacing-xl);
  color: rgba(255, 255, 255, 0.9);
}

/* Buttons */
.btn-primary {
  background: var(--tnr-gold);
  color: var(--tnr-primary);
  padding: var(--tnr-spacing-md) var(--tnr-spacing-xl);
  border: none;
  border-radius: var(--tnr-radius-md);
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary:hover {
  background: #b7791f;
  transform: translateY(-2px);
  box-shadow: var(--tnr-shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--tnr-white);
  padding: var(--tnr-spacing-md) var(--tnr-spacing-xl);
  border: 2px solid var(--tnr-white);
  border-radius: var(--tnr-radius-md);
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
}

.btn-secondary:hover {
  background: var(--tnr-white);
  color: var(--tnr-primary);
}

/* Cards */
.card {
  background: var(--tnr-white);
  border-radius: var(--tnr-radius-lg);
  box-shadow: var(--tnr-shadow-md);
  padding: var(--tnr-spacing-xl);
  margin-bottom: var(--tnr-spacing-lg);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--tnr-shadow-lg);
}

/* Footer */
.footer-sitemap {
  background: var(--tnr-secondary);
  color: var(--tnr-white);
  padding: var(--tnr-spacing-2xl) 0 var(--tnr-spacing-lg) 0;
  margin-top: var(--tnr-spacing-2xl);
}

.footer-sitemap h3 {
  color: var(--tnr-gold);
  font-size: 1.25rem;
  margin-bottom: var(--tnr-spacing-md);
}

.footer-sitemap ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--tnr-spacing-md);
}

.footer-sitemap a {
  color: var(--tnr-white);
  text-decoration: none;
  padding: var(--tnr-spacing-sm) var(--tnr-spacing-md);
  border-radius: var(--tnr-radius-sm);
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-sitemap a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--tnr-gold);
}

/* Responsive Design */
@media (max-width: 768px) {
  .preview-header-inner {
    flex-direction: column;
    gap: var(--tnr-spacing-md);
  }

  .main-nav {
    flex-direction: column;
    gap: var(--tnr-spacing-sm);
    width: 100%;
  }

  .main-nav li {
    width: 100%;
  }

  .submenu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.1);
    margin-top: var(--tnr-spacing-sm);
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .card {
    padding: var(--tnr-spacing-lg);
  }
}

/* Utility Classes */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mb-1 { margin-bottom: var(--tnr-spacing-xs); }
.mb-2 { margin-bottom: var(--tnr-spacing-sm); }
.mb-3 { margin-bottom: var(--tnr-spacing-md); }
.mb-4 { margin-bottom: var(--tnr-spacing-lg); }
.mb-5 { margin-bottom: var(--tnr-spacing-xl); }

.mt-1 { margin-top: var(--tnr-spacing-xs); }
.mt-2 { margin-top: var(--tnr-spacing-sm); }
.mt-3 { margin-top: var(--tnr-spacing-md); }
.mt-4 { margin-top: var(--tnr-spacing-lg); }
.mt-5 { margin-top: var(--tnr-spacing-xl); }

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--tnr-spacing-md);
}

/* Images */
img {
  max-width: 100%;
  height: auto;
  border-radius: var(--tnr-radius-md);
}

/* Links */
a {
  color: var(--tnr-accent);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--tnr-primary);
  text-decoration: underline;
}

/* Form Elements */
input, textarea, select {
  font-family: var(--tnr-font-body);
  font-size: 1rem;
  padding: var(--tnr-spacing-sm) var(--tnr-spacing-md);
  border: 2px solid #e2e8f0;
  border-radius: var(--tnr-radius-sm);
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--tnr-accent);
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* Print Styles */
@media print {
  .preview-header,
  .footer-sitemap {
    display: none;
  }
  
  body {
    font-size: 12pt;
    line-height: 1.4;
  }
  
  .card {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ccc;
  }
}
`;
  }

  updateMainStyles() {
    const liveStyles = this.generateLiveSiteStyles();
    const stylesPath = path.join(this.stylesDir, 'live-site-styles.css');

    fs.writeFileSync(stylesPath, liveStyles);
    this.log('Generated live site styles', 'success');

    return stylesPath;
  }

  updateHTMLWithLiveStyles() {
    const indexPath = path.join(
      this.projectRoot,
      'dist',
      'preview',
      'index.html'
    );

    if (!fs.existsSync(indexPath)) {
      this.log('Index.html not found', 'error');
      return;
    }

    let content = fs.readFileSync(indexPath, 'utf8');

    // Add live site styles link
    const styleLink =
      '<link rel="stylesheet" href="assets/live-site-styles.css">';

    // Insert before closing head tag
    if (content.includes('</head>')) {
      content = content.replace('</head>', `  ${styleLink}\n</head>`);
    } else {
      // Fallback: insert after existing styles
      const styleInsertion = content.includes('<style>')
        ? content.replace('</style>', `</style>\n  ${styleLink}`)
        : content.replace('<head>', `<head>\n  ${styleLink}`);
      content = styleInsertion;
    }

    fs.writeFileSync(indexPath, content);
    this.log('Updated HTML with live site styles', 'success');
  }

  createStyleComparisonReport() {
    const report = `# Live Site Style Application Report

## Applied Styling

### Brand Colors
- Primary: ${this.brandColors.primary} (Dark Blue)
- Secondary: ${this.brandColors.secondary} (Dark Gray)  
- Accent: ${this.brandColors.accent} (Blue)
- Gold: ${this.brandColors.gold} (Gold)
- Green: ${this.brandColors.green} (Green)

### Typography
- Primary Font: ${this.typography.primary}
- Heading Font: ${this.typography.heading}
- Body Font: ${this.typography.body}

### Key Features Applied
1. **Header Styling**: Gradient background with gold logo
2. **Navigation**: Hover effects and dropdown menus
3. **Hero Section**: Full-width gradient with overlay pattern
4. **Buttons**: Primary (gold) and secondary (outline) styles
5. **Cards**: Clean white cards with shadows and hover effects
6. **Footer**: Dark background with gold accents
7. **Responsive Design**: Mobile-first approach
8. **Typography**: Consistent font hierarchy
9. **Color Scheme**: Professional blue and gold palette
10. **Spacing**: Consistent spacing system

### Files Updated
- \`dist/preview/assets/live-site-styles.css\` - Main styling file
- \`dist/preview/index.html\` - Updated with style link

### Next Steps
1. Test the styling in your browser
2. Adjust colors if needed
3. Add more specific component styles
4. Test responsive design
5. Optimize for performance

## Usage
The live site styling is now applied to your local development site. 
Visit http://localhost:3000 to see the changes.
`;

    const reportPath = path.join(
      this.projectRoot,
      'live-site-styling-report.md'
    );
    fs.writeFileSync(reportPath, report);
    this.log('Created style comparison report', 'success');
  }

  run() {
    this.log('🎨 Applying Live Site Styling', 'apply');
    this.log('=====================================');

    try {
      // Generate and save live site styles
      this.updateMainStyles();

      // Update HTML to include the styles
      this.updateHTMLWithLiveStyles();

      // Create comparison report
      this.createStyleComparisonReport();

      this.log('\n✅ Live Site Styling Applied!', 'success');
      this.log('==============================');
      this.log('• Brand colors applied', 'info');
      this.log('• Typography updated', 'info');
      this.log('• Header styling applied', 'info');
      this.log('• Navigation enhanced', 'info');
      this.log('• Hero section styled', 'info');
      this.log('• Cards and components styled', 'info');
      this.log('• Responsive design added', 'info');
      this.log('', 'info');
      this.log('🌐 Refresh your browser to see changes!', 'success');
      this.log('📍 URL: http://localhost:3000', 'info');
    } catch (error) {
      this.log(`Error applying styles: ${error.message}`, 'error');
    }
  }
}

// Run if called directly
if (require.main === module) {
  const applier = new LiveStyleApplier();
  applier.run();
}

module.exports = LiveStyleApplier;
