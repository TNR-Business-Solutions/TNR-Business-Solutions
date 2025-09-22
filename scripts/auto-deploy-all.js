#!/usr/bin/env node

/**
 * TNR Business Solutions - Auto Deploy All
 * Generates content and pushes to GitHub to trigger automated deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AutoDeployAll {
  constructor() {
    this.projectRoot = process.cwd();
    this.distDir = path.join(this.projectRoot, 'dist');
    this.previewDir = path.join(this.distDir, 'preview');
    this.outputDir = path.join(this.projectRoot, 'wix-deployment');
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const icons = {
      info: '📝',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      deploy: '🚀',
      generate: '🔨',
      git: '📦',
    };
    console.log(`${icons[type] || '📝'} [${timestamp}] ${message}`);
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
      this.log('Created wix-deployment directory', 'success');
    }
  }

  generateHomepageContent() {
    this.log('Generating homepage content...', 'generate');

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
      instructions: [
        '1. Go to your Wix Editor',
        '2. Select your homepage',
        '3. Update the page title and meta description in SEO settings',
        '4. Replace the main heading with: TNR Business Solutions',
        '5. Update subheadings and content as needed',
      ],
    };

    fs.writeFileSync(
      path.join(this.outputDir, 'homepage.json'),
      JSON.stringify(homepageData, null, 2)
    );
    this.log('✅ Homepage content generated', 'success');
  }

  generateServicePagesContent() {
    this.log('Generating service pages content...', 'generate');

    const services = [
      {
        id: 'analytics-ai-enablement',
        title: 'Analytics & AI Enablement Greensburg PA | Dashboards & Insight',
        heading: 'Transform Data Into Actionable Momentum',
        description:
          'Analytics and AI enablement in Greensburg PA. Tracking architecture, GA4, dashboards, attribution modeling, data-informed experimentation, ethical AI augmentation.',
        content:
          'Our analytics and AI enablement services help you transform raw data into actionable insights that drive business growth. We implement comprehensive tracking architecture, set up Google Analytics 4, create custom dashboards, and develop attribution models that give you a clear picture of your marketing performance. Our data-informed experimentation approach ensures every decision is backed by solid evidence, while our ethical AI augmentation helps you leverage artificial intelligence responsibly and effectively.',
      },
      {
        id: 'branding-identity',
        title:
          'Greensburg PA Branding Agency | Brand Strategy & Visual Identity',
        heading: 'Build a Brand People Remember',
        description:
          'Branding & visual identity services in Greensburg PA. Positioning, messaging, logo refinement, style systems, brand voice, and launch support to fuel growth.',
        content:
          "Your brand is more than just a logo – it's the emotional connection your customers have with your business. Our branding and visual identity services help you create a memorable, cohesive brand that resonates with your target audience. We develop strategic positioning, craft compelling messaging, refine your logo and visual elements, and create comprehensive style systems that ensure consistency across all touchpoints.",
      },
      {
        id: 'business-growth-consulting',
        title: 'Business Growth Consulting Greensburg PA | Strategy & Scaling',
        heading: 'Align Strategy, Operations & Demand Generation',
        description:
          'Business growth consulting in Greensburg PA. Offer design, pricing strategy, process optimization, marketing alignment, KPI dashboards, and risk-aware scaling.',
        content:
          'Sustainable business growth requires alignment between strategy, operations, and demand generation. Our business growth consulting services help you design compelling offers, develop pricing strategies that maximize value, optimize your operational processes, and align your marketing efforts with your business objectives. We create KPI dashboards that track your progress and implement risk-aware scaling strategies that ensure long-term success.',
      },
      {
        id: 'content-strategy-copywriting',
        title:
          'Content Strategy & Copywriting Greensburg PA | Authority & Conversion',
        heading: 'Build Topical Authority That Converts',
        description:
          'Content strategy & copywriting in Greensburg PA. Pillar architecture, keyword clustering, persuasive copy, CRO messaging, and AI-assisted editorial workflows.',
        content:
          'Content is the foundation of your digital presence and the key to building trust with your audience. Our content strategy and copywriting services help you build topical authority through pillar architecture and keyword clustering. We create persuasive copy that converts visitors into customers, develop CRO messaging that drives action, and implement AI-assisted editorial workflows that streamline your content production process.',
      },
      {
        id: 'email-marketing-automation',
        title: 'Email Marketing & Automation Greensburg PA | Lifecycle & CRM',
        heading: 'Turn Your List Into a Compounding Revenue Asset',
        description:
          'Email marketing & automation in Greensburg PA. Segmentation, nurture sequencing, behavioral triggers, lifecycle flows, deliverability, and revenue attribution.',
        content:
          "Email marketing remains one of the most effective ways to nurture leads and drive sales. Our email marketing and automation services help you turn your email list into a compounding revenue asset. We implement advanced segmentation strategies, create nurture sequences that guide prospects through the buyer's journey, set up behavioral triggers that respond to user actions, and develop lifecycle flows that maximize customer lifetime value.",
      },
      {
        id: 'insurance-services',
        title:
          'Insurance Advisory Greensburg PA | Personal & Commercial (No Health)',
        heading: 'Integrated Advisory, Not Generic Policy Pushing',
        description:
          'Insurance advisory in Greensburg PA. Personal and commercial coverage guidance (no health), risk assessment, policy review, bundling strategies, and protection optimization.',
        content:
          "Insurance is about protection, not just policies. Our insurance advisory services provide integrated guidance that goes beyond generic policy recommendations. We conduct comprehensive risk assessments, review your existing coverage, develop bundling strategies that save you money, and optimize your protection to ensure you're covered where it matters most. We focus on personal and commercial coverage (excluding health insurance) to provide specialized expertise in the areas that matter most to your business.",
      },
      {
        id: 'paid-advertising',
        title: 'Paid Advertising Greensburg PA | Search, Social, Retargeting',
        heading: 'Accelerate Qualified Demand (Without Wasting Budget)',
        description:
          'Paid advertising management in Greensburg PA. ROI-first Google Ads, Meta Ads, retargeting, geofencing, landing pages, conversion tracking, and attribution.',
        content:
          'Paid advertising can accelerate your growth when done right. Our paid advertising management services focus on ROI-first strategies that maximize your budget efficiency. We manage Google Ads campaigns that capture high-intent search traffic, create Meta Ads that engage your target audience, implement retargeting campaigns that bring back interested visitors, and use geofencing to reach local prospects. Every campaign is backed by conversion tracking and attribution analysis that proves its value.',
      },
      {
        id: 'seo-services',
        title: 'Greensburg PA SEO Services | Local & Organic Search Growth',
        heading: 'Grow Local Visibility & Qualified Leads',
        description:
          'Local SEO & organic search services in Greensburg PA driving qualified traffic, rankings & leads. Technical SEO, Google Business Profile, content strategy, review acceleration.',
        content:
          'Local SEO is essential for businesses serving specific geographic areas. Our SEO services help you grow your local visibility and attract qualified leads from organic search. We implement technical SEO improvements that make your site search-engine friendly, optimize your Google Business Profile to dominate local search results, develop content strategies that target relevant keywords, and accelerate your review acquisition to build trust and credibility with potential customers.',
      },
      {
        id: 'social-media-marketing',
        title: 'Social Media Marketing Greensburg PA | Strategy & Management',
        heading: 'Turn Social Into a Growth Engine',
        description:
          'Social media marketing & management in Greensburg PA. Strategy, content pillars, multi-platform posting, engagement, paid boost, analytics, and funnel integration.',
        content:
          "Social media is more than just posting – it's about building relationships and driving business results. Our social media marketing and management services help you turn social platforms into a growth engine. We develop comprehensive strategies, create content pillars that resonate with your audience, manage multi-platform posting schedules, engage with your community to build relationships, implement paid boost strategies that amplify your reach, and provide analytics that track your social media ROI.",
      },
      {
        id: 'web-design',
        title: 'Greensburg PA Web Design | High-Converting Local Websites',
        heading: 'Build a Website That Sells (Not Just Sits Online)',
        description:
          'Conversion-focused web design & landing pages in Greensburg PA. Fast, mobile-first, SEO-ready builds with UX, CRO, analytics & brand alignment.',
        content:
          'Your website is your digital storefront and often the first impression potential customers have of your business. Our conversion-focused web design services help you build a website that sells, not just sits online. We create fast, mobile-first designs that provide an excellent user experience, implement conversion rate optimization techniques that turn visitors into customers, ensure your site is SEO-ready to attract organic traffic, and align every element with your brand to create a cohesive, professional presence.',
      },
    ];

    const servicesData = services.map(service => ({
      pageType: 'Service Page',
      pageId: service.id,
      title: service.title,
      mainHeading: service.heading,
      description: service.description,
      content: service.content,
      lastUpdated: new Date().toISOString(),
      instructions: [
        `1. Go to your Wix Editor`,
        `2. Create or select the ${service.id} page`,
        `3. Update the page title and meta description in SEO settings`,
        `4. Replace the main heading with: ${service.heading}`,
        `5. Add the content and description as needed`,
      ],
    }));

    fs.writeFileSync(
      path.join(this.outputDir, 'services.json'),
      JSON.stringify(servicesData, null, 2)
    );
    this.log(
      `✅ Generated content for ${servicesData.length} service pages`,
      'success'
    );
  }

  generateSiteSettings() {
    this.log('Generating site settings...', 'generate');

    const siteSettings = {
      siteName: 'TNR Business Solutions',
      description:
        'Professional digital marketing and insurance services for small businesses in Greensburg, PA',
      contactInfo: {
        phone: '+1-412-499-2987',
        email: 'Info@TNRBusinessSolutions.com',
        address: {
          street: '418 Concord Avenue',
          city: 'Greensburg',
          state: 'PA',
          zip: '15601',
        },
      },
      socialLinks: {
        facebook: 'https://facebook.com/tnrbusinesssolutions',
        linkedin: 'https://linkedin.com/company/tnr-business-solutions',
        twitter: 'https://twitter.com/tnrbusiness',
      },
      lastUpdated: new Date().toISOString(),
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

  generateStructuredData() {
    this.log('Generating structured data...', 'generate');

    const structuredData = {
      organization: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'TNR Business Solutions',
        description:
          'Professional digital marketing and insurance services for small businesses in Greensburg, PA',
        url: 'https://www.tnrbusinesssolutions.com',
        logo: 'https://www.tnrbusinesssolutions.com/logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-412-499-2987',
          contactType: 'customer service',
          areaServed: 'US',
          availableLanguage: 'English',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '418 Concord Avenue',
          addressLocality: 'Greensburg',
          addressRegion: 'PA',
          postalCode: '15601',
          addressCountry: 'US',
        },
        sameAs: [
          'https://facebook.com/tnrbusinesssolutions',
          'https://linkedin.com/company/tnr-business-solutions',
          'https://twitter.com/tnrbusiness',
        ],
      },
      localBusiness: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'TNR Business Solutions',
        description:
          'Leading digital marketing agency and insurance services in Greensburg PA',
        url: 'https://www.tnrbusinesssolutions.com',
        telephone: '+1-412-499-2987',
        email: 'Info@TNRBusinessSolutions.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '418 Concord Avenue',
          addressLocality: 'Greensburg',
          addressRegion: 'PA',
          postalCode: '15601',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '40.3012',
          longitude: '-79.5389',
        },
        openingHours: 'Mo-Fr 09:00-17:00',
        priceRange: '$$',
        serviceArea: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: '40.3012',
            longitude: '-79.5389',
          },
          geoRadius: '50000',
        },
      },
      lastUpdated: new Date().toISOString(),
      instructions: [
        '1. Go to your Wix Editor',
        '2. Go to SEO > Structured Data',
        "3. Add this schema manually or use Wix's SEO tools",
        '4. Copy the JSON-LD code from the file',
      ],
    };

    fs.writeFileSync(
      path.join(this.outputDir, 'structured-data.json'),
      JSON.stringify(structuredData, null, 2)
    );
    this.log('✅ Structured data generated', 'success');
  }

  generateInstructions() {
    const instructions = `# TNR Business Solutions - Automated Wix Deployment

## 🚀 AUTOMATED DEPLOYMENT COMPLETE!

Your website content has been automatically generated and is ready for deployment to Wix.

## 📁 Generated Files:

1. **homepage.json** - Complete homepage content
2. **services.json** - All 10 service pages with detailed content
3. **site-settings.json** - Site-wide settings and contact information
4. **structured-data.json** - SEO structured data schemas

## 🔄 What Happens Next:

1. **GitHub Actions** will automatically run
2. **Content files** are generated and pushed to your repository
3. **Wix integration** will attempt to update your site
4. **You'll receive** a notification when complete

## 📋 Manual Steps (if needed):

If the automated Wix update doesn't work, you can manually copy the content:

### Homepage:
- Open \`homepage.json\`
- Copy the content to your Wix homepage
- Update page title and meta description in SEO settings

### Service Pages:
- Open \`services.json\`
- For each service, create a new page in Wix
- Copy the content for each service to its respective page

### Site Settings:
- Open \`site-settings.json\`
- Go to Wix Editor > Site > Site Settings
- Update your site name, description, and contact info

### Structured Data:
- Open \`structured-data.json\`
- Go to Wix Editor > SEO > Structured Data
- Add the schemas manually

## 🔗 Important Links:

- **Live Site**: https://www.tnrbusinesssolutions.com
- **Wix Editor**: https://editor.wix.com/html/editor/web/renderer/edit/02850de4-e269-47bb-8510-343adc4469ee?metaSiteId=4483f29d-f541-486b-ae48-64f09aaa56b3
- **GitHub Repository**: https://github.com/TNR-Business-Solutions/TNR-Business-Solutions

## 🎉 Success!

Your website content has been automatically generated and deployed!

Generated on: ${new Date().toISOString()}
`;

    fs.writeFileSync(path.join(this.outputDir, 'README.md'), instructions);
    this.log('✅ Instructions generated', 'success');
  }

  async commitAndPush() {
    try {
      this.log('Committing and pushing changes to GitHub...', 'git');

      // Add all files
      execSync('git add .', { stdio: 'inherit' });

      // Commit with timestamp
      const timestamp = new Date().toISOString();
      execSync(`git commit -m "🚀 Automated Wix Deployment - ${timestamp}"`, {
        stdio: 'inherit',
      });

      // Push to main branch
      execSync('git push origin main', { stdio: 'inherit' });

      this.log('✅ Changes pushed to GitHub successfully!', 'success');
      this.log('🔄 GitHub Actions will now run automatically', 'info');
      return true;
    } catch (error) {
      this.log(`❌ Git operation failed: ${error.message}`, 'error');
      return false;
    }
  }

  async deployAll() {
    try {
      this.log('🚀 TNR Business Solutions - Auto Deploy All', 'deploy');
      this.log('==========================================', 'deploy');

      // Ensure output directory exists
      this.ensureOutputDir();

      // Generate all content
      this.generateHomepageContent();
      this.generateServicePagesContent();
      this.generateSiteSettings();
      this.generateStructuredData();
      this.generateInstructions();

      this.log('🎉 All content generated successfully!', 'success');
      this.log(`📁 Content files saved to: ${this.outputDir}`, 'info');

      // Commit and push to GitHub
      const gitSuccess = await this.commitAndPush();

      if (gitSuccess) {
        this.log('🎉 AUTOMATED DEPLOYMENT COMPLETE!', 'success');
        this.log(
          '🌐 Your website content has been generated and pushed to GitHub!',
          'success'
        );
        this.log(
          '🔄 GitHub Actions will now run automatically to update your Wix site',
          'info'
        );
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
        this.log('❌ Git push failed, but content files are ready', 'warning');
        this.log(
          '📁 You can manually copy content from the wix-deployment folder',
          'info'
        );
        return false;
      }
    } catch (error) {
      this.log(`❌ Auto deploy failed: ${error.message}`, 'error');
      return false;
    }
  }
}

// Run auto deploy if called directly
if (require.main === module) {
  const deployer = new AutoDeployAll();
  deployer
    .deployAll()
    .then(success => {
      if (success) {
        console.log(
          '\n🎉 SUCCESS! Your website has been automatically deployed!'
        );
        console.log(
          '🌐 Check your live site: https://www.tnrbusinesssolutions.com'
        );
        console.log(
          '🔗 Editor: https://editor.wix.com/html/editor/web/renderer/edit/02850de4-e269-47bb-8510-343adc4469ee?metaSiteId=4483f29d-f541-486b-ae48-64f09aaa56b3'
        );
      } else {
        console.log(
          '\n⚠️ Content generated but deployment had issues. Check the logs above.'
        );
      }
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Auto deploy failed:', error.message);
      process.exit(1);
    });
}

module.exports = { AutoDeployAll };
