// TNR Business Solutions - Services Page
// All 10 services with detailed descriptions

$w.onReady(function () {
    // Update page title and meta description
    $w('#pageTitle').text = "Our Services | TNR Business Solutions | Digital Marketing & Insurance in Greensburg PA";
    $w('#pageDescription').text = "Comprehensive digital marketing and insurance services in Greensburg PA. SEO, web design, social media marketing, paid advertising, and business insurance solutions.";
    
    // Update main heading
    $w('#mainHeading').text = "Our Services";
    $w('#subHeading').text = "Comprehensive Digital Marketing & Insurance Solutions for Your Business";
    
    // Define all services
    const services = [
        {
            id: 'analytics-ai',
            title: 'Analytics & AI Enablement',
            heading: 'Transform Data Into Actionable Momentum',
            description: 'Analytics and AI enablement in Greensburg PA. Tracking architecture, GA4, dashboards, attribution modeling, data-informed experimentation, ethical AI augmentation.',
            content: 'Our analytics and AI enablement services help you transform raw data into actionable insights that drive business growth. We implement comprehensive tracking architecture, set up Google Analytics 4, create custom dashboards, and develop attribution models that give you a clear picture of your marketing performance.'
        },
        {
            id: 'branding-identity',
            title: 'Branding & Identity',
            heading: 'Build a Brand People Remember',
            description: 'Branding & visual identity services in Greensburg PA. Positioning, messaging, logo refinement, style systems, brand voice, and launch support to fuel growth.',
            content: 'Your brand is more than just a logo – it\'s the emotional connection your customers have with your business. Our branding and visual identity services help you create a memorable, cohesive brand that resonates with your target audience.'
        },
        {
            id: 'business-growth',
            title: 'Business Growth Consulting',
            heading: 'Align Strategy, Operations & Demand Generation',
            description: 'Business growth consulting in Greensburg PA. Offer design, pricing strategy, process optimization, marketing alignment, KPI dashboards, and risk-aware scaling.',
            content: 'Sustainable business growth requires alignment between strategy, operations, and demand generation. Our business growth consulting services help you design compelling offers, develop pricing strategies that maximize value, and optimize your operational processes.'
        },
        {
            id: 'content-strategy',
            title: 'Content Strategy & Copywriting',
            heading: 'Build Topical Authority That Converts',
            description: 'Content strategy & copywriting in Greensburg PA. Pillar architecture, keyword clustering, persuasive copy, CRO messaging, and AI-assisted editorial workflows.',
            content: 'Content is the foundation of your digital presence and the key to building trust with your audience. Our content strategy and copywriting services help you build topical authority through pillar architecture and keyword clustering.'
        },
        {
            id: 'email-marketing',
            title: 'Email Marketing & Automation',
            heading: 'Turn Your List Into a Compounding Revenue Asset',
            description: 'Email marketing & automation in Greensburg PA. Segmentation, nurture sequencing, behavioral triggers, lifecycle flows, deliverability, and revenue attribution.',
            content: 'Email marketing remains one of the most effective ways to nurture leads and drive sales. Our email marketing and automation services help you turn your email list into a compounding revenue asset.'
        },
        {
            id: 'insurance-services',
            title: 'Insurance Services',
            heading: 'Integrated Advisory, Not Generic Policy Pushing',
            description: 'Insurance advisory in Greensburg PA. Personal and commercial coverage guidance (no health), risk assessment, policy review, bundling strategies, and protection optimization.',
            content: 'Insurance is about protection, not just policies. Our insurance advisory services provide integrated guidance that goes beyond generic policy recommendations. We conduct comprehensive risk assessments and develop bundling strategies that save you money.'
        },
        {
            id: 'paid-advertising',
            title: 'Paid Advertising',
            heading: 'Accelerate Qualified Demand (Without Wasting Budget)',
            description: 'Paid advertising management in Greensburg PA. ROI-first Google Ads, Meta Ads, retargeting, geofencing, landing pages, conversion tracking, and attribution.',
            content: 'Paid advertising can accelerate your growth when done right. Our paid advertising management services focus on ROI-first strategies that maximize your budget efficiency.'
        },
        {
            id: 'seo-services',
            title: 'SEO Services',
            heading: 'Grow Local Visibility & Qualified Leads',
            description: 'Local SEO & organic search services in Greensburg PA driving qualified traffic, rankings & leads. Technical SEO, Google Business Profile, content strategy, review acceleration.',
            content: 'Local SEO is essential for businesses serving specific geographic areas. Our SEO services help you grow your local visibility and attract qualified leads from organic search.'
        },
        {
            id: 'social-media',
            title: 'Social Media Marketing',
            heading: 'Turn Social Into a Growth Engine',
            description: 'Social media marketing & management in Greensburg PA. Strategy, content pillars, multi-platform posting, engagement, paid boost, analytics, and funnel integration.',
            content: 'Social media is more than just posting – it\'s about building relationships and driving business results. Our social media marketing and management services help you turn social platforms into a growth engine.'
        },
        {
            id: 'web-design',
            title: 'Web Design',
            heading: 'Build a Website That Sells (Not Just Sits Online)',
            description: 'Conversion-focused web design & landing pages in Greensburg PA. Fast, mobile-first, SEO-ready builds with UX, CRO, analytics & brand alignment.',
            content: 'Your website is your digital storefront and often the first impression potential customers have of your business. Our conversion-focused web design services help you build a website that sells, not just sits online.'
        }
    ];
    
    // Generate services HTML
    let servicesHTML = '<div class="services-container">';
    
    services.forEach(service => {
        servicesHTML += `
            <div class="service-card" id="${service.id}">
                <h3>${service.title}</h3>
                <h4>${service.heading}</h4>
                <p class="service-description">${service.description}</p>
                <div class="service-content">${service.content}</div>
                <button class="learn-more-btn" onclick="showServiceDetails('${service.id}')">Learn More</button>
            </div>
        `;
    });
    
    servicesHTML += '</div>';
    
    // Update services content
    $w('#servicesContent').html = servicesHTML;
    
    // Add CSS styles
    $w('#pageStyles').html = `
        <style>
            .services-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin: 20px 0;
            }
            .service-card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 20px;
                background: #fff;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .service-card h3 {
                color: #2c3e50;
                margin-bottom: 10px;
            }
            .service-card h4 {
                color: #3498db;
                margin-bottom: 15px;
                font-size: 1.1em;
            }
            .service-description {
                font-weight: 500;
                margin-bottom: 15px;
            }
            .service-content {
                margin-bottom: 20px;
                line-height: 1.6;
            }
            .learn-more-btn {
                background: #3498db;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
            }
            .learn-more-btn:hover {
                background: #2980b9;
            }
        </style>
    `;
    
    console.log("TNR Business Solutions services page loaded successfully!");
});

// Function to show service details (can be expanded)
function showServiceDetails(serviceId) {
    console.log(`Showing details for service: ${serviceId}`);
    // Add modal or detailed view functionality here
}
