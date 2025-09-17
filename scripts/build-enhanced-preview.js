/**
 * Enhanced Homepage Builder for TNR Business Solutions Website
 * Creates a professional homepage with improved styling and visual elements
 */

const fs = require('fs');
const path = require('path');

class EnhancedHomepageBuilder {
  constructor() {
    this.projectRoot = process.cwd();
    this.previewDir = path.join(this.projectRoot, 'dist', 'preview');
    this.mediaDir = path.join(this.previewDir, 'media');

    // Ensure directories exist
    if (!fs.existsSync(this.previewDir)) {
      fs.mkdirSync(this.previewDir, { recursive: true });
    }
    if (!fs.existsSync(this.mediaDir)) {
      fs.mkdirSync(this.mediaDir, { recursive: true });
    }
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const icons = {
      info: '🎨',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      build: '🏗️',
    };
    console.log(`${icons[type] || '🎨'} [${timestamp}] ${message}`);
  }

  generateEnhancedHomepage() {
    this.log(
      'Building enhanced homepage with professional styling...',
      'build'
    );

    const homepage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TNR Business Solutions - Greensburg PA Digital Marketing & Insurance</title>
    <meta name="description" content="TNR Business Solutions helps Greensburg, PA businesses grow with digital marketing, SEO, web design, and comprehensive insurance services. Call 412-499-2987 for a free consultation.">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/media/favicon.ico">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* CSS Variables for Design System */
        :root {
            --primary-blue: #1e3a8a;
            --primary-light: #3b82f6;
            --secondary-blue: #1e40af;
            --accent-gold: #f59e0b;
            --text-dark: #1f2937;
            --text-gray: #6b7280;
            --text-light: #9ca3af;
            --bg-white: #ffffff;
            --bg-light: #f8fafc;
            --bg-gray: #f3f4f6;
            --border-color: #e5e7eb;
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
        }

        /* Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: var(--text-dark);
            background-color: var(--bg-white);
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: 'Playfair Display', serif;
            font-weight: 600;
            line-height: 1.3;
        }

        /* Header and Navigation */
        .header {
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
            color: white;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: var(--shadow-md);
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            font-family: 'Playfair Display', serif;
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        .nav-links a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: var(--accent-gold);
        }

        .cta-button {
            background: var(--accent-gold);
            color: var(--text-dark);
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            box-shadow: var(--shadow-sm);
        }

        .cta-button:hover {
            background: #d97706;
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, 
                rgba(30, 58, 138, 0.9) 0%, 
                rgba(30, 64, 175, 0.8) 100%),
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23f3f4f6" width="1200" height="600"/><g fill="%23e5e7eb" opacity="0.3"><polygon points="0,0 400,150 800,50 1200,200 1200,0"/><polygon points="0,600 300,450 700,550 1200,400 1200,600"/></g></svg>');
            background-size: cover;
            background-position: center;
            color: white;
            padding: 8rem 0 6rem;
            text-align: center;
            position: relative;
        }

        .hero-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .hero-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }

        .btn-primary {
            background: var(--accent-gold);
            color: var(--text-dark);
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s;
            box-shadow: var(--shadow-md);
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn-primary:hover {
            background: #d97706;
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        .btn-secondary {
            background: transparent;
            color: white;
            padding: 1rem 2rem;
            border: 2px solid white;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn-secondary:hover {
            background: white;
            color: var(--primary-blue);
        }

        /* Trust Indicators */
        .trust-section {
            background: var(--bg-light);
            padding: 4rem 0;
            text-align: center;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .trust-indicators {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .trust-item {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: var(--shadow-sm);
            transition: transform 0.3s;
        }

        .trust-item:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-md);
        }

        .trust-item i {
            font-size: 2.5rem;
            color: var(--primary-blue);
            margin-bottom: 1rem;
        }

        .trust-item h3 {
            margin-bottom: 0.5rem;
            color: var(--text-dark);
        }

        /* Services Section */
        .services {
            padding: 6rem 0;
            background: var(--bg-white);
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-header h2 {
            font-size: 2.5rem;
            color: var(--text-dark);
            margin-bottom: 1rem;
        }

        .section-header p {
            font-size: 1.1rem;
            color: var(--text-gray);
            max-width: 600px;
            margin: 0 auto;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .service-card {
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 1rem;
            padding: 2.5rem;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }

        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-blue), var(--accent-gold));
        }

        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .service-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary-blue), var(--primary-light));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
        }

        .service-icon i {
            font-size: 1.5rem;
            color: white;
        }

        .service-card h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: var(--text-dark);
        }

        .service-card p {
            color: var(--text-gray);
            margin-bottom: 1.5rem;
        }

        .service-link {
            color: var(--primary-blue);
            text-decoration: none;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: color 0.3s;
        }

        .service-link:hover {
            color: var(--accent-gold);
        }

        /* Local Focus Section */
        .local-focus {
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
            color: white;
            padding: 6rem 0;
            position: relative;
        }

        .local-focus::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
            background-size: 50px 50px;
        }

        .local-content {
            position: relative;
            z-index: 1;
        }

        .local-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            margin-top: 3rem;
        }

        .local-text h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
        }

        .local-text p {
            font-size: 1.1rem;
            opacity: 0.9;
            margin-bottom: 1.5rem;
        }

        .local-areas {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
        }

        .local-area {
            background: rgba(255, 255, 255, 0.1);
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            text-align: center;
            font-weight: 500;
        }

        /* Results Section */
        .results {
            padding: 6rem 0;
            background: var(--bg-light);
        }

        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .result-card {
            background: white;
            padding: 2.5rem;
            border-radius: 1rem;
            text-align: center;
            box-shadow: var(--shadow-sm);
            transition: transform 0.3s;
        }

        .result-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-md);
        }

        .result-number {
            font-size: 3rem;
            font-weight: 700;
            color: var(--primary-blue);
            margin-bottom: 0.5rem;
        }

        .result-label {
            font-weight: 600;
            color: var(--text-dark);
            margin-bottom: 0.5rem;
        }

        .result-description {
            color: var(--text-gray);
            font-size: 0.9rem;
        }

        /* CTA Section */
        .cta-section {
            background: var(--accent-gold);
            padding: 5rem 0;
            text-align: center;
            color: var(--text-dark);
        }

        .cta-content h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .cta-content p {
            font-size: 1.1rem;
            margin-bottom: 2rem;
            opacity: 0.8;
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn-dark {
            background: var(--primary-blue);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s;
            box-shadow: var(--shadow-md);
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn-dark:hover {
            background: var(--secondary-blue);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        /* Footer */
        .footer {
            background: var(--text-dark);
            color: white;
            padding: 4rem 0 2rem;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-section h3 {
            margin-bottom: 1rem;
            color: var(--accent-gold);
        }

        .footer-section p, .footer-section li {
            color: var(--text-light);
            margin-bottom: 0.5rem;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section a {
            color: var(--text-light);
            text-decoration: none;
            transition: color 0.3s;
        }

        .footer-section a:hover {
            color: var(--accent-gold);
        }

        .social-links {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }

        .social-links a {
            width: 40px;
            height: 40px;
            background: var(--primary-blue);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }

        .social-links a:hover {
            background: var(--accent-gold);
            transform: translateY(-2px);
        }

        .footer-bottom {
            border-top: 1px solid #374151;
            padding-top: 2rem;
            text-align: center;
            color: var(--text-light);
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
                align-items: center;
            }
            
            .local-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .cta-buttons {
                flex-direction: column;
                align-items: center;
            }
        }

        /* Animation and Loading States */
        .fade-in {
            opacity: 0;
            animation: fadeIn 0.8s ease-in-out forwards;
        }

        @keyframes fadeIn {
            to { opacity: 1; }
        }

        /* Accessibility Improvements */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        /* Focus States */
        a:focus, button:focus {
            outline: 2px solid var(--accent-gold);
            outline-offset: 2px;
        }
    </style>
</head>

<body>
    <!-- Header -->
    <header class="header">
        <div class="nav-container">
            <div class="logo">TNR Business Solutions</div>
            <nav>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <a href="tel:412-499-2987" class="cta-button">
                <i class="fas fa-phone"></i> Call Now
            </a>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="hero-content fade-in">
            <h1>Grow Your Greensburg Business</h1>
            <p>Expert digital marketing, SEO, web design, and comprehensive insurance services for Westmoreland County businesses. Your local partner for growth and protection.</p>
            <div class="hero-buttons">
                <a href="tel:412-499-2987" class="btn-primary">
                    <i class="fas fa-phone"></i> Free Consultation
                </a>
                <a href="#services" class="btn-secondary">
                    <i class="fas fa-arrow-right"></i> Our Services
                </a>
            </div>
        </div>
    </section>

    <!-- Trust Indicators -->
    <section class="trust-section">
        <div class="container">
            <h2>Why Greensburg Businesses Trust TNR</h2>
            <div class="trust-indicators">
                <div class="trust-item fade-in">
                    <i class="fas fa-map-marker-alt"></i>
                    <h3>Local Experts</h3>
                    <p>Proudly serving Greensburg and all of Westmoreland County</p>
                </div>
                <div class="trust-item fade-in">
                    <i class="fas fa-clock"></i>
                    <h3>10+ Years Experience</h3>
                    <p>Decade of proven results in digital marketing and insurance</p>
                </div>
                <div class="trust-item fade-in">
                    <i class="fas fa-shield-alt"></i>
                    <h3>Full Protection</h3>
                    <p>Complete business and personal insurance coverage</p>
                </div>
                <div class="trust-item fade-in">
                    <i class="fas fa-rocket"></i>
                    <h3>AI-Powered</h3>
                    <p>Cutting-edge technology for maximum results</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services" id="services">
        <div class="container">
            <div class="section-header">
                <h2>Comprehensive Business Solutions</h2>
                <p>From digital marketing to insurance protection, we provide everything your Greensburg business needs to thrive in today's competitive market.</p>
            </div>
            
            <div class="services-grid">
                <div class="service-card fade-in">
                    <div class="service-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3>Search Engine Optimization (SEO)</h3>
                    <p>Dominate Google search results and attract more local customers with our proven SEO strategies tailored for Westmoreland County businesses.</p>
                    <a href="#contact" class="service-link">
                        Get SEO Audit <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <div class="service-card fade-in">
                    <div class="service-icon">
                        <i class="fas fa-laptop-code"></i>
                    </div>
                    <h3>Website Design & Development</h3>
                    <p>Professional, mobile-friendly websites that convert visitors into customers. Built for speed, SEO, and user experience.</p>
                    <a href="#contact" class="service-link">
                        View Portfolio <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <div class="service-card fade-in">
                    <div class="service-icon">
                        <i class="fas fa-bullhorn"></i>
                    </div>
                    <h3>Social Media Marketing</h3>
                    <p>Engage your audience and build brand awareness across Facebook, Instagram, and other platforms with targeted campaigns.</p>
                    <a href="#contact" class="service-link">
                        Start Campaign <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <div class="service-card fade-in">
                    <div class="service-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Business Insurance</h3>
                    <p>Protect your investment with comprehensive commercial insurance including liability, property, workers' comp, and more.</p>
                    <a href="#contact" class="service-link">
                        Get Quote <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <div class="service-card fade-in">
                    <div class="service-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <h3>Personal Insurance</h3>
                    <p>Complete protection for your family with auto, homeowners, life insurance, and specialty coverage options.</p>
                    <a href="#contact" class="service-link">
                        Learn More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <div class="service-card fade-in">
                    <div class="service-icon">
                        <i class="fas fa-robot"></i>
                    </div>
                    <h3>AI Marketing Enablement</h3>
                    <p>Leverage artificial intelligence to optimize your marketing campaigns, content creation, and customer engagement strategies.</p>
                    <a href="#contact" class="service-link">
                        Explore AI <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Local Focus Section -->
    <section class="local-focus">
        <div class="container local-content">
            <div class="local-grid">
                <div class="local-text">
                    <h2>Your Westmoreland County Partner</h2>
                    <p>As a locally owned and operated business, we understand the unique challenges and opportunities facing businesses in our community. We're not just your service provider – we're your neighbors, committed to the success of our local economy.</p>
                    <a href="#contact" class="btn-secondary">
                        <i class="fas fa-handshake"></i> Partner With Us
                    </a>
                </div>
                <div class="local-areas">
                    <div class="local-area">Greensburg</div>
                    <div class="local-area">Latrobe</div>
                    <div class="local-area">Jeannette</div>
                    <div class="local-area">Mount Pleasant</div>
                    <div class="local-area">Irwin</div>
                    <div class="local-area">North Huntingdon</div>
                    <div class="local-area">Ligonier</div>
                    <div class="local-area">Hempfield Township</div>
                    <div class="local-area">Youngwood</div>
                    <div class="local-area">Delmont</div>
                    <div class="local-area">Murrysville</div>
                    <div class="local-area">+ More Areas</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Results Section -->
    <section class="results">
        <div class="container">
            <div class="section-header">
                <h2>Proven Results for Local Businesses</h2>
                <p>Our data-driven approach delivers measurable outcomes that drive real business growth.</p>
            </div>
            
            <div class="results-grid">
                <div class="result-card fade-in">
                    <div class="result-number">40%</div>
                    <div class="result-label">Traffic Increase</div>
                    <div class="result-description">Average boost in website traffic within 6 months</div>
                </div>
                <div class="result-card fade-in">
                    <div class="result-number">150+</div>
                    <div class="result-label">Businesses Served</div>
                    <div class="result-description">Local companies we've helped grow and protect</div>
                </div>
                <div class="result-card fade-in">
                    <div class="result-number">24/7</div>
                    <div class="result-label">Support Available</div>
                    <div class="result-description">Always here when you need us most</div>
                </div>
                <div class="result-card fade-in">
                    <div class="result-number">100%</div>
                    <div class="result-label">Satisfaction Rate</div>
                    <div class="result-description">Committed to your success and satisfaction</div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section" id="contact">
        <div class="container">
            <div class="cta-content">
                <h2>Ready to Grow Your Business?</h2>
                <p>Join over 150 Greensburg area businesses that trust TNR Business Solutions for their marketing and insurance needs. Get your free consultation today.</p>
                <div class="cta-buttons">
                    <a href="tel:412-499-2987" class="btn-dark">
                        <i class="fas fa-phone"></i> Call (412) 499-2987
                    </a>
                    <a href="mailto:Info@TNRBusinesssolutions.com" class="btn-dark">
                        <i class="fas fa-envelope"></i> Email Us
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>TNR Business Solutions</h3>
                    <p>Your trusted partner for digital marketing and comprehensive insurance services in Greensburg, PA and all of Westmoreland County.</p>
                    <div class="social-links">
                        <a href="https://www.facebook.com/profile.php?id=61577901456670" aria-label="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.instagram.com/royturnertnrbusinesssolutions/" aria-label="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/tnr-business-solutions" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://x.com/TNRBusinessSol" aria-label="X (Twitter)">
                            <i class="fab fa-x-twitter"></i>
                        </a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h3>Services</h3>
                    <ul>
                        <li><a href="#services">Search Engine Optimization</a></li>
                        <li><a href="#services">Website Design</a></li>
                        <li><a href="#services">Social Media Marketing</a></li>
                        <li><a href="#services">Business Insurance</a></li>
                        <li><a href="#services">Personal Insurance</a></li>
                        <li><a href="#services">AI Marketing</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Service Areas</h3>
                    <ul>
                        <li>Greensburg, PA</li>
                        <li>Latrobe, PA</li>
                        <li>Jeannette, PA</li>
                        <li>Irwin, PA</li>
                        <li>Westmoreland County</li>
                        <li>And Surrounding Areas</li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Contact Info</h3>
                    <p><i class="fas fa-map-marker-alt"></i> 418 Concord Avenue<br>Greensburg, PA 15601</p>
                    <p><i class="fas fa-phone"></i> <a href="tel:412-499-2987">(412) 499-2987</a></p>
                    <p><i class="fas fa-envelope"></i> <a href="mailto:Info@TNRBusinesssolutions.com">Info@TNRBusinesssolutions.com</a></p>
                    <p><strong>Business Hours:</strong><br>
                    Monday - Friday: 9:00 AM - 5:00 PM</p>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 TNR Business Solutions. All rights reserved. | 
                <a href="/privacy">Privacy Policy</a> | 
                <a href="/terms">Terms & Conditions</a></p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Phone number click tracking
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', () => {
                console.log('Phone call initiated:', link.href);
                // Add analytics tracking here if needed
            });
        });

        // Form submission handling (if forms are added)
        document.addEventListener('DOMContentLoaded', () => {
            console.log('TNR Business Solutions website loaded');
            // Add any initialization code here
        });
    </script>

    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "TNR Business Solutions",
        "image": "https://www.tnrbusinesssolutions.com/media/logo-tnr-primary.png",
        "url": "https://www.tnrbusinesssolutions.com/",
        "telephone": "+1-412-499-2987",
        "priceRange": "$$",
        "description": "Professional digital marketing, SEO, web design, and comprehensive insurance services for Greensburg, PA businesses. Local expertise with proven results.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "418 Concord Avenue",
            "addressLocality": "Greensburg",
            "addressRegion": "PA",
            "postalCode": "15601",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.3012,
            "longitude": -79.5394
        },
        "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
        }],
        "serviceArea": [
            "Greensburg PA", "Latrobe PA", "Jeannette PA", "Mount Pleasant PA", 
            "Irwin PA", "North Huntingdon PA", "Ligonier PA", "Hempfield Township PA",
            "Youngwood PA", "Delmont PA", "Murraysville PA"
        ],
        "sameAs": [
            "https://www.facebook.com/profile.php?id=61577901456670",
            "https://www.instagram.com/royturnertnrbusinesssolutions/",
            "https://www.linkedin.com/company/tnr-business-solutions",
            "https://x.com/TNRBusinessSol"
        ]
    }
    </script>
</body>
</html>`;

    return homepage;
  }

  buildEnhancedSite() {
    this.log('Generating enhanced homepage...', 'build');

    try {
      // Generate the enhanced homepage
      const homepage = this.generateEnhancedHomepage();

      // Write the enhanced homepage
      const homepagePath = path.join(this.previewDir, 'index.html');
      fs.writeFileSync(homepagePath, homepage);

      this.log('Enhanced homepage created successfully!', 'success');
      this.log('Professional styling applied with:', 'info');
      this.log('  • Modern blue and gold color scheme', 'info');
      this.log('  • Responsive grid layouts', 'info');
      this.log('  • Interactive animations', 'info');
      this.log('  • Professional typography', 'info');
      this.log('  • Optimized for mobile devices', 'info');
      this.log('  • SEO-friendly structure', 'info');
      this.log('  • Accessibility features', 'info');

      return homepagePath;
    } catch (error) {
      this.log(`Failed to build enhanced site: ${error.message}`, 'error');
      throw error;
    }
  }
}

// Execute if called directly
if (require.main === module) {
  const builder = new EnhancedHomepageBuilder();

  builder
    .buildEnhancedSite()
    .then(filePath => {
      console.log(`\n✨ Enhanced TNR Business Solutions homepage is ready!`);
      console.log(`📄 File: ${filePath}`);
      console.log(`🌐 Preview: http://localhost:8080/`);
      console.log(`🧪 Testing: http://localhost:3002/`);
    })
    .catch(error => {
      console.error(`\n💥 Enhancement failed: ${error.message}`);
      process.exit(1);
    });
}

module.exports = { EnhancedHomepageBuilder };
