/**
 * Simple build script for TNR Business Solutions Website
 * Creates a premium black and gold website
 */

const fs = require('fs');
const path = require('path');

// Import premium contact section
const { generatePremiumContactSection } = require('./premium-contact');

// Define paths
const distDir = path.join(__dirname, '..', 'dist');
const previewDir = path.join(distDir, 'preview');
const mediaDir = path.join(previewDir, 'media');
const assetsDir = path.join(previewDir, 'assets');

// Ensure directories exist
[distDir, previewDir, mediaDir, assetsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Log function
function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const icons = {
    info: '🎨',
    success: '✅',
    building: '🔨',
    complete: '🎉',
  };
  console.log(`${icons[type] || '🎨'} [${timestamp}] ${message}`);
}

async function buildProfessionalHomepage() {
  try {
    log(
      'Building professional homepage inspired by business card design...',
      'building'
    );

    // Generate homepage HTML
    const enhancedHomepage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TNR Business Solutions - Greensburg PA Digital Marketing & Insurance Services</title>
    <meta name="description" content="Empower your business with TNR Business Solutions in Greensburg, PA. Expert digital marketing, SEO, web design, and comprehensive insurance services. Call 412-499-2987 for a free consultation.">
    
    <!-- Enhanced SEO Meta Tags -->
    <meta name="keywords" content="Greensburg PA digital marketing, SEO services, web design, insurance services, business consulting, Westmoreland County, Latrobe, Jeannette, Mount Pleasant, Irwin">
    <meta name="author" content="TNR Business Solutions">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="TNR Business Solutions - Professional Digital Marketing & Insurance Services">
    <meta property="og:description" content="Helping Greensburg, PA businesses grow with expert digital marketing, SEO, web design, and insurance services. Serving Southwestern PA.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.tnrbusinesssolutions.com">
    <meta property="og:image" content="https://www.tnrbusinesssolutions.com/media/tnr-logo-updated.svg">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/media/favicon.ico">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Times+New+Roman&family=Arial:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
    <!-- AOS Animation Library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="/assets/styles-global.css">
    <link rel="stylesheet" href="/assets/premium-contact.css">
    <link rel="stylesheet" href="/assets/utility.css">
    <link rel="stylesheet" href="/assets/animations.css">
</head>
<body>
    <!-- Premium Header -->
    <header class="header" id="header">
        <div class="container">
            <nav class="nav-container">
                <a href="#" class="logo">
                    <img src="/media/tnr-logo-updated.svg" alt="TNR Business Solutions Logo" />
                    <span>TNR Business Solutions</span>
                </a>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="tel:4124992987" class="cta-button"><i class="fas fa-phone"></i> (412) 499-2987</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="container">
            <div class="hero-content" data-aos="fade-up">
                <h1 class="gold-shimmer">UNLOCKING BUSINESS SUCCESS</h1>
                <p class="subtitle">
                    Serving businesses across Southwestern PA with premium digital marketing strategies 
                    and comprehensive insurance solutions that protect what matters most.
                </p>
                <div class="hero-buttons">
                    <a href="tel:4124992987" class="btn-primary soft-pulse">
                        <i class="fas fa-phone"></i>
                        Call for Free Consultation
                    </a>
                    <a href="#services" class="btn-secondary">
                        <i class="fas fa-arrow-down"></i>
                        Explore Our Services
                    </a>
                </div>
            </div>
            <div class="scroll-indicator">
                <i class="fas fa-chevron-down"></i>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services-section" id="services">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <h2 class="section-title gold-shimmer">Premium Business Solutions</h2>
                <p class="section-subtitle">
                    Comprehensive strategies designed to help you grow, protect, and thrive in today's competitive marketplace.
                </p>
            </div>

            <div class="services-grid">
                <div class="service-card premium-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="service-image">
                        <img src="/media/premium-business-meeting.svg" alt="SEO Services" loading="lazy" width="60" height="60" style="margin-bottom: 1rem;">
                    </div>
                    <i class="fas fa-search service-icon"></i>
                    <h3>SEO Services</h3>
                    <p>Boost your online visibility and rank higher on Google with our proven SEO strategies. We help businesses across Southwestern PA attract more customers through organic search and local SEO optimization.</p>
                    <div class="service-features">
                        <span class="feature-tag">Local SEO</span>
                        <span class="feature-tag">Google Business Profile</span>
                        <span class="feature-tag">Keyword Research</span>
                    </div>
                </div>

                <div class="service-card premium-card" data-aos="fade-up" data-aos-delay="200">
                    <div class="service-image">
                        <img src="/media/premium-marketing-dashboard.svg" alt="Web Design & Development" loading="lazy" width="60" height="60" style="margin-bottom: 1rem;">
                    </div>
                    <i class="fas fa-laptop-code service-icon"></i>
                    <h3>Web Design & Development</h3>
                    <p>Get a stunning, mobile-friendly website that converts visitors into customers. Our custom designs reflect your brand identity and drive business growth with modern, responsive layouts.</p>
                    <div class="service-features">
                        <span class="feature-tag">Mobile Responsive</span>
                        <span class="feature-tag">E-commerce</span>
                        <span class="feature-tag">Custom CMS</span>
                    </div>
                </div>

                <div class="service-card premium-card" data-aos="fade-up" data-aos-delay="300">
                    <div class="service-image">
                        <img src="/media/premium-business-meeting.svg" alt="Digital Marketing" loading="lazy" width="60" height="60" style="margin-bottom: 1rem;">
                    </div>
                    <i class="fas fa-bullhorn service-icon"></i>
                    <h3>Digital Marketing</h3>
                    <p>Comprehensive digital marketing solutions including social media management, PPC advertising, and content marketing to expand your reach and engage your target audience effectively.</p>
                    <div class="service-features">
                        <span class="feature-tag">Social Media</span>
                        <span class="feature-tag">PPC Ads</span>
                        <span class="feature-tag">Content Marketing</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    ${generatePremiumContactSection()}

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>TNR Business Solutions</h4>
                    <p>
                        Empowering businesses in Greensburg, PA and beyond with expert digital marketing, 
                        web design, and comprehensive insurance solutions.
                    </p>
                    <div class="social-links">
                        <a href="https://www.facebook.com/TNRBusinessSolutions" target="_blank" aria-label="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.instagram.com/TNRBusinessSolutions" target="_blank" aria-label="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/TNRBusinessSolutions" target="_blank" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>

                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <p>418 Concord Avenue<br>Greensburg, PA, USA</p>
                    <a href="tel:4124992987">(412) 499-2987</a>
                    <a href="mailto:Roy.Turner@TNRBusinessSolutions.com">Roy.Turner@TNRBusinessSolutions.com</a>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2023 TNR Business Solutions. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- AOS Animation Library -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    
    <script>
        // Initialize AOS animations
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    </script>
</body>
</html>`;

    const homepageePath = path.join(previewDir, 'index.html');
    fs.writeFileSync(homepageePath, enhancedHomepage, 'utf8');
    log('Enhanced homepage created successfully!', 'success');

    // Generate CSS files
    await generateSeparateCSS();

    log('Professional homepage build complete!', 'complete');
    return homepageePath;
  } catch (error) {
    console.error('❌ Error building professional homepage:', error.message);
    throw error;
  }
}

// Generate CSS files
async function generateSeparateCSS() {
  // Create utility CSS file
  const utilityCSSContent = `/* TNR Business Solutions - Utility Classes */

/* Text Alignment */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

/* Margin Utilities */
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-5 { margin-bottom: 3rem; }

.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 1rem; }
.mt-4 { margin-top: 1.5rem; }
.mt-5 { margin-top: 3rem; }

.mx-auto { margin-left: auto; margin-right: auto; }

/* Premium Card Components */
.premium-card {
    background: var(--rich-black);
    border: 1px solid var(--primary-gold);
    border-radius: 10px;
    box-shadow: var(--shadow-md);
    padding: 2rem;
    transition: var(--transition);
}

.premium-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-5px);
    border-color: var(--primary-green);
}

/* Badges */
.badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--primary-gold);
    color: var(--primary-black);
    border-radius: 50px;
    font-size: 0.875rem;
    font-weight: 600;
}

.badge.green {
    background: var(--primary-green);
}

/* Business Card Style QR Code Container */
.business-card-container {
    display: inline-block;
    padding: 10px;
    background: var(--white);
    border: 1px solid var(--primary-gold);
    border-radius: 10px;
}`;

  const utilityCSSPath = path.join(assetsDir, 'utility.css');
  fs.writeFileSync(utilityCSSPath, utilityCSSContent, 'utf8');
  log('Utility CSS file generated', 'success');

  // Create animations CSS file
  const animationsCSSContent = `/* TNR Business Solutions - Animations */

/* Fade In */
@keyframes fadeIn {
from { opacity: 0; }
to { opacity: 1; }
}

.fade-in {
animation: fadeIn 1s ease-in forwards;
}

/* Fade In Up */
@keyframes fadeInUp {
from {
  opacity: 0;
  transform: translateY(30px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
}

.fade-in-up {
animation: fadeInUp 0.8s ease-out forwards;
}

/* Soft Pulse Animation for CTA elements */
@keyframes softPulse {
0% {
  box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
}
70% {
  box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
}
100% {
  box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
}
}

.soft-pulse {
animation: softPulse 2s infinite;
}

/* Gold Text Shimmer */
@keyframes goldShimmer {
0% {
  background-position: -100% 0;
}
100% {
  background-position: 200% 0;
}
}

.gold-shimmer {
background: linear-gradient(90deg, #D4AF37 0%, #FFDF00 25%, #D4AF37 50%, #C5A028 75%, #D4AF37 100%);
background-size: 200% 100%;
-webkit-background-clip: text;
background-clip: text;
color: transparent;
animation: goldShimmer 4s linear infinite;
display: inline-block;
}`;

  const animationsCSSPath = path.join(assetsDir, 'animations.css');
  fs.writeFileSync(animationsCSSPath, animationsCSSContent, 'utf8');
  log('Animations CSS file generated', 'success');

  // Create global CSS file
  const globalCSSContent = `/* TNR Business Solutions - Global CSS Styles */

/* Color Variables */
:root {
/* Premium Black and Gold Palette */
--primary-black: #0a0a0a;
--secondary-black: #121212;
--rich-black: #1a1a1a;
--primary-gold: #D4AF37;
--gold-highlight: #F5D865;
--gold-shadow: #AA8C2C;
--primary-green: #306844;
--green-highlight: #3DA35D;
--green-shadow: #1D4229;

/* Neutral Tones */
--white: #ffffff;
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;

/* Typography */
--font-primary: 'Arial', sans-serif;
--font-display: 'Times New Roman', serif;

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Transitions */
--transition: all 0.3s ease;
}

/* Base Styles */
html {
font-size: 16px;
scroll-behavior: smooth;
}

body {
font-family: var(--font-primary);
margin: 0;
padding: 0;
background-color: var(--primary-black);
color: var(--white);
line-height: 1.6;
}

*, *::before, *::after {
box-sizing: border-box;
}

a {
color: var(--primary-gold);
text-decoration: none;
transition: var(--transition);
}

a:hover {
color: var(--gold-highlight);
}

img {
max-width: 100%;
height: auto;
}

/* Container System */
.container {
width: 100%;
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
}

/* Premium Typography */
h1, h2, h3, h4, h5, h6 {
font-family: var(--font-display);
margin-top: 0;
color: var(--primary-gold);
}

h1 {
font-size: 3rem;
font-weight: 700;
margin-bottom: 1.5rem;
}

h2 {
font-size: 2.5rem;
font-weight: 600;
margin-bottom: 1.25rem;
}

h3 {
font-size: 2rem;
font-weight: 600;
margin-bottom: 1rem;
}

h4 {
font-size: 1.5rem;
font-weight: 600;
margin-bottom: 0.75rem;
}

p {
margin-bottom: 1.5rem;
font-size: 1.1rem;
}

/* Header and Navigation */
.header {
background-color: var(--rich-black);
border-bottom: 1px solid var(--primary-gold);
position: sticky;
top: 0;
z-index: 1000;
}

.nav-container {
display: flex;
justify-content: space-between;
align-items: center;
padding: 1rem 0;
}

.logo {
display: flex;
align-items: center;
font-family: var(--font-display);
font-size: 1.5rem;
font-weight: 700;
color: var(--primary-gold);
text-decoration: none;
}

.logo img {
height: 40px;
width: auto;
margin-right: 10px;
}

.nav-links {
display: flex;
list-style: none;
gap: 1.5rem;
margin: 0;
padding: 0;
}

.nav-links a {
color: var(--white);
font-weight: 500;
transition: var(--transition);
}

.nav-links a:hover {
color: var(--primary-gold);
}

.cta-button {
background: var(--primary-gold);
color: var(--primary-black) !important;
padding: 0.5rem 1rem;
border-radius: 4px;
font-weight: 600;
}

/* Hero Section */
.hero {
background-color: var(--rich-black);
padding: 6rem 0;
position: relative;
}

.hero-content {
text-align: center;
max-width: 800px;
margin: 0 auto;
}

.hero h1 {
font-size: 3.5rem;
margin-bottom: 1.5rem;
}

.subtitle {
font-size: 1.2rem;
margin-bottom: 2.5rem;
}

.hero-buttons {
display: flex;
justify-content: center;
gap: 1rem;
}

.btn-primary {
background: var(--primary-gold);
color: var(--primary-black);
padding: 0.75rem 1.5rem;
border-radius: 4px;
font-weight: 600;
display: inline-flex;
align-items: center;
gap: 0.5rem;
}

.btn-secondary {
background: transparent;
color: var(--white);
padding: 0.75rem 1.5rem;
border: 2px solid var(--white);
border-radius: 4px;
font-weight: 600;
display: inline-flex;
align-items: center;
gap: 0.5rem;
}

/* Services Section */
.services-section {
background-color: var(--secondary-black);
padding: 5rem 0;
}

.section-header {
text-align: center;
margin-bottom: 3rem;
}

.section-title {
margin-bottom: 1rem;
}

.section-subtitle {
color: var(--gray-300);
max-width: 600px;
margin: 0 auto;
}

.services-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 2rem;
}

.service-card {
text-align: center;
padding: 2rem;
}

.service-icon {
font-size: 2.5rem;
color: var(--primary-gold);
margin-bottom: 1.5rem;
}

.service-features {
display: flex;
flex-wrap: wrap;
gap: 0.5rem;
justify-content: center;
margin-top: 1rem;
}

.feature-tag {
background: var(--rich-black);
color: var(--primary-gold);
padding: 0.3rem 0.8rem;
border-radius: 50px;
font-size: 0.8rem;
font-weight: 500;
border: 1px solid var(--primary-gold);
}

/* Footer */
.footer {
background-color: var(--rich-black);
padding: 4rem 0 2rem;
}

.footer-content {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 2rem;
margin-bottom: 3rem;
}

.footer-section h4 {
margin-bottom: 1.5rem;
color: var(--primary-gold);
}

.footer-section p, .footer-section a {
color: var(--gray-300);
display: block;
margin-bottom: 0.75rem;
}

.footer-section a:hover {
color: var(--primary-gold);
}

.social-links {
display: flex;
gap: 1rem;
margin-top: 1.5rem;
}

.social-links a {
display: inline-flex;
align-items: center;
justify-content: center;
width: 40px;
height: 40px;
background-color: var(--rich-black);
color: var(--primary-gold);
border-radius: 50%;
border: 1px solid var(--primary-gold);
}

.social-links a:hover {
background-color: var(--primary-gold);
color: var(--primary-black);
}

.footer-bottom {
text-align: center;
padding-top: 2rem;
border-top: 1px solid var(--gray-800);
color: var(--gray-500);
}

/* Responsive Design */
@media (max-width: 768px) {
.nav-links {
  display: none;
}

.hero h1 {
  font-size: 2.5rem;
}

.hero-buttons {
  flex-direction: column;
}

.services-grid {
  grid-template-columns: 1fr;
}
}`;

  const globalCSSPath = path.join(assetsDir, 'styles-global.css');
  fs.writeFileSync(globalCSSPath, globalCSSContent, 'utf8');
  log('Global CSS file generated', 'success');

  log('All CSS files generated successfully', 'success');
}

// Run the build
buildProfessionalHomepage()
  .then(path => {
    console.log('🎉 Professional homepage created successfully!');
    console.log(`📍 Location: ${path}`);
  })
  .catch(err => {
    console.error('💥 Error creating homepage:', err.message);
    process.exit(1);
  });
