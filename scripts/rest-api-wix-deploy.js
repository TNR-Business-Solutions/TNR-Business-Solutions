#!/usr/bin/env node

/**
 * TNR Business Solutions - REST API Wix Deployment
 * Uses Wix REST API directly for automated deployment
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

class RESTWixDeployer {
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

  async makeAPICall(url, options = {}) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const requestOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || 443,
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      };

      const req = https.request(requestOptions, res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(jsonData);
            } else {
              reject(
                new Error(
                  `API Error ${res.statusCode}: ${jsonData.message || data}`
                )
              );
            }
          } catch (error) {
            reject(new Error(`Failed to parse response: ${data}`));
          }
        });
      });

      req.on('error', reject);

      if (options.body) {
        req.write(options.body);
      }

      req.end();
    });
  }

  async getSiteInfo() {
    try {
      this.log('Getting site information...', 'api');
      const siteInfo = await this.makeAPICall(`https://www.wixapis.com/site/v1/site`);
      this.log(`✅ Site: ${siteInfo.site?.displayName || 'Unknown'}`, 'success');
      this.log(`   URL: ${siteInfo.site?.url || 'N/A'}`, 'info');
      this.log(`   Status: ${siteInfo.site?.status || 'N/A'}`, 'info');
      return siteInfo;
    } catch (error) {
      this.log(`❌ Failed to get site info: ${error.message}`, 'error');
      return null;
    }
  }

  async getCollections() {
    try {
      this.log('Getting available collections...', 'api');
      const collections = await this.makeAPICall(`https://www.wixapis.com/wix-data/v2/collections`);
      this.log(`✅ Found ${collections.collections?.length || 0} collections`, 'success');
      
      if (collections.collections) {
        collections.collections.forEach(collection => {
          this.log(`   📁 ${collection.displayName} (${collection.id})`, 'info');
        });
      }
      
      return collections.collections || [];
    } catch (error) {
      this.log(`❌ Failed to get collections: ${error.message}`, 'error');
      return [];
    }
  }

  async createCollection(collectionName, fields) {
    try {
      this.log(`Creating collection: ${collectionName}`, 'api');
      
      const collectionData = {
        displayName: collectionName,
        fields: fields,
        permissions: {
          read: 'PUBLIC',
          write: 'OWNER'
        }
      };

      const result = await this.makeAPICall(`https://www.wixapis.com/wix-data/v2/collections`, {
        method: 'POST',
        body: JSON.stringify(collectionData)
      });

      this.log(`✅ Collection ${collectionName} created successfully`, 'success');
      return result;
    } catch (error) {
      this.log(`⚠️ Could not create collection ${collectionName}: ${error.message}`, 'warning');
      return null;
    }
  }

  async insertDataItem(collectionId, dataItem) {
    try {
      const result = await this.makeAPICall(`https://www.wixapis.com/wix-data/v2/items`, {
        method: 'POST',
        body: JSON.stringify({
          dataCollectionId: collectionId,
          dataItem: dataItem
        })
      });

      return result;
    } catch (error) {
      throw new Error(`Failed to insert data item: ${error.message}`);
    }
  }

  async updateDataItem(collectionId, itemId, dataItem) {
    try {
      const result = await this.makeAPICall(`https://www.wixapis.com/wix-data/v2/items/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          dataCollectionId: collectionId,
          dataItem: dataItem
        })
      });

      return result;
    } catch (error) {
      throw new Error(`Failed to update data item: ${error.message}`);
    }
  }

  async queryDataItems(collectionId, filter = {}) {
    try {
      const result = await this.makeAPICall(`https://www.wixapis.com/wix-data/v2/items/query`, {
        method: 'POST',
        body: JSON.stringify({
          dataCollectionId: collectionId,
          query: { filter: filter }
        })
      });

      return result;
    } catch (error) {
      throw new Error(`Failed to query data items: ${error.message}`);
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

      // Try to find existing homepage in any collection
      const collections = await this.getCollections();
      let deployed = false;

      for (const collection of collections) {
        try {
          const existing = await this.queryDataItems(collection.id, { pageId: 'homepage' });
          
          if (existing.items && existing.items.length > 0) {
            // Update existing
            await this.updateDataItem(collection.id, existing.items[0]._id, dataItem);
            this.log(`✅ Homepage content updated in ${collection.displayName}`, 'success');
          } else {
            // Insert new
            await this.insertDataItem(collection.id, dataItem);
            this.log(`✅ Homepage content inserted into ${collection.displayName}`, 'success');
          }
          deployed = true;
          break;
        } catch (error) {
          this.log(`⚠️ Failed to deploy to ${collection.displayName}: ${error.message}`, 'warning');
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
    this.log('🚀 TNR Business Solutions - REST API Wix Deployment', 'deploy');
    this.log('==================================================', 'deploy');

    // Get site info
    const siteInfo = await this.getSiteInfo();
    if (!siteInfo) {
      this.log('❌ Could not access site information', 'error');
      return false;
    }

    // Get collections
    const collections = await this.getCollections();
    if (collections.length === 0) {
      this.log('❌ No collections found. Creating collections...', 'error');
      
      // Create collections
      await this.createCollection('WebsiteContent', [
        { key: 'pageType', type: 'TEXT' },
        { key: 'pageId', type: 'TEXT' },
        { key: 'title', type: 'TEXT' },
        { key: 'description', type: 'TEXT' },
        { key: 'mainHeading', type: 'TEXT' },
        { key: 'subHeadings', type: 'TEXT' },
        { key: 'paragraphs', type: 'TEXT' },
        { key: 'content', type: 'TEXT' },
        { key: 'lastUpdated', type: 'TEXT' }
      ]);
    }

    // Deploy content
    const homepageSuccess = await this.deployHomepageContent();

    if (homepageSuccess) {
      this.log('🎉 REST API deployment completed successfully!', 'success');
      this.log('🌐 Your site is now updated and live!', 'success');
      this.log('🔗 Editor: https://editor.wix.com/html/editor/web/renderer/edit/02850de4-e269-47bb-8510-343adc4469ee?metaSiteId=4483f29d-f541-486b-ae48-64f09aaa56b3', 'info');
      return true;
    } else {
      this.log('❌ REST API deployment failed', 'error');
      return false;
    }
  }
}

// Run deployment if called directly
if (require.main === module) {
  const deployer = new RESTWixDeployer();
  deployer.deployAllContent()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Deployment failed:', error.message);
      process.exit(1);
    });
}

module.exports = { RESTWixDeployer };
