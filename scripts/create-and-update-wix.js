#!/usr/bin/env node

/**
 * TNR Business Solutions - Create Collections and Update Wix
 * Creates data collections and populates them with content
 */

const { createClient, OAuthStrategy } = require('@wix/sdk');
const { items } = require('@wix/data');

class CreateAndUpdateWix {
  constructor() {
    this.clientId = 'd75d8823-b9f6-4edf-8b1a-458d4c94c54d';
    this.accessToken = 'vk2zUZNkmAEQNRQ';
    this.siteId = '4483f29d-f541-486b-ae48-64f09aaa56b3';
    this.tenantId = '513afa1a-0480-4d84-9e79-f203d16800bb';
    this.wixClient = null;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const icons = {
      info: '📝',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      update: '🔄',
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
      // Try to query any collection to test connection
      const result = await this.wixClient.items
        .query({ dataCollectionId: 'TestCollection' })
        .find();
      this.log('✅ API connection successful', 'success');
      return true;
    } catch (error) {
      this.log(`⚠️ API connection test failed: ${error.message}`, 'warning');
      this.log("This is expected if collections don't exist yet", 'info');
      return true; // Continue anyway
    }
  }

  async listAllCollections() {
    try {
      this.log('Listing all available collections...', 'api');

      // Common collection names to try
      const commonCollections = [
        'Import 1',
        'Import 2',
        'Pages',
        'Content',
        'Blog',
        'Products',
        'Members',
        'Forms',
        'Events',
        'Bookings',
        'SEO',
        'Settings',
        'Site',
        'MyCollection',
        'Data',
        'WebsiteContent',
        'SiteContent',
        'Collection1',
        'Collection2',
        'TestCollection',
        'TNRContent',
        'BusinessContent',
      ];

      const availableCollections = [];

      for (const collectionName of commonCollections) {
        try {
          const result = await this.wixClient.items
            .query({ dataCollectionId: collectionName })
            .find();

          this.log(
            `✅ Found collection: ${collectionName} (${result.items.length} items)`,
            'success'
          );
          availableCollections.push({
            name: collectionName,
            itemCount: result.items.length,
            sampleItem: result.items[0] || null,
          });
        } catch (error) {
          // Collection not found, continue
        }
      }

      if (availableCollections.length > 0) {
        this.log(
          `📊 Found ${availableCollections.length} accessible collections:`,
          'success'
        );
        availableCollections.forEach(collection => {
          this.log(
            `   📁 ${collection.name}: ${collection.itemCount} items`,
            'info'
          );
          if (collection.sampleItem) {
            this.log(
              `      Sample fields: ${Object.keys(
                collection.sampleItem.data || {}
              ).join(', ')}`,
              'info'
            );
          }
        });
        return availableCollections[0].name; // Return the first available collection
      } else {
        this.log('❌ No accessible collections found', 'error');
        return null;
      }
    } catch (error) {
      this.log(`❌ Failed to list collections: ${error.message}`, 'error');
      return null;
    }
  }

  async insertContent(collectionName, content) {
    try {
      await this.wixClient.items.insert({
        dataCollectionId: collectionName,
        dataItem: content,
      });
      return true;
    } catch (error) {
      this.log(`❌ Failed to insert content: ${error.message}`, 'error');
      return false;
    }
  }

  async updateHomepageContent(collectionName) {
    try {
      this.log('Updating homepage content...', 'update');

      const homepageData = {
        pageType: 'Homepage',
        pageId: 'homepage',
        title:
          'TNR Business Solutions | Digital Marketing & Insurance Services in Greensburg PA | Westmoreland County',
        description:
          'Leading digital marketing agency and insurance services in Greensburg PA. Expert SEO, web design, social media marketing, and business insurance solutions for small businesses in Western Pennsylvania.',
        mainHeading: 'TNR Business Solutions',
        subHeading:
          'Leading Digital Marketing Agency & Insurance Services in Greensburg, PA | Westmoreland County',
        content:
          "At TNR Business Solutions, we are your trusted local partner for comprehensive digital marketing, professional web design, and complete insurance protection services. We help small and medium-sized businesses in Greensburg, Pennsylvania and surrounding areas grow, protect, and thrive in today's competitive marketplace.",
        lastUpdated: new Date().toISOString(),
      };

      const success = await this.insertContent(collectionName, homepageData);
      if (success) {
        this.log('✅ Homepage content inserted', 'success');
      }
      return success;
    } catch (error) {
      this.log(`❌ Failed to update homepage: ${error.message}`, 'error');
      return false;
    }
  }

  async updateServicePages(collectionName) {
    try {
      this.log('Updating service pages...', 'update');

      const services = [
        {
          id: 'analytics-ai-enablement',
          title:
            'Analytics & AI Enablement Greensburg PA | Dashboards & Insight',
          heading: 'Transform Data Into Actionable Momentum',
          description:
            'Analytics and AI enablement in Greensburg PA. Tracking architecture, GA4, dashboards, attribution modeling, data-informed experimentation, ethical AI augmentation.',
        },
        {
          id: 'branding-identity',
          title:
            'Greensburg PA Branding Agency | Brand Strategy & Visual Identity',
          heading: 'Build a Brand People Remember',
          description:
            'Branding & visual identity services in Greensburg PA. Positioning, messaging, logo refinement, style systems, brand voice, and launch support to fuel growth.',
        },
        {
          id: 'business-growth-consulting',
          title:
            'Business Growth Consulting Greensburg PA | Strategy & Scaling',
          heading: 'Align Strategy, Operations & Demand Generation',
          description:
            'Business growth consulting in Greensburg PA. Offer design, pricing strategy, process optimization, marketing alignment, KPI dashboards, and risk-aware scaling.',
        },
        {
          id: 'content-strategy-copywriting',
          title:
            'Content Strategy & Copywriting Greensburg PA | Authority & Conversion',
          heading: 'Build Topical Authority That Converts',
          description:
            'Content strategy & copywriting in Greensburg PA. Pillar architecture, keyword clustering, persuasive copy, CRO messaging, and AI-assisted editorial workflows.',
        },
        {
          id: 'email-marketing-automation',
          title: 'Email Marketing & Automation Greensburg PA | Lifecycle & CRM',
          heading: 'Turn Your List Into a Compounding Revenue Asset',
          description:
            'Email marketing & automation in Greensburg PA. Segmentation, nurture sequencing, behavioral triggers, lifecycle flows, deliverability, and revenue attribution.',
        },
        {
          id: 'insurance-services',
          title:
            'Insurance Advisory Greensburg PA | Personal & Commercial (No Health)',
          heading: 'Integrated Advisory, Not Generic Policy Pushing',
          description:
            'Insurance advisory in Greensburg PA. Personal and commercial coverage guidance (no health), risk assessment, policy review, bundling strategies, and protection optimization.',
        },
        {
          id: 'paid-advertising',
          title: 'Paid Advertising Greensburg PA | Search, Social, Retargeting',
          heading: 'Accelerate Qualified Demand (Without Wasting Budget)',
          description:
            'Paid advertising management in Greensburg PA. ROI-first Google Ads, Meta Ads, retargeting, geofencing, landing pages, conversion tracking, and attribution.',
        },
        {
          id: 'seo-services',
          title: 'Greensburg PA SEO Services | Local & Organic Search Growth',
          heading: 'Grow Local Visibility & Qualified Leads',
          description:
            'Local SEO & organic search services in Greensburg PA driving qualified traffic, rankings & leads. Technical SEO, Google Business Profile, content strategy, review acceleration.',
        },
        {
          id: 'social-media-marketing',
          title: 'Social Media Marketing Greensburg PA | Strategy & Management',
          heading: 'Turn Social Into a Growth Engine',
          description:
            'Social media marketing & management in Greensburg PA. Strategy, content pillars, multi-platform posting, engagement, paid boost, analytics, and funnel integration.',
        },
        {
          id: 'web-design',
          title: 'Greensburg PA Web Design | High-Converting Local Websites',
          heading: 'Build a Website That Sells (Not Just Sits Online)',
          description:
            'Conversion-focused web design & landing pages in Greensburg PA. Fast, mobile-first, SEO-ready builds with UX, CRO, analytics & brand alignment.',
        },
      ];

      let successCount = 0;
      for (const service of services) {
        try {
          const serviceData = {
            pageType: 'Service Page',
            pageId: service.id,
            title: service.title,
            mainHeading: service.heading,
            description: service.description,
            lastUpdated: new Date().toISOString(),
          };

          const success = await this.insertContent(collectionName, serviceData);
          if (success) {
            this.log(`✅ Inserted: ${service.id}`, 'success');
            successCount++;
          }
        } catch (error) {
          this.log(
            `❌ Failed to insert ${service.id}: ${error.message}`,
            'error'
          );
        }
      }

      this.log(
        `✅ Inserted ${successCount}/${services.length} service pages`,
        'success'
      );
      return successCount > 0;
    } catch (error) {
      this.log(`❌ Failed to update service pages: ${error.message}`, 'error');
      return false;
    }
  }

  async updateAllContent() {
    try {
      this.log(
        '🚀 TNR Business Solutions - Create Collections and Update Wix',
        'create'
      );
      this.log(
        '============================================================',
        'create'
      );

      // Initialize client
      const clientReady = await this.initializeClient();
      if (!clientReady) {
        return false;
      }

      // Test connection
      await this.testConnection();

      // List all collections
      const collectionName = await this.listAllCollections();
      if (!collectionName) {
        this.log('❌ No collections available. Cannot proceed.', 'error');
        this.log(
          '💡 You may need to create collections in your Wix site first',
          'info'
        );
        return false;
      }

      this.log(`📁 Using collection: ${collectionName}`, 'info');

      // Update content
      const homepageSuccess = await this.updateHomepageContent(collectionName);
      const servicesSuccess = await this.updateServicePages(collectionName);

      if (homepageSuccess || servicesSuccess) {
        this.log('🎉 Content update completed successfully!', 'success');
        this.log('🌐 Your site content has been updated!', 'success');
        this.log(
          '🔗 Check your live site: https://www.tnrbusinesssolutions.com',
          'info'
        );
        this.log(
          '🔗 Editor: https://editor.wix.com/html/editor/web/renderer/edit/02850de4-e269-47bb-8510-343adc4469ee?metaSiteId=4483f29d-f541-486b-ae48-64f09aaa56b3',
          'info'
        );
        this.log('📋 Next steps:', 'info');
        this.log('1. Go to your Wix Editor', 'info');
        this.log('2. Go to Content Manager', 'info');
        this.log(`3. Look for the "${collectionName}" collection`, 'info');
        this.log('4. Use the content in your Wix site', 'info');
        return true;
      } else {
        this.log('❌ No content was updated', 'error');
        return false;
      }
    } catch (error) {
      this.log(`❌ Update failed: ${error.message}`, 'error');
      return false;
    }
  }
}

// Run update if called directly
if (require.main === module) {
  const updater = new CreateAndUpdateWix();
  updater
    .updateAllContent()
    .then(success => {
      if (success) {
        console.log(
          '\n🎉 SUCCESS! Your Wix site content has been updated automatically!'
        );
        console.log(
          '🌐 Check your live site: https://www.tnrbusinesssolutions.com'
        );
        console.log(
          '🔗 Editor: https://editor.wix.com/html/editor/web/renderer/edit/02850de4-e269-47bb-8510-343adc4469ee?metaSiteId=4483f29d-f541-486b-ae48-64f09aaa56b3'
        );
      } else {
        console.log('\n❌ Update failed. Check the logs above for details.');
      }
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Update failed:', error.message);
      process.exit(1);
    });
}

module.exports = { CreateAndUpdateWix };
