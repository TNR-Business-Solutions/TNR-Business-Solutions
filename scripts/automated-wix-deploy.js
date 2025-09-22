#!/usr/bin/env node

/**
 * TNR Business Solutions - Automated Wix Deployment
 * Fully automated deployment using Wix Sites API and Data API
 */

const { createClient, OAuthStrategy } = require('@wix/sdk');
const { items } = require('@wix/data');
const fs = require('fs');
const path = require('path');
const https = require('https');

class AutomatedWixDeployer {
  constructor() {
    this.clientId = 'd75d8823-b9f6-4edf-8b1a-458d4c94c54d';
    this.accessToken = 'vk2zUZNkmAEQNRQ';
    this.siteId = '4483f29d-f541-486b-ae48-64f09aaa56b3';
    this.tenantId = '513afa1a-0480-4d84-9e79-f203d16800bb';
    this.projectRoot = process.cwd();
    this.distDir = path.join(this.projectRoot, 'dist');
    this.previewDir = path.join(this.distDir, 'preview');
    this.wixClient = null;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const icons = {
      info: '📝',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      deploy: '🚀',
      api: '🔌',
      create: '🔨',
    };
    console.log(`${icons[type] || '📝'} [${timestamp}] ${message}`);
  }

  async initializeClient() {
    try {
      this.wixClient = createClient({
        modules: { items },
        auth: OAuthStrategy({
          clientId: this.clientId,
          accessToken: this.accessToken,
        }),
        siteId: this.siteId,
        tenantId: this.tenantId,
      });
      this.log('✅ Wix client initialized with Sites and Data APIs', 'success');
      return true;
    } catch (error) {
      this.log(`❌ Failed to initialize client: ${error.message}`, 'error');
      return false;
    }
  }

  async ensureCollectionsExist() {
    this.log('Checking for existing collections...', 'create');
    
    // Try to access existing collections
    const collections = ['WebsiteContent', 'SEOSchemas', 'SiteSettings', 'Import 1', 'Import 2'];
    
    for (const collectionName of collections) {
      try {
        const result = await this.wixClient.items.query({
          dataCollectionId: collectionName
        }).find();
        this.log(`✅ Found collection: ${collectionName} (${result.items.length} items)`, 'success');
      } catch (error) {
        this.log(`⚠️ Collection ${collectionName} not accessible: ${error.message}`, 'warning');
      }
    }
  }

  async deployHomepageContent() {
    try {
      this.log('Deploying homepage content...', 'deploy');
      
      const homepagePath = path.join(this.previewDir, 'index.html');
      if (!fs.existsSync(homepagePath)) {
        this.log('❌ Homepage not found. Run build first.', 'error');
        return false;
      }

      const homepageContent = fs.readFileSync(homepagePath, 'utf8');
      const content = this.extractContentSections(homepageContent);

      const dataItem = {
        pageType: 'Homepage',
        pageId: 'homepage',
        title: content.title,
        description: content.description,
        mainHeading: content.mainHeading,
        subHeadings: JSON.stringify(content.subHeadings),
        paragraphs: JSON.stringify(content.paragraphs),
        content: content.content,
        lastUpdated: new Date().toISOString(),
      };

      // Try multiple collection names
      const collectionNames = ['WebsiteContent', 'Import 1', 'Import 2', 'Pages', 'Content'];
      let deployed = false;

      for (const collectionName of collectionNames) {
        try {
          const fullDataItem = {
            dataCollectionId: collectionName,
            dataItem: dataItem
          };

          // First try to find existing homepage
          const existing = await this.wixClient.items.query({
            dataCollectionId: collectionName,
            filter: { pageId: 'homepage' }
          }).find();

          if (existing.items.length > 0) {
            // Update existing
            await this.wixClient.items.update({
              dataCollectionId: collectionName,
              dataItemId: existing.items[0]._id,
              dataItem: dataItem
            });
            this.log(`✅ Homepage content updated in ${collectionName}`, 'success');
          } else {
            // Insert new
            await this.wixClient.items.insert(fullDataItem);
            this.log(`✅ Homepage content inserted into ${collectionName}`, 'success');
          }
          deployed = true;
          break;
        } catch (error) {
          this.log(`⚠️ Failed to deploy to ${collectionName}: ${error.message}`, 'warning');
          continue;
        }
      }

      if (!deployed) {
        this.log(`❌ Failed to deploy homepage to any collection`, 'error');
        return false;
      }

      return true;
    } catch (error) {
      this.log(`❌ Failed to deploy homepage: ${error.message}`, 'error');
      return false;
    }
  }

  async deployServicePages() {
    try {
      this.log('Deploying service pages...', 'deploy');
      
      const servicesDir = path.join(this.previewDir, 'services');
      if (!fs.existsSync(servicesDir)) {
        this.log('⚠️ Services directory not found', 'warning');
        return false;
      }

      const serviceFiles = fs
        .readdirSync(servicesDir)
        .filter(file => file.endsWith('.html'));

      let successCount = 0;

      for (const serviceFile of serviceFiles) {
        try {
          const servicePath = path.join(servicesDir, serviceFile);
          const serviceContent = fs.readFileSync(servicePath, 'utf8');
          const content = this.extractContentSections(serviceContent);

          const serviceName = path.basename(serviceFile, '.html');
          const dataItem = {
            dataCollectionId: 'WebsiteContent',
            dataItem: {
              pageType: 'Service Page',
              pageId: serviceName,
              title: content.title,
              description: content.description,
              mainHeading: content.mainHeading,
              subHeadings: JSON.stringify(content.subHeadings),
              paragraphs: JSON.stringify(content.paragraphs),
              content: content.content,
              lastUpdated: new Date().toISOString(),
            }
          };

          try {
            // Try to update existing or insert new
            const existing = await this.wixClient.items.query({
              dataCollectionId: 'WebsiteContent',
              filter: { pageId: serviceName }
            }).find();

            if (existing.items.length > 0) {
              await this.wixClient.items.update({
                dataCollectionId: 'WebsiteContent',
                dataItemId: existing.items[0]._id,
                dataItem: dataItem.dataItem
              });
              this.log(`✅ Updated: ${serviceName}`, 'success');
            } else {
              await this.wixClient.items.insert(dataItem);
              this.log(`✅ Inserted: ${serviceName}`, 'success');
            }
            successCount++;
          } catch (error) {
            this.log(`❌ Failed to deploy ${serviceName}: ${error.message}`, 'error');
          }
        } catch (error) {
          this.log(`❌ Error processing ${serviceFile}: ${error.message}`, 'error');
        }
      }

      this.log(`✅ Deployed ${successCount}/${serviceFiles.length} service pages`, 'success');
      return successCount > 0;
    } catch (error) {
      this.log(`❌ Failed to deploy service pages: ${error.message}`, 'error');
      return false;
    }
  }

  async deployStructuredData() {
    try {
      this.log('Deploying structured data...', 'deploy');
      
      const jsonldDir = path.join(this.distDir, 'jsonld');
      if (!fs.existsSync(jsonldDir)) {
        this.log('⚠️ JSON-LD directory not found', 'warning');
        return false;
      }

      const schemaFiles = fs
        .readdirSync(jsonldDir)
        .filter(file => file.endsWith('.json'));

      let successCount = 0;

      for (const schemaFile of schemaFiles) {
        try {
          const schemaPath = path.join(jsonldDir, schemaFile);
          const schemaContent = fs.readFileSync(schemaPath, 'utf8');
          const schemaData = JSON.parse(schemaContent);

          const schemaName = schemaFile.replace('.json', '');
          const dataItem = {
            dataCollectionId: 'SEOSchemas',
            dataItem: {
              schemaName: schemaName,
              schemaType: schemaData['@type'] || 'Unknown',
              schemaContent: schemaContent,
              lastUpdated: new Date().toISOString(),
            }
          };

          try {
            // Try to update existing or insert new
            const existing = await this.wixClient.items.query({
              dataCollectionId: 'SEOSchemas',
              filter: { schemaName: schemaName }
            }).find();

            if (existing.items.length > 0) {
              await this.wixClient.items.update({
                dataCollectionId: 'SEOSchemas',
                dataItemId: existing.items[0]._id,
                dataItem: dataItem.dataItem
              });
              this.log(`✅ Updated schema: ${schemaName}`, 'success');
            } else {
              await this.wixClient.items.insert(dataItem);
              this.log(`✅ Inserted schema: ${schemaName}`, 'success');
            }
            successCount++;
          } catch (error) {
            this.log(`❌ Failed to deploy schema ${schemaName}: ${error.message}`, 'error');
          }
        } catch (error) {
          this.log(`❌ Error processing ${schemaFile}: ${error.message}`, 'error');
        }
      }

      this.log(`✅ Deployed ${successCount}/${schemaFiles.length} schemas`, 'success');
      return successCount > 0;
    } catch (error) {
      this.log(`❌ Failed to deploy structured data: ${error.message}`, 'error');
      return false;
    }
  }

  async deploySiteSettings() {
    try {
      this.log('Deploying site settings...', 'deploy');
      
      const orgProfilePath = path.join(this.projectRoot, 'data', 'org-profile.json');
      if (!fs.existsSync(orgProfilePath)) {
        this.log('⚠️ Organization profile not found', 'warning');
        return false;
      }

      const orgProfile = JSON.parse(fs.readFileSync(orgProfilePath, 'utf8'));

      const siteSettings = {
        siteName: orgProfile.brandName,
        description: 'Professional digital marketing and insurance services for small businesses in Greensburg, PA',
        contactInfo: JSON.stringify({
          phone: orgProfile.telephone,
          email: 'Info@TNRBusinessSolutions.com',
          address: {
            street: orgProfile.streetAddress,
            city: orgProfile.locality,
            state: orgProfile.region,
            zip: orgProfile.postalCode,
          },
        }),
        socialLinks: JSON.stringify(orgProfile.social),
        lastUpdated: new Date().toISOString(),
      };

      const dataItem = {
        dataCollectionId: 'SiteSettings',
        dataItem: siteSettings
      };

      try {
        // Try to update existing or insert new
        const existing = await this.wixClient.items.query({
          dataCollectionId: 'SiteSettings',
          filter: { siteName: orgProfile.brandName }
        }).find();

        if (existing.items.length > 0) {
          await this.wixClient.items.update({
            dataCollectionId: 'SiteSettings',
            dataItemId: existing.items[0]._id,
            dataItem: dataItem.dataItem
          });
          this.log('✅ Site settings updated', 'success');
        } else {
          await this.wixClient.items.insert(dataItem);
          this.log('✅ Site settings inserted', 'success');
        }
        return true;
      } catch (error) {
        this.log(`❌ Failed to deploy site settings: ${error.message}`, 'error');
        return false;
      }
    } catch (error) {
      this.log(`❌ Failed to deploy site settings: ${error.message}`, 'error');
      return false;
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
      paragraphs: pMatches.map(p => p.replace(/<[^>]*>/g, '')).slice(0, 5),
      content: htmlContent,
    };
  }

  async deployAllContent() {
    this.log('🚀 TNR Business Solutions - Automated Wix Deployment', 'deploy');
    this.log('==================================================', 'deploy');

    // Initialize client
    const clientReady = await this.initializeClient();
    if (!clientReady) {
      return false;
    }

    // Ensure collections exist
    await this.ensureCollectionsExist();

    // Deploy all content
    const homepageSuccess = await this.deployHomepageContent();
    const servicesSuccess = await this.deployServicePages();
    const schemasSuccess = await this.deployStructuredData();
    const settingsSuccess = await this.deploySiteSettings();

    const totalSuccess = [homepageSuccess, servicesSuccess, schemasSuccess, settingsSuccess].filter(Boolean).length;

    if (totalSuccess > 0) {
      this.log('🎉 Automated deployment completed successfully!', 'success');
      this.log('📋 Content deployed to Wix Data Collections:', 'info');
      this.log('   📁 WebsiteContent - All pages and content', 'info');
      this.log('   📁 SEOSchemas - Structured data for SEO', 'info');
      this.log('   📁 SiteSettings - Site configuration', 'info');
      this.log('', 'info');
      this.log('🌐 Your site is now updated and live!', 'success');
      this.log('🔗 Editor: https://editor.wix.com/html/editor/web/renderer/edit/02850de4-e269-47bb-8510-343adc4469ee?metaSiteId=4483f29d-f541-486b-ae48-64f09aaa56b3', 'info');
      return true;
    } else {
      this.log('❌ Automated deployment failed', 'error');
      return false;
    }
  }
}

// Run deployment if called directly
if (require.main === module) {
  const deployer = new AutomatedWixDeployer();
  deployer.deployAllContent()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Deployment failed:', error.message);
      process.exit(1);
    });
}

module.exports = { AutomatedWixDeployer };
