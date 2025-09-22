#!/usr/bin/env node

/**
 * TNR Business Solutions - Generate Wix Content
 * Generates content files that you can manually copy to your Wix site
 */

const fs = require('fs');
const path = require('path');

class WixContentGenerator {
  constructor() {
    this.projectRoot = process.cwd();
    this.distDir = path.join(this.projectRoot, 'dist');
    this.previewDir = path.join(this.distDir, 'preview');
    this.outputDir = path.join(this.projectRoot, 'wix-content');
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const icons = {
      info: '📝',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      generate: '🔨',
    };
    console.log(`${icons[type] || '📝'} [${timestamp}] ${message}`);
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
      this.log('Created wix-content directory', 'success');
    }
  }

  extractContentSections(htmlContent) {
    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
    const descriptionMatch = htmlContent.match(
      /<meta name="description" content="(.*?)"/
    );
    const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
    const h2Matches = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/g) || [];
    const pMatches = htmlContent.match(/<p[^>]*>(.*?)<\/p>/g) || [];

    return {
      title: titleMatch ? titleMatch[1] : '',
      description: descriptionMatch ? descriptionMatch[1] : '',
      mainHeading: h1Match ? h1Match[1].replace(/<[^>]*>/g, '') : '',
      subHeadings: h2Matches.map(h2 => h2.replace(/<[^>]*>/g, '')),
      paragraphs: pMatches.map(p => p.replace(/<[^>]*>/g, '')).slice(0, 5), // First 5 paragraphs
      content: htmlContent,
    };
  }

  generateHomepageContent() {
    this.log('Generating homepage content...', 'generate');

    const homepagePath = path.join(this.previewDir, 'index.html');
    if (!fs.existsSync(homepagePath)) {
      this.log('❌ Homepage not found. Run build first.', 'error');
      return;
    }

    const homepageContent = fs.readFileSync(homepagePath, 'utf8');
    const content = this.extractContentSections(homepageContent);

    const homepageData = {
      pageType: 'Homepage',
      title: content.title,
      description: content.description,
      mainHeading: content.mainHeading,
      subHeadings: content.subHeadings,
      paragraphs: content.paragraphs,
      instructions: [
        '1. Go to your Wix Editor',
        '2. Select your homepage',
        '3. Update the page title and meta description in SEO settings',
        '4. Replace the main heading with: ' + content.mainHeading,
        '5. Update subheadings and content as needed',
      ],
    };

    fs.writeFileSync(
      path.join(this.outputDir, 'homepage-content.json'),
      JSON.stringify(homepageData, null, 2)
    );

    this.log('✅ Homepage content generated', 'success');
  }

  generateServicePagesContent() {
    this.log('Generating service pages content...', 'generate');

    const servicesDir = path.join(this.previewDir, 'services');
    if (!fs.existsSync(servicesDir)) {
      this.log('⚠️ Services directory not found', 'warning');
      return;
    }

    const serviceFiles = fs
      .readdirSync(servicesDir)
      .filter(file => file.endsWith('.html'));

    const servicesData = [];

    for (const serviceFile of serviceFiles) {
      const servicePath = path.join(servicesDir, serviceFile);
      const serviceContent = fs.readFileSync(servicePath, 'utf8');
      const content = this.extractContentSections(serviceContent);

      const serviceName = path.basename(serviceFile, '.html');
      const serviceData = {
        pageType: 'Service Page',
        serviceName: serviceName,
        title: content.title,
        description: content.description,
        mainHeading: content.mainHeading,
        subHeadings: content.subHeadings,
        paragraphs: content.paragraphs,
        instructions: [
          `1. Go to your Wix Editor`,
          `2. Create or select the ${serviceName} page`,
          `3. Update the page title and meta description in SEO settings`,
          `4. Replace the main heading with: ${content.mainHeading}`,
          `5. Add the subheadings and content as needed`,
        ],
      };

      servicesData.push(serviceData);
    }

    fs.writeFileSync(
      path.join(this.outputDir, 'services-content.json'),
      JSON.stringify(servicesData, null, 2)
    );

    this.log(
      `✅ Generated content for ${servicesData.length} service pages`,
      'success'
    );
  }

  generateStructuredData() {
    this.log('Generating structured data...', 'generate');

    const jsonldDir = path.join(this.distDir, 'jsonld');
    if (!fs.existsSync(jsonldDir)) {
      this.log('⚠️ JSON-LD directory not found', 'warning');
      return;
    }

    const schemaFiles = fs
      .readdirSync(jsonldDir)
      .filter(file => file.endsWith('.json'));

    const schemasData = [];

    for (const schemaFile of schemaFiles) {
      const schemaPath = path.join(jsonldDir, schemaFile);
      const schemaContent = fs.readFileSync(schemaPath, 'utf8');
      const schemaData = JSON.parse(schemaContent);

      schemasData.push({
        fileName: schemaFile,
        schemaType: schemaData['@type'] || 'Unknown',
        schemaName: schemaData.name || 'N/A',
        instructions: [
          '1. Go to your Wix Editor',
          '2. Go to SEO > Structured Data',
          "3. Add this schema manually or use Wix's SEO tools",
          '4. Copy the JSON-LD code from the file',
        ],
        schema: schemaData,
      });
    }

    fs.writeFileSync(
      path.join(this.outputDir, 'structured-data.json'),
      JSON.stringify(schemasData, null, 2)
    );

    this.log(
      `✅ Generated ${schemasData.length} structured data schemas`,
      'success'
    );
  }

  generateSiteSettings() {
    this.log('Generating site settings...', 'generate');

    const orgProfilePath = path.join(
      this.projectRoot,
      'data',
      'org-profile.json'
    );
    if (!fs.existsSync(orgProfilePath)) {
      this.log('⚠️ Organization profile not found', 'warning');
      return;
    }

    const orgProfile = JSON.parse(fs.readFileSync(orgProfilePath, 'utf8'));

    const siteSettings = {
      siteName: orgProfile.brandName,
      description:
        'Professional digital marketing and insurance services for small businesses in Greensburg, PA',
      contactInfo: {
        phone: orgProfile.telephone,
        email: 'Info@TNRBusinessSolutions.com',
        address: {
          street: orgProfile.streetAddress,
          city: orgProfile.locality,
          state: orgProfile.region,
          zip: orgProfile.postalCode,
        },
      },
      socialLinks: orgProfile.social,
      instructions: [
        '1. Go to your Wix Editor',
        '2. Go to Site > Site Settings',
        '3. Update the site name and description',
        '4. Go to Contact Info and update the details',
        '5. Add social media links',
      ],
    };

    fs.writeFileSync(
      path.join(this.outputDir, 'site-settings.json'),
      JSON.stringify(siteSettings, null, 2)
    );

    this.log('✅ Site settings generated', 'success');
  }

  generateInstructions() {
    const instructions = `# TNR Business Solutions - Wix Content Guide

This directory contains all the content for your Wix site that you can manually copy and paste.

## Files Generated:

1. **homepage-content.json** - Content for your homepage
2. **services-content.json** - Content for all service pages
3. **structured-data.json** - SEO structured data schemas
4. **site-settings.json** - Site-wide settings and contact info

## How to Use:

### 1. Homepage Content
- Open \`homepage-content.json\`
- Copy the content and paste it into your Wix homepage
- Update the page title and meta description in SEO settings

### 2. Service Pages
- Open \`services-content.json\`
- For each service, create a new page in Wix
- Copy the content for each service to its respective page

### 3. Structured Data
- Open \`structured-data.json\`
- Go to Wix Editor > SEO > Structured Data
- Add each schema manually or use Wix's SEO tools

### 4. Site Settings
- Open \`site-settings.json\`
- Go to Wix Editor > Site > Site Settings
- Update your site name, description, and contact info

## Next Steps:

1. Go to your Wix Editor
2. Start with the homepage content
3. Create service pages one by one
4. Add structured data for SEO
5. Update site settings
6. Publish your site

## Need Help?

- Check the instructions in each JSON file
- Use Wix's help center for specific editor questions
- Test your site before going live

Generated on: ${new Date().toISOString()}
`;

    fs.writeFileSync(path.join(this.outputDir, 'README.md'), instructions);

    this.log('✅ Instructions generated', 'success');
  }

  async generateAllContent() {
    this.log('🔨 TNR Business Solutions - Wix Content Generator', 'generate');
    this.log('================================================', 'generate');

    this.ensureOutputDir();
    this.generateHomepageContent();
    this.generateServicePagesContent();
    this.generateStructuredData();
    this.generateSiteSettings();
    this.generateInstructions();

    this.log('🎉 All content generated successfully!', 'success');
    this.log(`📁 Content files saved to: ${this.outputDir}`, 'info');
    this.log(
      '📖 Read README.md for instructions on how to use these files',
      'info'
    );
  }
}

// Run generator if called directly
if (require.main === module) {
  const generator = new WixContentGenerator();
  generator
    .generateAllContent()
    .then(() => {
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Generation failed:', error.message);
      process.exit(1);
    });
}

module.exports = { WixContentGenerator };
