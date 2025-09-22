#!/usr/bin/env node

/**
 * TNR Business Solutions - Deploy to Wix Collections
 * Creates collections and deploys content to Wix
 */

const { createClient, OAuthStrategy } = require('@wix/sdk');
const { items } = require('@wix/data');
const fs = require('fs');
const path = require('path');

class WixCollectionDeployer {
  constructor() {
    this.clientId = 'd75d8823-b9f6-4edf-8b1a-458d4c94c54d';
    this.accessToken = 'vk2zUZNkmAEQNRQ';
    this.siteId = '4483f29d-f541-486b-ae48-64f09aaa56b3';
    this.tenantId = '513afa1a-0480-4d84-9e79-f203d16800bb';
    this.projectRoot = process.cwd();
    this.distDir = path.join(this.projectRoot, 'dist');
    this.previewDir = path.join(this.distDir, 'preview');
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
      this.log('✅ Wix client initialized', 'success');
      return true;
    } catch (error) {
      this.log(`❌ Failed to initialize client: ${error.message}`, 'error');
      return false;
    }
  }

  async testConnection() {
    try {
      this.log('Testing Wix API connection...', 'api');

      // Try to query a simple collection to test connection
      const result = await this.wixClient.items
        .query({
          dataCollectionId: 'TestCollection',
        })
        .find();

      this.log('✅ API connection successful', 'success');
      return true;
    } catch (error) {
      this.log(`⚠️ API connection test failed: ${error.message}`, 'warning');
      this.log("This is expected if collections don't exist yet", 'info');
      return true; // Continue anyway
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
        dataCollectionId: 'WebsiteContent',
        dataItem: {
          pageType: 'Homepage',
          pageId: 'homepage',
          title: content.title,
          description: content.description,
          mainHeading: content.mainHeading,
          subHeadings: content.subHeadings,
          paragraphs: content.paragraphs,
          content: content.content,
          lastUpdated: new Date().toISOString(),
        },
      };

      try {
        await this.wixClient.items.insert(dataItem);
        this.log(
          '✅ Homepage content deployed to WebsiteContent collection',
          'success'
        );
      } catch (insertError) {
        this.log(`⚠️ Insert failed: ${insertError.message}`, 'warning');
        this.log(
          'Collection might not exist yet. Trying alternative approach...',
          'info'
        );

        // Try with a different collection name
        dataItem.dataCollectionId = 'Pages';
        try {
          await this.wixClient.items.insert(dataItem);
          this.log(
            '✅ Homepage content deployed to Pages collection',
            'success'
          );
        } catch (error2) {
          this.log(`❌ Failed to deploy homepage: ${error2.message}`, 'error');
          return false;
        }
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
              subHeadings: content.subHeadings,
              paragraphs: content.paragraphs,
              content: content.content,
              lastUpdated: new Date().toISOString(),
            },
          };

          try {
            await this.wixClient.items.insert(dataItem);
            this.log(`✅ Deployed: ${serviceName}`, 'success');
            successCount++;
          } catch (insertError) {
            // Try with Pages collection
            dataItem.dataCollectionId = 'Pages';
            try {
              await this.wixClient.items.insert(dataItem);
              this.log(`✅ Deployed: ${serviceName}`, 'success');
              successCount++;
            } catch (error2) {
              this.log(
                `❌ Failed to deploy ${serviceName}: ${error2.message}`,
                'error'
              );
            }
          }
        } catch (error) {
          this.log(
            `❌ Error processing ${serviceFile}: ${error.message}`,
            'error'
          );
        }
      }

      this.log(
        `✅ Deployed ${successCount}/${serviceFiles.length} service pages`,
        'success'
      );
      return successCount > 0;
    } catch (error) {
      this.log(`❌ Failed to deploy service pages: ${error.message}`, 'error');
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
    this.log('🚀 TNR Business Solutions - Wix Collection Deployment', 'deploy');
    this.log('====================================================', 'deploy');

    // Initialize client
    const clientReady = await this.initializeClient();
    if (!clientReady) {
      return false;
    }

    // Test connection
    await this.testConnection();

    // Deploy content
    const homepageSuccess = await this.deployHomepageContent();
    const servicesSuccess = await this.deployServicePages();

    if (homepageSuccess || servicesSuccess) {
      this.log('🎉 Deployment completed successfully!', 'success');
      this.log('📋 Next steps:', 'info');
      this.log('1. Go to your Wix Editor', 'info');
      this.log('2. Go to Content Manager', 'info');
      this.log('3. Look for "WebsiteContent" or "Pages" collection', 'info');
      this.log('4. Use the content in your Wix site', 'info');
      return true;
    } else {
      this.log('❌ Deployment failed', 'error');
      this.log(
        '💡 Try the manual approach: node scripts/generate-wix-content.js',
        'info'
      );
      return false;
    }
  }
}

// Run deployment if called directly
if (require.main === module) {
  const deployer = new WixCollectionDeployer();
  deployer
    .deployAllContent()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Deployment failed:', error.message);
      process.exit(1);
    });
}

module.exports = { WixCollectionDeployer };
