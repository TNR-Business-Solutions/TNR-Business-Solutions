#!/usr/bin/env node

/**
 * TNR Business Solutions - Real Wix Update
 * Uses Wix Data API to actually update site content
 */

const { createClient, OAuthStrategy } = require('@wix/sdk');
const { items } = require('@wix/data');

class RealWixUpdater {
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

  async findOrCreateCollection(collectionName) {
    try {
      // Try to find existing collection
      const result = await this.wixClient.items
        .query({ dataCollectionId: collectionName })
        .find();

      this.log(`✅ Found collection: ${collectionName}`, 'success');
      return collectionName;
    } catch (error) {
      this.log(
        `⚠️ Collection ${collectionName} not found, trying alternatives...`,
        'warning'
      );

      // Try alternative collection names
      const alternatives = [
        'Import 1',
        'Import 2',
        'Pages',
        'Content',
        'WebsiteContent',
        'SiteContent',
        'Data',
      ];

      for (const alt of alternatives) {
        try {
          const result = await this.wixClient.items
            .query({ dataCollectionId: alt })
            .find();

          this.log(`✅ Found alternative collection: ${alt}`, 'success');
          return alt;
        } catch (e) {
          // Continue to next alternative
        }
      }

      this.log(`❌ No suitable collection found`, 'error');
      return null;
    }
  }

  async updateHomepageContent() {
    try {
      this.log('Updating homepage content...', 'update');

      const collectionName = await this.findOrCreateCollection(
        'WebsiteContent'
      );
      if (!collectionName) {
        this.log('❌ No collection available for homepage', 'error');
        return false;
      }

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

      // Try to find existing homepage
      try {
        const existing = await this.wixClient.items
          .query({
            dataCollectionId: collectionName,
            filter: { pageId: 'homepage' },
          })
          .find();

        if (existing.items.length > 0) {
          // Update existing
          await this.wixClient.items.update({
            dataCollectionId: collectionName,
            dataItemId: existing.items[0]._id,
            dataItem: homepageData,
          });
          this.log('✅ Homepage content updated', 'success');
        } else {
          // Insert new
          await this.wixClient.items.insert({
            dataCollectionId: collectionName,
            dataItem: homepageData,
          });
          this.log('✅ Homepage content inserted', 'success');
        }
      } catch (error) {
        // If query fails, try to insert anyway
        await this.wixClient.items.insert({
          dataCollectionId: collectionName,
          dataItem: homepageData,
        });
        this.log('✅ Homepage content inserted (new)', 'success');
      }

      return true;
    } catch (error) {
      this.log(`❌ Failed to update homepage: ${error.message}`, 'error');
      return false;
    }
  }

  async updateServicePages() {
    try {
      this.log('Updating service pages...', 'update');

      const collectionName = await this.findOrCreateCollection(
        'WebsiteContent'
      );
      if (!collectionName) {
        this.log('❌ No collection available for services', 'error');
        return false;
      }

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

          // Try to find existing service
          try {
            const existing = await this.wixClient.items
              .query({
                dataCollectionId: collectionName,
                filter: { pageId: service.id },
              })
              .find();

            if (existing.items.length > 0) {
              // Update existing
              await this.wixClient.items.update({
                dataCollectionId: collectionName,
                dataItemId: existing.items[0]._id,
                dataItem: serviceData,
              });
            } else {
              // Insert new
              await this.wixClient.items.insert({
                dataCollectionId: collectionName,
                dataItem: serviceData,
              });
            }

            this.log(`✅ Updated: ${service.id}`, 'success');
            successCount++;
          } catch (error) {
            // If query fails, try to insert anyway
            await this.wixClient.items.insert({
              dataCollectionId: collectionName,
              dataItem: serviceData,
            });
            this.log(`✅ Inserted: ${service.id}`, 'success');
            successCount++;
          }
        } catch (error) {
          this.log(
            `❌ Failed to update ${service.id}: ${error.message}`,
            'error'
          );
        }
      }

      this.log(
        `✅ Updated ${successCount}/${services.length} service pages`,
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
      this.log('🚀 TNR Business Solutions - Real Wix Update', 'update');
      this.log('==========================================', 'update');

      // Initialize client
      const clientReady = await this.initializeClient();
      if (!clientReady) {
        return false;
      }

      // Update content
      const homepageSuccess = await this.updateHomepageContent();
      const servicesSuccess = await this.updateServicePages();

      if (homepageSuccess || servicesSuccess) {
        this.log('🎉 Real Wix update completed successfully!', 'success');
        this.log('🌐 Your site content has been updated!', 'success');
        this.log(
          '🔗 Check your live site: https://www.tnrbusinesssolutions.com',
          'info'
        );
        this.log(
          '🔗 Editor: https://editor.wix.com/html/editor/web/renderer/edit/02850de4-e269-47bb-8510-343adc4469ee?metaSiteId=4483f29d-f541-486b-ae48-64f09aaa56b3',
          'info'
        );
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
  const updater = new RealWixUpdater();
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

module.exports = { RealWixUpdater };
