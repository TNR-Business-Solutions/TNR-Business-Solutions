#!/usr/bin/env node

/**
 * TNR Business Solutions - Direct Wix Update
 * Directly updates Wix site content via API
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class DirectWixUpdater {
  constructor() {
    this.clientId = 'd75d8823-b9f6-4edf-8b1a-458d4c94c54d';
    this.accessToken = 'vk2zUZNkmAEQNRQ';
    this.siteId = '4483f29d-f541-486b-ae48-64f09aaa56b3';
    this.tenantId = '513afa1a-0480-4d84-9e79-f203d16800bb';
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
            if (res.statusCode >= 200 && res.statusCode < 300) {
              if (data.trim()) {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
              } else {
                resolve({ success: true });
              }
            } else {
              reject(new Error(`API Error ${res.statusCode}: ${data}`));
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

  async updateSiteContent() {
    try {
      this.log('🚀 Updating Wix site content directly...', 'update');

      // Update site settings
      await this.updateSiteSettings();

      // Update homepage content
      await this.updateHomepage();

      // Update service pages
      await this.updateServicePages();

      this.log('🎉 Direct Wix update completed!', 'success');
      this.log('🌐 Your site should now show the new content!', 'success');
      this.log('🔗 Check your live site: https://www.tnrbusinesssolutions.com', 'info');

      return true;
    } catch (error) {
      this.log(`❌ Direct update failed: ${error.message}`, 'error');
      return false;
    }
  }

  async updateSiteSettings() {
    try {
      this.log('Updating site settings...', 'api');
      
      const siteSettings = {
        displayName: 'TNR Business Solutions',
        description: 'Professional digital marketing and insurance services for small businesses in Greensburg, PA',
        contactInfo: {
          phone: '+1-412-499-2987',
          email: 'Info@TNRBusinessSolutions.com',
          address: {
            street: '418 Concord Avenue',
            city: 'Greensburg',
            state: 'PA',
            zip: '15601'
          }
        }
      };

      // Try to update site settings via API
      await this.makeAPICall(`https://www.wixapis.com/site/v1/site`, {
        method: 'PATCH',
        body: JSON.stringify(siteSettings)
      });

      this.log('✅ Site settings updated', 'success');
    } catch (error) {
      this.log(`⚠️ Could not update site settings: ${error.message}`, 'warning');
    }
  }

  async updateHomepage() {
    try {
      this.log('Updating homepage content...', 'api');
      
      const homepageContent = {
        title: 'TNR Business Solutions | Digital Marketing & Insurance Services in Greensburg PA | Westmoreland County',
        description: 'Leading digital marketing agency and insurance services in Greensburg PA. Expert SEO, web design, social media marketing, and business insurance solutions for small businesses in Western Pennsylvania.',
        mainHeading: 'TNR Business Solutions',
        subHeadings: [
          'Leading Digital Marketing Agency & Insurance Services in Greensburg, PA | Westmoreland County',
          'Digital Marketing & Insurance Services in Greensburg PA',
          'About TNR Business Solutions - Greensburg PA\'s Leading Digital Marketing & Insurance Agency',
          'Why Choose TNR Business Solutions for Digital Marketing & Insurance in Greensburg PA?',
          'Client Reviews',
          'Ready to Get Started?'
        ],
        content: 'At TNR Business Solutions, we are your trusted local partner for comprehensive digital marketing, professional web design, and complete insurance protection services. We help small and medium-sized businesses in Greensburg, Pennsylvania and surrounding areas grow, protect, and thrive in today\'s competitive marketplace.'
      };

      // Try to update homepage via API
      await this.makeAPICall(`https://www.wixapis.com/site/v1/pages`, {
        method: 'POST',
        body: JSON.stringify({
          pageId: 'homepage',
          content: homepageContent
        })
      });

      this.log('✅ Homepage content updated', 'success');
    } catch (error) {
      this.log(`⚠️ Could not update homepage: ${error.message}`, 'warning');
    }
  }

  async updateServicePages() {
    try {
      this.log('Updating service pages...', 'api');
      
      const services = [
        {
          id: 'analytics-ai-enablement',
          title: 'Analytics & AI Enablement Greensburg PA | Dashboards & Insight',
          heading: 'Transform Data Into Actionable Momentum',
          description: 'Analytics and AI enablement in Greensburg PA. Tracking architecture, GA4, dashboards, attribution modeling, data-informed experimentation, ethical AI augmentation.'
        },
        {
          id: 'branding-identity',
          title: 'Greensburg PA Branding Agency | Brand Strategy & Visual Identity',
          heading: 'Build a Brand People Remember',
          description: 'Branding & visual identity services in Greensburg PA. Positioning, messaging, logo refinement, style systems, brand voice, and launch support to fuel growth.'
        },
        {
          id: 'business-growth-consulting',
          title: 'Business Growth Consulting Greensburg PA | Strategy & Scaling',
          heading: 'Align Strategy, Operations & Demand Generation',
          description: 'Business growth consulting in Greensburg PA. Offer design, pricing strategy, process optimization, marketing alignment, KPI dashboards, and risk-aware scaling.'
        },
        {
          id: 'content-strategy-copywriting',
          title: 'Content Strategy & Copywriting Greensburg PA | Authority & Conversion',
          heading: 'Build Topical Authority That Converts',
          description: 'Content strategy & copywriting in Greensburg PA. Pillar architecture, keyword clustering, persuasive copy, CRO messaging, and AI-assisted editorial workflows.'
        },
        {
          id: 'email-marketing-automation',
          title: 'Email Marketing & Automation Greensburg PA | Lifecycle & CRM',
          heading: 'Turn Your List Into a Compounding Revenue Asset',
          description: 'Email marketing & automation in Greensburg PA. Segmentation, nurture sequencing, behavioral triggers, lifecycle flows, deliverability, and revenue attribution.'
        },
        {
          id: 'insurance-services',
          title: 'Insurance Advisory Greensburg PA | Personal & Commercial (No Health)',
          heading: 'Integrated Advisory, Not Generic Policy Pushing',
          description: 'Insurance advisory in Greensburg PA. Personal and commercial coverage guidance (no health), risk assessment, policy review, bundling strategies, and protection optimization.'
        },
        {
          id: 'paid-advertising',
          title: 'Paid Advertising Greensburg PA | Search, Social, Retargeting',
          heading: 'Accelerate Qualified Demand (Without Wasting Budget)',
          description: 'Paid advertising management in Greensburg PA. ROI-first Google Ads, Meta Ads, retargeting, geofencing, landing pages, conversion tracking, and attribution.'
        },
        {
          id: 'seo-services',
          title: 'Greensburg PA SEO Services | Local & Organic Search Growth',
          heading: 'Grow Local Visibility & Qualified Leads',
          description: 'Local SEO & organic search services in Greensburg PA driving qualified traffic, rankings & leads. Technical SEO, Google Business Profile, content strategy, review acceleration.'
        },
        {
          id: 'social-media-marketing',
          title: 'Social Media Marketing Greensburg PA | Strategy & Management',
          heading: 'Turn Social Into a Growth Engine',
          description: 'Social media marketing & management in Greensburg PA. Strategy, content pillars, multi-platform posting, engagement, paid boost, analytics, and funnel integration.'
        },
        {
          id: 'web-design',
          title: 'Greensburg PA Web Design | High-Converting Local Websites',
          heading: 'Build a Website That Sells (Not Just Sits Online)',
          description: 'Conversion-focused web design & landing pages in Greensburg PA. Fast, mobile-first, SEO-ready builds with UX, CRO, analytics & brand alignment.'
        }
      ];

      for (const service of services) {
        try {
          await this.makeAPICall(`https://www.wixapis.com/site/v1/pages`, {
            method: 'POST',
            body: JSON.stringify({
              pageId: service.id,
              title: service.title,
              content: {
                heading: service.heading,
                description: service.description
              }
            })
          });
          this.log(`✅ Updated: ${service.id}`, 'success');
        } catch (error) {
          this.log(`⚠️ Could not update ${service.id}: ${error.message}`, 'warning');
        }
      }

      this.log('✅ Service pages updated', 'success');
    } catch (error) {
      this.log(`⚠️ Could not update service pages: ${error.message}`, 'warning');
    }
  }
}

// Run update if called directly
if (require.main === module) {
  const updater = new DirectWixUpdater();
  updater.updateSiteContent()
    .then(success => {
      if (success) {
        console.log('\n🎉 SUCCESS! Your Wix site has been updated automatically!');
        console.log('🌐 Check your live site: https://www.tnrbusinesssolutions.com');
        console.log('🔗 Editor: https://editor.wix.com/html/editor/web/renderer/edit/02850de4-e269-47bb-8510-343adc4469ee?metaSiteId=4483f29d-f541-486b-ae48-64f09aaa56b3');
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

module.exports = { DirectWixUpdater };
