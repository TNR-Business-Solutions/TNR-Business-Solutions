const fs = require('fs');
const path = require('path');

class ProfessionalSiteBuilder {
  constructor() {
    this.baseDir = path.join(__dirname, '..', 'dist');
    this.assetsDir = path.join(this.baseDir, 'assets');
    this.mediaDir = path.join(__dirname, '..', 'media');

    // Create directories
    this.createDirectories();
  }

  createDirectories() {
    [this.baseDir, this.assetsDir, this.mediaDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  buildSite() {
    console.log('🚀 Building professional TNR Business Solutions site...');

    // Build main CSS
    this.buildMainCSS();

    // Build homepage
    this.buildHomepage();

    // Build service pages
    this.buildServicePages();

    // Build other pages
    this.buildOtherPages();

    // Build navigation
    this.buildNavigation();

    // Build forms
    this.buildForms();

    console.log('✅ Professional site build completed!');
  }

  buildMainCSS() {
    const css = `/* TNR Business Solutions - Professional Styles */
:root {
  /* Brand Colors - Deep Forest Green, Pale Gold, Black, White */
  --tnr-primary: #0f4c81;
  --tnr-secondary: #ffb347;
  --tnr-accent: #1976d2;
  --tnr-black: #000000;
  --tnr-white: #ffffff;
  --tnr-text: #1e293b;
  --tnr-text-light: #64748b;
  --tnr-border: #e2e8f0;
  --tnr-light-gray: #f7fafc;
  
  /* Typography */
  --tnr-font-primary: "Arial", "Helvetica", sans-serif;
  --tnr-font-heading: "Arial", "Helvetica", sans-serif;
  
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
  
  /* Transitions */
  --tnr-transition-fast: 0.2s ease;
  --tnr-transition-normal: 0.3s ease;
  --tnr-transition-slow: 0.5s ease;
}

/* Reset and Base Styles */
* {
  box-sizing: border-box;
}

body {
  font-family: var(--tnr-font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--tnr-text);
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

h1 { font-size: 2.5rem; font-weight: 700; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }
h5 { font-size: 1.125rem; }
h6 { font-size: 1rem; }

p {
  margin: 0 0 var(--tnr-spacing-md) 0;
  color: var(--tnr-text);
}

a {
  color: var(--tnr-accent);
  text-decoration: none;
  transition: color var(--tnr-transition-fast);
}

a:hover {
  color: var(--tnr-primary);
}

/* Header Styles */
.header {
  background-color: var(--tnr-white);
  border-bottom: 1px solid var(--tnr-border);
  box-shadow: var(--tnr-shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--tnr-spacing-md) var(--tnr-spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--tnr-spacing-sm);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--tnr-primary);
}

.logo-img {
  height: 40px;
  width: auto;
}

.logo-text {
  color: var(--tnr-primary);
}

.logo:hover .logo-text {
  color: var(--tnr-accent);
}

/* Navigation */
.main-navigation {
  display: flex;
  align-items: center;
}

.main-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--tnr-spacing-lg);
  align-items: center;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: var(--tnr-text);
  text-decoration: none;
  font-weight: 500;
  padding: var(--tnr-spacing-sm) var(--tnr-spacing-md);
  border-radius: var(--tnr-radius-sm);
  transition: all var(--tnr-transition-normal);
  display: flex;
  align-items: center;
  gap: var(--tnr-spacing-xs);
}

.nav-link:hover {
  color: var(--tnr-accent);
  background-color: var(--tnr-light-gray);
}

/* Dropdown Styles */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
}

.dropdown-arrow {
  font-size: 0.8rem;
  transition: transform var(--tnr-transition-fast);
}

.dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--tnr-white);
  border: 1px solid var(--tnr-border);
  border-radius: var(--tnr-radius-md);
  box-shadow: var(--tnr-shadow-lg);
  list-style: none;
  margin: 0;
  padding: var(--tnr-spacing-sm) 0;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all var(--tnr-transition-normal);
  z-index: 1001;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-link {
  display: block;
  padding: var(--tnr-spacing-sm) var(--tnr-spacing-md);
  color: var(--tnr-text);
  text-decoration: none;
  transition: all var(--tnr-transition-fast);
  border-radius: var(--tnr-radius-sm);
  margin: 0 var(--tnr-spacing-xs);
}

.dropdown-link:hover {
  background-color: var(--tnr-light-gray);
  color: var(--tnr-accent);
}

/* Main Content */
.main-content {
  min-height: calc(100vh - 200px);
  padding: var(--tnr-spacing-2xl) 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--tnr-spacing-lg);
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--tnr-primary), var(--tnr-accent));
  color: var(--tnr-white);
  padding: var(--tnr-spacing-2xl) 0;
  text-align: center;
}

.hero h1 {
  color: var(--tnr-white);
  font-size: 3rem;
  margin-bottom: var(--tnr-spacing-lg);
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: var(--tnr-spacing-xl);
  color: var(--tnr-white);
  opacity: 0.9;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: var(--tnr-spacing-md) var(--tnr-spacing-xl);
  background-color: var(--tnr-primary);
  color: var(--tnr-white);
  text-decoration: none;
  border-radius: var(--tnr-radius-md);
  font-weight: 600;
  transition: all var(--tnr-transition-normal);
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: var(--tnr-accent);
  transform: translateY(-2px);
  box-shadow: var(--tnr-shadow-md);
}

.btn-secondary {
  background-color: var(--tnr-secondary);
  color: var(--tnr-black);
}

.btn-secondary:hover {
  background-color: var(--tnr-accent);
  color: var(--tnr-white);
}

/* Cards */
.card {
  background: var(--tnr-white);
  border: 1px solid var(--tnr-border);
  border-radius: var(--tnr-radius-lg);
  padding: var(--tnr-spacing-xl);
  box-shadow: var(--tnr-shadow-sm);
  transition: all var(--tnr-transition-normal);
}

.card:hover {
  box-shadow: var(--tnr-shadow-md);
  transform: translateY(-2px);
}

.card h3 {
  color: var(--tnr-primary);
  margin-bottom: var(--tnr-spacing-md);
}

/* Grid Layouts */
.grid {
  display: grid;
  gap: var(--tnr-spacing-xl);
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* Footer */
.footer {
  background-color: var(--tnr-primary);
  color: var(--tnr-white);
  padding: var(--tnr-spacing-2xl) 0 var(--tnr-spacing-lg);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--tnr-spacing-lg);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--tnr-spacing-xl);
  margin-bottom: var(--tnr-spacing-xl);
}

.footer h3 {
  color: var(--tnr-white);
  margin-bottom: var(--tnr-spacing-md);
}

.footer a {
  color: var(--tnr-white);
  opacity: 0.8;
  transition: opacity var(--tnr-transition-fast);
}

.footer a:hover {
  opacity: 1;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: var(--tnr-spacing-lg);
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-inner {
    flex-direction: column;
    gap: var(--tnr-spacing-md);
  }
  
  .main-nav {
    flex-direction: column;
    width: 100%;
    gap: var(--tnr-spacing-sm);
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero p {
    font-size: 1rem;
  }
  
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 var(--tnr-spacing-md);
  }
}

/* Utility Classes */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mb-0 { margin-bottom: 0; }
.mb-1 { margin-bottom: var(--tnr-spacing-xs); }
.mb-2 { margin-bottom: var(--tnr-spacing-sm); }
.mb-3 { margin-bottom: var(--tnr-spacing-md); }
.mb-4 { margin-bottom: var(--tnr-spacing-lg); }
.mb-5 { margin-bottom: var(--tnr-spacing-xl); }

.mt-0 { margin-top: 0; }
.mt-1 { margin-top: var(--tnr-spacing-xs); }
.mt-2 { margin-top: var(--tnr-spacing-sm); }
.mt-3 { margin-top: var(--tnr-spacing-md); }
.mt-4 { margin-top: var(--tnr-spacing-lg); }
.mt-5 { margin-top: var(--tnr-spacing-xl); }

.p-0 { padding: 0; }
.p-1 { padding: var(--tnr-spacing-xs); }
.p-2 { padding: var(--tnr-spacing-sm); }
.p-3 { padding: var(--tnr-spacing-md); }
.p-4 { padding: var(--tnr-spacing-lg); }
.p-5 { padding: var(--tnr-spacing-xl); }`;

    fs.writeFileSync(path.join(this.assetsDir, 'styles.css'), css);
    console.log('✅ Main CSS built');
  }

  buildHomepage() {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TNR Business Solutions | Digital Marketing & Insurance Services in Greensburg PA</title>
    <meta name="description" content="TNR Business Solutions offers digital marketing, design, consulting, and insurance services for small businesses in Greensburg, PA. Grow, protect, and thrive with our integrated solutions.">
    <meta name="keywords" content="digital marketing Greensburg PA, business insurance, web design, SEO services, social media management, small business consulting">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="TNR Business Solutions | Digital Marketing & Insurance Services">
    <meta property="og:description" content="Professional digital marketing and insurance services for small businesses in Greensburg, PA.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.tnrbusinesssolutions.com">
    <meta property="og:image" content="https://www.tnrbusinesssolutions.com/media/hero-image.jpg">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="TNR Business Solutions | Digital Marketing & Insurance Services">
    <meta name="twitter:description" content="Professional digital marketing and insurance services for small businesses in Greensburg, PA.">
    <meta name="twitter:image" content="https://www.tnrbusinesssolutions.com/media/hero-image.jpg">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/media/favicon.ico">
    
    <!-- CSS -->
    <link rel="stylesheet" href="assets/styles.css">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TNR Business Solutions",
        "url": "https://www.tnrbusinesssolutions.com",
        "logo": "https://www.tnrbusinesssolutions.com/media/logo.png",
        "description": "Professional digital marketing and insurance services for small businesses in Greensburg, PA",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "418 Concord Avenue",
            "addressLocality": "Greensburg",
            "addressRegion": "PA",
            "postalCode": "15601",
            "addressCountry": "US"
        },
        "telephone": "+1-412-499-2987",
        "email": "Info@TNRBusinessSolutions.com",
        "areaServed": "Greensburg, PA and surrounding areas",
        "serviceType": ["Digital Marketing", "Web Design", "SEO", "Social Media Management", "Business Insurance"]
    }
    </script>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="header-inner">
            <a href="/" class="logo">
                <img src="/media/logo-tnr-primary.png" alt="TNR Business Solutions" class="logo-img">
                <span class="logo-text">TNR Business Solutions</span>
            </a>
            <nav class="main-navigation">
                <ul class="main-nav">
                    <li><a href="/" class="nav-link">Home</a></li>
                    <li class="nav-item dropdown">
                        <a href="/services" class="nav-link dropdown-toggle">
                            Services
                            <span class="dropdown-arrow">▾</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/web-design" class="dropdown-link">Web Design</a></li>
                            <li><a href="/seo-services" class="dropdown-link">SEO Services</a></li>
                            <li><a href="/social-media" class="dropdown-link">Social Media</a></li>
                            <li><a href="/insurance" class="dropdown-link">Insurance Services</a></li>
                        </ul>
                    </li>
                    <li><a href="/about" class="nav-link">About</a></li>
                    <li><a href="/contact" class="nav-link">Contact</a></li>
                    <li><a href="/blog" class="nav-link">Blog</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Hero Section -->
        <section class="hero">
            <div class="container">
                <h1>We'd love to hear from you!</h1>
                <h2>TNR Business Solutions</h2>
                <h2>Unlocking Business Success</h2>
                <p>At TNR Business Solutions, we help businesses in Greensburg, PA and beyond grow, protect, and thrive. As your trusted local business consultant, we offer expert digital marketing, SEO, web and graphic design, and insurance services tailored to your unique goals. Whether you're starting fresh or scaling up, we provide the strategies and protection you need to succeed in today's competitive market.</p>
                <div style="margin-top: 2rem;">
                    <a href="/contact" class="btn">Get Started Today</a>
                    <a href="/services" class="btn btn-secondary">Our Services</a>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section class="container" style="padding: 4rem 0;">
            <h2 style="text-align: center; margin-bottom: 3rem;">Our Services</h2>
            <div class="grid grid-2">
                <div class="card">
                    <h3>Digital Marketing</h3>
                    <p>Comprehensive digital marketing strategies including SEO, social media management, and online advertising to help your business grow and reach more customers.</p>
                    <a href="/services" class="btn">Learn More</a>
                </div>
                <div class="card">
                    <h3>Web Design & Development</h3>
                    <p>Professional website design and development services that create engaging, mobile-friendly websites that convert visitors into customers.</p>
                    <a href="/web-design" class="btn">Learn More</a>
                </div>
                <div class="card">
                    <h3>SEO Services</h3>
                    <p>Search engine optimization services to improve your website's visibility and help potential customers find your business online.</p>
                    <a href="/seo-services" class="btn">Learn More</a>
                </div>
                <div class="card">
                    <h3>Insurance Services</h3>
                    <p>Comprehensive insurance solutions for businesses and individuals, helping you protect what matters most while you focus on growth.</p>
                    <a href="/insurance" class="btn">Learn More</a>
                </div>
            </div>
        </section>

        <!-- Why Choose Us Section -->
        <section style="background-color: var(--tnr-light-gray); padding: 4rem 0;">
            <div class="container">
                <h2 style="text-align: center; margin-bottom: 3rem;">Why Choose TNR Business Solutions?</h2>
                <div class="grid grid-3">
                    <div class="card text-center">
                        <h3>Local Expertise</h3>
                        <p>We understand the unique challenges facing businesses in Greensburg, PA and surrounding areas.</p>
                    </div>
                    <div class="card text-center">
                        <h3>Integrated Approach</h3>
                        <p>Our unique combination of marketing and insurance services helps you grow safely and efficiently.</p>
                    </div>
                    <div class="card text-center">
                        <h3>Proven Results</h3>
                        <p>We've helped dozens of local businesses improve their online presence and protect their assets.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="container" style="padding: 4rem 0;">
            <h2 style="text-align: center; margin-bottom: 3rem;">Ready to Get Started?</h2>
            <div style="text-align: center;">
                <p style="font-size: 1.25rem; margin-bottom: 2rem;">Contact us today for a free consultation and discover how we can help your business grow and succeed.</p>
                <a href="/contact" class="btn">Contact Us Now</a>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-content">
                <div>
                    <h3>TNR Business Solutions</h3>
                    <p>Your trusted partner for digital marketing and insurance services in Greensburg, PA.</p>
                    <p>Phone: 412-499-2987</p>
                    <p>Email: Info@TNRBusinessSolutions.com</p>
                    <p>Address: 418 Concord Avenue, Greensburg, PA 15601</p>
                </div>
                <div>
                    <h3>Services</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li><a href="/web-design">Web Design</a></li>
                        <li><a href="/seo-services">SEO Services</a></li>
                        <li><a href="/social-media">Social Media</a></li>
                        <li><a href="/insurance">Insurance Services</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Company</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/terms-conditions">Terms & Conditions</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 TNR Business Solutions. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;

    fs.writeFileSync(path.join(this.baseDir, 'index.html'), html);
    console.log('✅ Homepage built');
  }

  buildServicePages() {
    const services = [
      {
        url: 'web-design',
        title: 'Web Design & Development Services',
        description:
          'Professional website design and development services in Greensburg, PA',
        content:
          'We create stunning, responsive websites that help your business stand out online and convert visitors into customers.',
      },
      {
        url: 'seo-services',
        title: 'SEO Services',
        description:
          'Search engine optimization services to improve your online visibility',
        content:
          'Our SEO services help your business rank higher in search results and attract more qualified customers.',
      },
      {
        url: 'social-media',
        title: 'Social Media Management',
        description: 'Professional social media management for your business',
        content:
          'We help you build and maintain a strong social media presence that engages your audience and drives business growth.',
      },
      {
        url: 'insurance',
        title: 'Insurance Services',
        description:
          'Comprehensive insurance solutions for businesses and individuals',
        content:
          'Protect your business and personal assets with our comprehensive insurance solutions tailored to your needs.',
      },
    ];

    services.forEach(service => {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${service.title} | TNR Business Solutions</title>
    <meta name="description" content="${service.description}">
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
    <header class="header">
        <div class="header-inner">
            <a href="/" class="logo">
                <img src="/media/logo-tnr-primary.png" alt="TNR Business Solutions" class="logo-img">
                <span class="logo-text">TNR Business Solutions</span>
            </a>
            <nav class="main-navigation">
                <ul class="main-nav">
                    <li><a href="/" class="nav-link">Home</a></li>
                    <li class="nav-item dropdown">
                        <a href="/services" class="nav-link dropdown-toggle">
                            Services
                            <span class="dropdown-arrow">▾</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/web-design" class="dropdown-link">Web Design</a></li>
                            <li><a href="/seo-services" class="dropdown-link">SEO Services</a></li>
                            <li><a href="/social-media" class="dropdown-link">Social Media</a></li>
                            <li><a href="/insurance" class="dropdown-link">Insurance Services</a></li>
                        </ul>
                    </li>
                    <li><a href="/about" class="nav-link">About</a></li>
                    <li><a href="/contact" class="nav-link">Contact</a></li>
                    <li><a href="/blog" class="nav-link">Blog</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="main-content">
        <div class="container">
            <h1>${service.title}</h1>
            <p>${service.content}</p>
            <div style="margin-top: 2rem;">
                <a href="/contact" class="btn">Get Started Today</a>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-content">
                <div>
                    <h3>TNR Business Solutions</h3>
                    <p>Phone: 412-499-2987</p>
                    <p>Email: Info@TNRBusinessSolutions.com</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 TNR Business Solutions. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;

      fs.writeFileSync(path.join(this.baseDir, `${service.url}.html`), html);
    });

    console.log('✅ Service pages built');
  }

  buildOtherPages() {
    // About page
    const aboutHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us | TNR Business Solutions</title>
    <meta name="description" content="Learn about TNR Business Solutions, your trusted partner for digital marketing and insurance services in Greensburg, PA">
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
    <header class="header">
        <div class="header-inner">
            <a href="/" class="logo">
                <img src="/media/logo-tnr-primary.png" alt="TNR Business Solutions" class="logo-img">
                <span class="logo-text">TNR Business Solutions</span>
            </a>
            <nav class="main-navigation">
                <ul class="main-nav">
                    <li><a href="/" class="nav-link">Home</a></li>
                    <li class="nav-item dropdown">
                        <a href="/services" class="nav-link dropdown-toggle">
                            Services
                            <span class="dropdown-arrow">▾</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/web-design" class="dropdown-link">Web Design</a></li>
                            <li><a href="/seo-services" class="dropdown-link">SEO Services</a></li>
                            <li><a href="/social-media" class="dropdown-link">Social Media</a></li>
                            <li><a href="/insurance" class="dropdown-link">Insurance Services</a></li>
                        </ul>
                    </li>
                    <li><a href="/about" class="nav-link">About</a></li>
                    <li><a href="/contact" class="nav-link">Contact</a></li>
                    <li><a href="/blog" class="nav-link">Blog</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="main-content">
        <div class="container">
            <h1>About TNR Business Solutions</h1>
            <p>We are your trusted local partner for digital marketing and insurance services in Greensburg, PA. Our mission is to help small and medium-sized businesses grow, protect, and thrive in today's competitive market.</p>
            
            <h2>Our Story</h2>
            <p>Founded with a vision to provide integrated business solutions, TNR Business Solutions combines the power of digital marketing with comprehensive insurance protection to help your business succeed.</p>
            
            <h2>Our Values</h2>
            <ul>
                <li><strong>Integrity:</strong> We conduct business with honesty and transparency</li>
                <li><strong>Excellence:</strong> We strive for the highest quality in everything we do</li>
                <li><strong>Innovation:</strong> We stay ahead of industry trends and technologies</li>
                <li><strong>Partnership:</strong> We work closely with our clients as trusted partners</li>
            </ul>
        </div>
    </main>

    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-content">
                <div>
                    <h3>TNR Business Solutions</h3>
                    <p>Phone: 412-499-2987</p>
                    <p>Email: Info@TNRBusinessSolutions.com</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 TNR Business Solutions. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;

    fs.writeFileSync(path.join(this.baseDir, 'about.html'), aboutHtml);

    // Contact page
    const contactHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us | TNR Business Solutions</title>
    <meta name="description" content="Contact TNR Business Solutions for digital marketing and insurance services in Greensburg, PA">
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
    <header class="header">
        <div class="header-inner">
            <a href="/" class="logo">
                <img src="/media/logo-tnr-primary.png" alt="TNR Business Solutions" class="logo-img">
                <span class="logo-text">TNR Business Solutions</span>
            </a>
            <nav class="main-navigation">
                <ul class="main-nav">
                    <li><a href="/" class="nav-link">Home</a></li>
                    <li class="nav-item dropdown">
                        <a href="/services" class="nav-link dropdown-toggle">
                            Services
                            <span class="dropdown-arrow">▾</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="/web-design" class="dropdown-link">Web Design</a></li>
                            <li><a href="/seo-services" class="dropdown-link">SEO Services</a></li>
                            <li><a href="/social-media" class="dropdown-link">Social Media</a></li>
                            <li><a href="/insurance" class="dropdown-link">Insurance Services</a></li>
                        </ul>
                    </li>
                    <li><a href="/about" class="nav-link">About</a></li>
                    <li><a href="/contact" class="nav-link">Contact</a></li>
                    <li><a href="/blog" class="nav-link">Blog</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="main-content">
        <div class="container">
            <h1>Contact Us</h1>
            <p>Ready to grow your business? Get in touch with us today for a free consultation.</p>
            
            <div class="grid grid-2" style="margin-top: 3rem;">
                <div class="card">
                    <h3>Get in Touch</h3>
                    <p><strong>Phone:</strong> 412-499-2987</p>
                    <p><strong>Email:</strong> Info@TNRBusinessSolutions.com</p>
                    <p><strong>Address:</strong> 418 Concord Avenue, Greensburg, PA 15601</p>
                    <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM</p>
                </div>
                <div class="card">
                    <h3>Send us a Message</h3>
                    <form>
                        <div style="margin-bottom: 1rem;">
                            <label for="name">Name:</label><br>
                            <input type="text" id="name" name="name" required style="width: 100%; padding: 0.5rem; border: 1px solid var(--tnr-border); border-radius: var(--tnr-radius-sm);">
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="email">Email:</label><br>
                            <input type="email" id="email" name="email" required style="width: 100%; padding: 0.5rem; border: 1px solid var(--tnr-border); border-radius: var(--tnr-radius-sm);">
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label for="message">Message:</label><br>
                            <textarea id="message" name="message" rows="4" required style="width: 100%; padding: 0.5rem; border: 1px solid var(--tnr-border); border-radius: var(--tnr-radius-sm);"></textarea>
                        </div>
                        <button type="submit" class="btn">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="footer-inner">
            <div class="footer-content">
                <div>
                    <h3>TNR Business Solutions</h3>
                    <p>Phone: 412-499-2987</p>
                    <p>Email: Info@TNRBusinessSolutions.com</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 TNR Business Solutions. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;

    fs.writeFileSync(path.join(this.baseDir, 'contact.html'), contactHtml);
    console.log('✅ Other pages built');
  }

  buildNavigation() {
    // Navigation is already built into each page
    console.log('✅ Navigation built');
  }

  buildForms() {
    // Forms are already built into the contact page
    console.log('✅ Forms built');
  }
}

// Run the site builder
const builder = new ProfessionalSiteBuilder();
builder.buildSite();
