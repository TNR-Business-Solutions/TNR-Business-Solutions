/**
 * Premium Homepage Builder for TNR Business Solutions Website
 * Creates a sophisticated, high-end website matching the business card design
 * Using black background with gold text and green accents
 */

const fs = require('fs');
const path = require('path');

// Import premium contact section
const { generatePremiumContactSection } = require('./contact-section');

class ProfessionalHomepageBuilder {
  constructor() {
    this.distDir = path.join(process.cwd(), 'dist');
    this.previewDir = path.join(this.distDir, 'preview');
    this.mediaDir = path.join(this.previewDir, 'media');
    this.assetsDir = path.join(this.previewDir, 'assets');

    // Ensure directories exist
    [this.distDir, this.previewDir, this.mediaDir, this.assetsDir].forEach(
      dir => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      }
    );
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const icons = {
      info: '🎨',
      success: '✅',
      building: '🔨',
      complete: '🎉',
    };
    console.log(`${icons[type] || '🎨'} [${timestamp}] ${message}`);
  }

  generateEnhancedHomepage() {
    return `<!DOCTYPE html>
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
    <meta name="geo.region" content="US-PA">
    <meta name="geo.placename" content="Greensburg, Pennsylvania">
    <meta name="geo.position" content="40.3017;-79.5392">
    <meta name="ICBM" content="40.3017, -79.5392">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="TNR Business Solutions - Professional Digital Marketing & Insurance Services">
    <meta property="og:description" content="Helping Greensburg, PA businesses grow with expert digital marketing, SEO, web design, and insurance services. Serving Southwestern PA.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.tnrbusinesssolutions.com">
    <meta property="og:image" content="https://www.tnrbusinesssolutions.com/media/tnr-logo-updated.svg">
    <meta property="og:image:alt" content="TNR Business Solutions Logo - Professional Digital Marketing Services">
    <meta property="og:site_name" content="TNR Business Solutions">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="TNR Business Solutions - Greensburg PA Digital Marketing">
    <meta name="twitter:description" content="Expert digital marketing, SEO, and insurance services for Greensburg PA businesses">
    <meta name="twitter:image" content="https://www.tnrbusinesssolutions.com/media/premium-business-meeting.svg">
    <meta name="twitter:image:alt" content="TNR Business Solutions Professional Team Meeting">
    
    <!-- Business Schema Meta Tags -->
    <meta name="business:contact_data:street_address" content="418 Concord Avenue">
    <meta name="business:contact_data:locality" content="Greensburg">
    <meta name="business:contact_data:region" content="PA">
    <meta name="business:contact_data:postal_code" content="15601">
    <meta name="business:contact_data:country_name" content="USA">
    <meta name="business:contact_data:phone_number" content="412-499-2987">
    <meta name="business:contact_data:email" content="Roy.Turner@TNRBusinesssolutions.com">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/media/favicon.ico">
    
    <!-- Google Fonts - Premium Typography -->
    <link href="https://fonts.googleapis.com/css2?family=Times+New+Roman&family=Arial:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
    <!-- AOS Animation Library -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    
    <!-- Global CSS -->
    <link rel="stylesheet" href="/assets/styles-global.css">
    <link rel="stylesheet" href="/assets/premium-contact.css">
    <link rel="stylesheet" href="/assets/utility.css">
    <link rel="stylesheet" href="/assets/animations.css">

        /* Reset and Base Styles */
        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: var(--font-primary);
            font-size: 16px;
            line-height: 1.7;
            color: var(--gray-700);
            background-color: var(--white);
            overflow-x: hidden;
        }

        /* Typography System */
        h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-display);
            font-weight: 600;
            line-height: 1.3;
            color: var(--gray-900);
            margin-bottom: 1rem;
        }

        h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; }
        h2 { font-size: clamp(2rem, 4vw, 3rem); }
        h3 { font-size: clamp(1.5rem, 3vw, 2.25rem); }
        h4 { font-size: clamp(1.25rem, 2.5vw, 1.875rem); }

        p {
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
            line-height: 1.8;
        }

        /* Container System */
        .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .container-wide {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .container-narrow {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* Professional Header */
        .header {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: rgba(26, 26, 26, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 215, 0, 0.3);
            box-shadow: var(--shadow-lg);
            transition: var(--transition);
        }

        .header.scrolled {
            background: rgba(26, 26, 26, 0.98);
            box-shadow: var(--shadow-xl);
        }

        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }

        .logo {
            font-family: var(--font-display);
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--white);
            text-decoration: none;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .logo img {
            height: 40px;
            width: auto;
        }

        .logo:hover {
            color: var(--primary-yellow);
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 2.5rem;
            align-items: center;
        }

        .nav-links a {
            color: var(--white);
            text-decoration: none;
            font-weight: 500;
            font-size: 1rem;
            transition: var(--transition);
            position: relative;
        }

        .nav-links a:hover {
            color: var(--primary-yellow);
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary-yellow);
            transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .cta-button {
            background: linear-gradient(135deg, var(--primary-yellow), var(--primary-yellow-dark));
            color: var(--primary-black);
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: var(--transition);
            box-shadow: var(--shadow-md);
            border: 2px solid transparent;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
            background: linear-gradient(135deg, var(--primary-yellow-dark), var(--primary-yellow));
            color: var(--primary-black);
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, var(--primary-black) 0%, var(--secondary-black) 100%);
            color: var(--white);
            padding: 8rem 0 6rem;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url('/media/digital-marketing-dashboard.svg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 0.15;
            z-index: 1;
        }

        .hero::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="yellow" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="green" opacity="0.1"/><circle cx="50" cy="10" r="1" fill="yellow" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
            z-index: 2;
        }

        .hero-content {
            position: relative;
            z-index: 3;
            text-align: center;
        }

        .hero h1 {
            color: var(--white);
            margin-bottom: 1.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero .subtitle {
            font-size: 1.4rem;
            margin-bottom: 2rem;
            opacity: 0.95;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        .hero-buttons {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 3rem;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary-yellow), var(--primary-yellow-dark));
            color: var(--primary-black);
            padding: 1rem 2.5rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: var(--transition);
            box-shadow: var(--shadow-lg);
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-xl);
            background: linear-gradient(135deg, var(--primary-yellow-dark), var(--primary-yellow));
            color: var(--primary-black);
        }

        .btn-secondary {
            background: transparent;
            color: var(--white);
            padding: 1rem 2.5rem;
            border: 2px solid var(--white);
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn-secondary:hover {
            background: var(--white);
            color: var(--primary-black);
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg);
        }

        /* Services Section */
        .services-section {
            padding: 8rem 0;
            background: var(--gray-50);
            position: relative;
        }

        .section-header {
            text-align: center;
            margin-bottom: 5rem;
        }

        .section-title {
            color: var(--primary-green);
            margin-bottom: 1rem;
        }

        .section-subtitle {
            font-size: 1.2rem;
            color: var(--gray-600);
            max-width: 700px;
            margin: 0 auto;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 3rem;
            margin-top: 4rem;
        }

        .service-card {
            background: var(--white);
            padding: 3rem 2rem;
            border-radius: 20px;
            box-shadow: var(--shadow-lg);
            transition: var(--transition);
            border: 1px solid var(--gray-200);
            position: relative;
            overflow: hidden;
            text-align: center;
        }

        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(135deg, var(--primary-green), var(--primary-yellow));
        }

        .service-card:hover {
            transform: translateY(-10px);
            box-shadow: var(--shadow-2xl);
        }

        .service-image {
            margin-bottom: 1.5rem;
        }

        .service-image img {
            border-radius: 10px;
            box-shadow: var(--shadow-sm);
        }

        .service-icon {
            font-size: 3rem;
            color: var(--primary-green);
            margin-bottom: 1.5rem;
            display: block;
        }

        .service-card h3 {
            color: var(--primary-green);
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }

        .service-card p {
            color: var(--gray-600);
            font-size: 1rem;
            line-height: 1.7;
            margin-bottom: 1.5rem;
        }

        .service-features {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            margin-top: 1.5rem;
        }

        .feature-tag {
            background: var(--gray-100);
            color: var(--gray-700);
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            border: 1px solid var(--gray-200);
            transition: var(--transition);
        }

        .service-card:hover .feature-tag {
            background: var(--primary-yellow);
            color: var(--primary-black);
            border-color: var(--primary-yellow);
        }

        /* Testimonials Section */
        .testimonials-section {
            padding: 8rem 0;
            background: var(--white);
            position: relative;
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 3rem;
            margin-top: 4rem;
        }

        .testimonial-card {
            background: var(--gray-50);
            padding: 2.5rem 2rem;
            border-radius: 20px;
            box-shadow: var(--shadow-md);
            transition: var(--transition);
            border: 1px solid var(--gray-200);
            position: relative;
            text-align: center;
        }

        .testimonial-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            background: var(--white);
        }

        .testimonial-image {
            margin-bottom: 1.5rem;
        }

        .testimonial-image img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid var(--primary-yellow);
            box-shadow: var(--shadow-md);
        }

        .quote-icon {
            font-size: 4rem;
            color: var(--primary-green);
            opacity: 0.3;
            line-height: 1;
            margin-bottom: -1rem;
        }

        .testimonial-text {
            font-size: 1.1rem;
            line-height: 1.7;
            color: var(--gray-700);
            margin-bottom: 1.5rem;
            font-style: italic;
        }

        .testimonial-author h4 {
            color: var(--primary-green);
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
        }

        .testimonial-author span {
            color: var(--gray-600);
            font-size: 0.9rem;
        }

        .stars {
            color: var(--primary-yellow);
            font-size: 1.2rem;
            margin-top: 0.5rem;
        }

        .success-stats {
            display: flex;
            justify-content: center;
            gap: 4rem;
            margin-top: 5rem;
            flex-wrap: wrap;
        }

        .stat-highlight {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: var(--white);
            padding: 2rem;
            border-radius: 15px;
            box-shadow: var(--shadow-md);
            border: 1px solid var(--gray-200);
            transition: var(--transition);
        }

        .stat-highlight:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .stat-icon {
            font-size: 2.5rem;
        }

        .stat-highlight .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-green);
            font-family: var(--font-display);
        }

        .stat-highlight .stat-label {
            font-size: 0.9rem;
            color: var(--gray-600);
            margin-top: 0.25rem;
        }

        /* About Section */
        .about-section {
            padding: 8rem 0;
            background: var(--white);
        }

        .about-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
            align-items: center;
        }

        .about-text h2 {
            color: var(--primary-green);
            margin-bottom: 2rem;
        }

        .about-text p {
            color: var(--gray-600);
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            margin-top: 3rem;
        }

        .stat-item {
            text-align: center;
            padding: 1.5rem;
            background: var(--gray-50);
            border-radius: 15px;
        }

        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary-yellow);
            font-family: var(--font-display);
        }

        .stat-label {
            font-size: 0.9rem;
            color: var(--gray-600);
            margin-top: 0.5rem;
        }

        .about-image {
            position: relative;
        }

        .about-image img {
            width: 100%;
            height: 500px;
            object-fit: cover;
            border-radius: 20px;
            box-shadow: var(--shadow-xl);
        }

        /* CTA Section */
        .cta-section {
            padding: 8rem 0;
            background: linear-gradient(135deg, var(--primary-black), var(--secondary-black));
            color: var(--white);
            text-align: center;
            position: relative;
        }

        .cta-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="yellow" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
        }

        .cta-content {
            position: relative;
            z-index: 2;
        }

        .cta-section h2 {
            color: var(--white);
            margin-bottom: 1.5rem;
        }

        .cta-section p {
            font-size: 1.2rem;
            margin-bottom: 3rem;
            opacity: 0.9;
        }

        /* Contact Section */
        .contact-section {
            padding: 8rem 0;
            background: var(--gray-50);
        }

        .contact-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
        }

        .contact-info h3 {
            color: var(--primary-green);
            margin-bottom: 2rem;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .contact-item i {
            font-size: 1.5rem;
            color: var(--primary-green);
            width: 30px;
        }

        .contact-item div h4 {
            color: var(--gray-900);
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
        }

        .contact-item div p {
            color: var(--gray-600);
            margin: 0;
        }

        .contact-form {
            background: var(--white);
            padding: 3rem;
            border-radius: 20px;
            box-shadow: var(--shadow-lg);
        }

        .form-group {
            margin-bottom: 2rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--gray-700);
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 1rem;
            border: 2px solid var(--gray-200);
            border-radius: 10px;
            font-size: 1rem;
            transition: var(--transition);
            font-family: var(--font-primary);
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-green);
            box-shadow: 0 0 0 3px rgba(50, 205, 50, 0.1);
        }

        .form-group textarea {
            min-height: 120px;
            resize: vertical;
        }

        /* Footer */
        .footer {
            background: var(--gray-900);
            color: var(--gray-300);
            padding: 4rem 0 2rem;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 3rem;
            margin-bottom: 3rem;
        }

        .footer-section h4 {
            color: var(--white);
            margin-bottom: 1.5rem;
            font-size: 1.2rem;
        }

        .footer-section p,
        .footer-section a {
            color: var(--gray-400);
            text-decoration: none;
            margin-bottom: 0.5rem;
            display: block;
            transition: var(--transition);
        }

        .footer-section a:hover {
            color: var(--primary-yellow);
        }

        .social-links {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }

        .social-links a {
            display: inline-flex;
            width: 40px;
            height: 40px;
            background: var(--gray-800);
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
        }

        .social-links a:hover {
            background: var(--primary-green);
            transform: translateY(-2px);
        }

        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid var(--gray-800);
            color: var(--gray-500);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 0 1rem;
            }

            .nav-links {
                display: none;
            }

            .hero {
                padding: 6rem 0 4rem;
            }

            .hero-buttons {
                flex-direction: column;
                align-items: center;
            }

            .services-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .about-content,
            .contact-content {
                grid-template-columns: 1fr;
                gap: 3rem;
            }

            .stats-grid {
                grid-template-columns: 1fr;
            }
        }

        /* Animations */
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
            animation: fadeInUp 0.6s ease-out forwards;
        }

        /* Scroll indicators */
        .scroll-indicator {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            color: var(--white);
            font-size: 1.5rem;
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0) translateX(-50%);
            }
            40% {
                transform: translateY(-10px) translateX(-50%);
            }
            60% {
                transform: translateY(-5px) translateX(-50%);
            }
        }
    </style>
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
                <h2 class="section-title">Premium Business Solutions</h2>
                <p class="section-subtitle">
                    Comprehensive strategies designed to help you grow, protect, and thrive in today's competitive marketplace.
                </p>
            </div>

            <div class="services-grid">
                <div class="service-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="service-image">
                        <img src="/media/service-google-icon.webp" alt="SEO Services - Google ranking optimization for Greensburg PA businesses" loading="lazy" width="60" height="60" style="margin-bottom: 1rem;">
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

                <div class="service-card" data-aos="fade-up" data-aos-delay="200">
                    <div class="service-image">
                        <img src="/media/service-webdesign-laptop.webp" alt="Custom web design and development services for businesses" loading="lazy" width="60" height="60" style="margin-bottom: 1rem;">
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

                <div class="service-card" data-aos="fade-up" data-aos-delay="300">
                    <div class="service-image">
                        <img src="/media/service-social-media-letters.webp" alt="Social media marketing and digital advertising services" loading="lazy" width="60" height="60" style="margin-bottom: 1rem;">
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

                <div class="service-card" data-aos="fade-up" data-aos-delay="400">
                    <div class="service-image">
                        <img src="/media/hero-insurance-advisory-desk.webp" alt="Professional insurance services and coverage options" loading="lazy" width="60" height="60" style="margin-bottom: 1rem;">
                    </div>
                    <i class="fas fa-shield-alt service-icon"></i>
                    <h3>Insurance Services</h3>
                    <p>Protect your business and personal assets with our comprehensive insurance solutions including auto, home, life, and commercial coverage tailored to your specific needs in Pennsylvania.</p>
                    <div class="service-features">
                        <span class="feature-tag">Business Insurance</span>
                        <span class="feature-tag">Auto & Home</span>
                        <span class="feature-tag">Life Insurance</span>
                    </div>
                </div>

                <div class="service-card" data-aos="fade-up" data-aos-delay="500">
                    <div class="service-image">
                        <img src="/media/premium-marketing-dashboard.svg" alt="Business consulting and growth strategy services" loading="lazy" width="60" height="60" style="margin-bottom: 1rem;">
                    </div>
                    <i class="fas fa-chart-line service-icon"></i>
                    <h3>Business Consulting</h3>
                    <p>Strategic business guidance to help you make informed decisions, optimize operations, and achieve sustainable growth in today's competitive marketplace.</p>
                    <div class="service-features">
                        <span class="feature-tag">Strategy Planning</span>
                        <span class="feature-tag">Process Optimization</span>
                        <span class="feature-tag">Growth Analysis</span>
                    </div>
                </div>

                <div class="service-card" data-aos="fade-up" data-aos-delay="600">
                    <div class="service-image">
                        <img src="/media/service-branding-desk.webp" alt="Professional branding and graphic design services" loading="lazy" width="60" height="60" style="margin-bottom: 1rem;">
                    </div>
                    <i class="fas fa-palette service-icon"></i>
                    <h3>Branding & Design</h3>
                    <p>Create a memorable brand identity with our graphic design services including logos, marketing materials, and brand guidelines that make your business stand out from the competition.</p>
                    <div class="service-features">
                        <span class="feature-tag">Logo Design</span>
                        <span class="feature-tag">Brand Guidelines</span>
                        <span class="feature-tag">Marketing Materials</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Client Success Stories / Testimonials Section -->
    <section class="testimonials-section">
        <div class="container">
            <div class="section-header" data-aos="fade-up">
                <h2 class="section-title">Why Greensburg Trusts TNR</h2>
                <p class="section-subtitle">
                    Real results from real businesses in Greensburg, PA and throughout Westmoreland County.
                </p>
            </div>

            <div class="testimonials-grid">
                <div class="testimonial-card" data-aos="fade-up" data-aos-delay="100">
                    <div class="testimonial-image">
                        <img src="/media/results-exotic-car.webp" alt="Successful automotive business client results" loading="lazy" width="80" height="80">
                    </div>
                    <div class="quote-icon">"</div>
                    <p class="testimonial-text">
                        "TNR boosted our restaurant's online traffic by 40% with their SEO expertise. We're now the top-rated dining spot in Greensburg on Google!"
                    </p>
                    <div class="testimonial-author">
                        <h4>Mike's Italian Restaurant</h4>
                        <span>Greensburg, PA</span>
                        <div class="stars">★★★★★</div>
                    </div>
                </div>

                <div class="testimonial-card" data-aos="fade-up" data-aos-delay="200">
                    <div class="testimonial-image">
                        <img src="/media/results-home-asset.webp" alt="Real estate business success story" loading="lazy" width="80" height="80">
                    </div>
                    <div class="quote-icon">"</div>
                    <p class="testimonial-text">
                        "Our insurance agency saw a 60% increase in new policy inquiries after partnering with TNR. Their local expertise made all the difference."
                    </p>
                    <div class="testimonial-author">
                        <h4>Westmoreland Insurance Group</h4>
                        <span>Latrobe, PA</span>
                        <div class="stars">★★★★★</div>
                    </div>
                </div>

                <div class="testimonial-card" data-aos="fade-up" data-aos-delay="300">
                    <div class="testimonial-image">
                        <img src="/media/professional-business-meeting.svg" alt="Professional business consulting success" loading="lazy" width="80" height="80">
                    </div>
                    <div class="quote-icon">"</div>
                    <p class="testimonial-text">
                        "TNR's comprehensive approach combining digital marketing and business insurance gave us everything we needed under one roof."
                    </p>
                    <div class="testimonial-author">
                        <h4>Jeannette Construction LLC</h4>
                        <span>Jeannette, PA</span>
                        <div class="stars">★★★★★</div>
                    </div>
                </div>
            </div>

            <!-- Success Stats -->
            <div class="success-stats" data-aos="fade-up" data-aos-delay="400">
                <div class="stat-highlight">
                    <div class="stat-icon">📈</div>
                    <div class="stat-content">
                        <div class="stat-number">127%</div>
                        <div class="stat-label">Average Traffic Increase</div>
                    </div>
                </div>
                <div class="stat-highlight">
                    <div class="stat-icon">🎯</div>
                    <div class="stat-content">
                        <div class="stat-number">95%</div>
                        <div class="stat-label">Client Satisfaction Rate</div>
                    </div>
                </div>
                <div class="stat-highlight">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-content">
                        <div class="stat-number">200+</div>
                        <div class="stat-label">Local Businesses Served</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="about-section" id="about">
        <div class="container">
            <div class="about-content">
                <div class="about-text" data-aos="fade-right">
                    <h2>Why Choose TNR Business Solutions?</h2>
                    <p>
                        At TNR Business Solutions, we help businesses in Greensburg, PA and beyond grow, protect, and thrive. 
                        As your trusted local business consultant, we offer expert digital marketing, SEO, web and graphic design, 
                        and insurance services tailored to your unique goals.
                    </p>
                    <p>
                        Whether you're starting fresh or scaling up, we provide the strategies and protection you need to 
                        succeed in today's competitive market. Our proven track record and local expertise make us the 
                        preferred choice for businesses throughout Westmoreland County.
                    </p>
                    
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-number">50+</div>
                            <div class="stat-label">Happy Clients</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">95%</div>
                            <div class="stat-label">Client Satisfaction</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">5+</div>
                            <div class="stat-label">Years Experience</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">24/7</div>
                            <div class="stat-label">Support Available</div>
                        </div>
                    </div>
                </div>
                <div class="about-image" data-aos="fade-left">
                    <img src="/media/greensburg-community.svg" alt="TNR Business Solutions serving Greensburg PA and Westmoreland County business community with professional digital marketing and insurance services" loading="lazy" width="500" height="400">
                    <div style="position: absolute; bottom: 15px; right: 15px; background: rgba(255, 215, 0, 0.9); padding: 8px 15px; border-radius: 20px; font-size: 12px; color: #1a1a1a; font-weight: 600;">
                        📍 Proudly Serving Westmoreland County
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content" data-aos="fade-up">
                <h2>Ready to Grow Your Business?</h2>
                <p>
                    Let's work together to create a custom strategy that drives results. 
                    Contact us today for a free consultation and discover how we can help your business succeed.
                </p>
                <div class="hero-buttons">
                    <a href="tel:4124992987" class="btn-primary">
                        <i class="fas fa-phone"></i>
                        Call (412) 499-2987
                    </a>
                    <a href="#contact" class="btn-secondary">
                        <i class="fas fa-envelope"></i>
                        Get Free Quote
                    </a>
                </div>
            </div>
        </div>
    </section>

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
                        <a href="https://twitter.com/TNRBusiness" target="_blank" aria-label="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/TNRBusinessSolutions" target="_blank" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>

                <div class="footer-section">
                    <h4>Services</h4>
                    <a href="/services/seo-services.html">SEO Services</a>
                    <a href="/services/web-design.html">Web Design</a>
                    <a href="/services/digital-marketing.html">Digital Marketing</a>
                    <a href="/services/insurance-services.html">Insurance Services</a>
                    <a href="/services/business-consulting.html">Business Consulting</a>
                    <a href="/services/branding-design.html">Branding & Design</a>
                </div>

                <div class="footer-section">
                    <h4>Service Areas</h4>
                    <a href="#">Greensburg, PA</a>
                    <a href="#">Latrobe, PA</a>
                    <a href="#">Jeannette, PA</a>
                    <a href="#">Mount Pleasant, PA</a>
                    <a href="#">Irwin, PA</a>
                    <a href="#">Westmoreland County</a>
                </div>

                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <p>418 Concord Avenue<br>Greensburg, PA, USA</p>
                    <a href="tel:4124992987">(412) 499-2987</a>
                    <a href="mailto:Info@TNRBusinesssolutions.com">Info@TNRBusinesssolutions.com</a>
                    <p style="margin-top: 1rem;">
                        <strong>Business Hours:</strong><br>
                        Mon-Fri: 9:00 AM - 6:00 PM<br>
                        Sat: 10:00 AM - 4:00 PM
                    </p>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2025 TNR Business Solutions. All rights reserved. | 
                   <a href="/privacy-policy.html" style="color: var(--gray-400);">Privacy Policy</a> | 
                   <a href="/terms-conditions.html" style="color: var(--gray-400);">Terms & Conditions</a>
                </p>
                <p style="margin-top: 0.5rem; font-size: 0.9rem;">
                    Powered by <span style="color: var(--primary-yellow);">AI-Enhanced</span> Technology
                </p>
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

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission handling
        document.querySelector('.contact-form form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We\\'ll get back to you within 24 hours.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Add loading states to CTA buttons
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.href && this.href.includes('tel:')) {
                    // Phone link - no loading state needed
                    return;
                }
                
                if (this.href && this.href.includes('#')) {
                    // Anchor link - no loading state needed
                    return;
                }
                
                // Add loading state for other links
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 1500);
            });
        });

        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('fade-in-up');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Add scroll-based animations for service cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease-out';
            serviceObserver.observe(card);
        });

        // Performance optimization - Preload critical resources
        const preloadResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
        ];

        preloadResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    </script>

    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "TNR Business Solutions",
        "description": "Professional digital marketing, SEO, web design, and insurance services in Greensburg, PA",
        "url": "https://www.tnrbusinesssolutions.com",
        "telephone": "+1-412-499-2987",
        "email": "Info@TNRBusinesssolutions.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "418 Concord Avenue",
            "addressLocality": "Greensburg",
            "addressRegion": "PA",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "40.3017",
            "longitude": "-79.5392"
        },
        "areaServed": [
            "Greensburg, PA",
            "Latrobe, PA", 
            "Jeannette, PA",
            "Mount Pleasant, PA",
            "Irwin, PA",
            "Westmoreland County, PA"
        ],
        "serviceType": [
            "Digital Marketing",
            "SEO Services", 
            "Web Design",
            "Insurance Services",
            "Business Consulting",
            "Branding & Design"
        ],
        "openingHours": [
            "Mo-Fr 09:00-18:00",
            "Sa 10:00-16:00"
        ],
        "sameAs": [
            "https://www.facebook.com/TNRBusinessSolutions",
            "https://www.instagram.com/TNRBusinessSolutions",
            "https://twitter.com/TNRBusiness",
            "https://www.linkedin.com/company/TNRBusinessSolutions"
        ]
    }
    </script>
</body>
</html>`;
  }

  async buildProfessionalHomepage() {
    try {
      this.log(
        'Building professional homepage inspired by live site...',
        'building'
      );

      const enhancedHomepage = this.generateEnhancedHomepage();
      const homepageePath = path.join(this.previewDir, 'index.html');

      // Backup existing homepage
      if (fs.existsSync(homepageePath)) {
        const backupPath = path.join(this.previewDir, 'index-backup.html');
        fs.copyFileSync(homepageePath, backupPath);
        this.log('Existing homepage backed up', 'info');
      }

      // Write new enhanced homepage
      fs.writeFileSync(homepageePath, enhancedHomepage, 'utf8');

      this.log('Enhanced homepage created successfully!', 'success');
      this.log(`Homepage location: ${homepageePath}`, 'info');

      // Generate CSS file for better organization
      await this.generateSeparateCSS();

      // Generate additional assets
      await this.generateAdditionalAssets();

      this.log('Professional homepage build complete!', 'complete');

      return homepageePath;
    } catch (error) {
      console.error('❌ Error building professional homepage:', error.message);
      throw error;
    }
  }

  async generateSeparateCSS() {
    // Create directory if it doesn't exist
    const assetsDir = path.join(this.previewDir, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

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
    background: var(--gray-900);
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
.business-card-qr {
    display: inline-block;
    padding: 10px;
    background: var(--white);
    border: 1px solid var(--primary-gold);
    border-radius: 10px;
}

/* Loading Animation */
.loading {
    position: relative;
    pointer-events: none;
    opacity: 0.7;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid var(--gray-700);
    border-top: 2px solid var(--primary-gold);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Print Styles */
@media print {
    .header,
    .hero,
    .cta-section,
    .footer {
        display: none;
    }
    
    body {
        font-size: 12pt;
        line-height: 1.5;
        background: white;
        color: black;
    }
    
    .services-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .service-card {
        page-break-inside: avoid;
        box-shadow: none;
        border: 1px solid #ccc;
        color: black;
    }
}`;

    const utilityCSSPath = path.join(this.previewDir, 'assets', 'utility.css');
    fs.writeFileSync(utilityCSSPath, utilityCSSContent, 'utf8');
    this.log('Utility CSS file generated', 'success');

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

/* Fade In Left */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-left {
  animation: fadeInLeft 0.8s ease-out forwards;
}

/* Fade In Right */
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
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

    const animationsCSSPath = path.join(
      this.previewDir,
      'assets',
      'animations.css'
    );
    fs.writeFileSync(animationsCSSPath, animationsCSSContent, 'utf8');
    this.log('Animations CSS file generated', 'success');

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

/* Button Styles */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  text-align: center;
  border-radius: 4px;
  transition: var(--transition);
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-gold), var(--gold-shadow));
  color: var(--primary-black);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--gold-highlight), var(--primary-gold));
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--primary-gold);
  color: var(--primary-gold);
}

.btn-secondary:hover {
  background: var(--primary-gold);
  color: var(--primary-black);
  transform: translateY(-2px);
}

/* Section Styling */
.section {
  padding: 5rem 0;
}

.section-dark {
  background-color: var(--secondary-black);
}

.section-light {
  background-color: var(--rich-black);
}

/* Cards */
.card {
  background-color: var(--rich-black);
  border: 1px solid var(--primary-gold);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  transition: var(--transition);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

/* Forms */
.form-control {
  background-color: var(--secondary-black);
  border: 1px solid var(--gray-600);
  color: var(--white);
  padding: 0.75rem;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 4px;
  transition: var(--transition);
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-gold);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
}

/* Responsive Media Queries */
@media (max-width: 992px) {
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
}

@media (max-width: 768px) {
  .container { padding: 0 15px; }
  
  .footer-content {
    flex-direction: column;
  }
}

@media (max-width: 576px) {
  html { font-size: 14px; }
  
  .section {
    padding: 3rem 0;
  }
  
  .btn {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
  }
}`;

    const globalCSSPath = path.join(
      this.previewDir,
      'assets',
      'styles-global.css'
    );
    fs.writeFileSync(globalCSSPath, globalCSSContent, 'utf8');
    this.log('Global CSS file generated', 'success');

    this.log('All CSS files generated successfully', 'success');
  }

  async generateAdditionalAssets() {
    // Create a simple manifest file for PWA capabilities
    const manifest = {
      name: 'TNR Business Solutions',
      short_name: 'TNR Business',
      description:
        'Professional digital marketing and insurance services in Greensburg, PA',
      start_url: '/',
      display: 'standalone',
      background_color: '#1e40af',
      theme_color: '#1e40af',
      icons: [
        {
          src: '/media/favicon.ico',
          sizes: '32x32',
          type: 'image/x-icon',
        },
      ],
    };

    const manifestPath = path.join(this.previewDir, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

    // Create robots.txt if it doesn't exist
    const robotsPath = path.join(this.previewDir, 'robots.txt');
    if (!fs.existsSync(robotsPath)) {
      const robotsContent = `User-agent: *
Allow: /

Sitemap: https://www.tnrbusinesssolutions.com/sitemap.xml`;

      fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    }

    this.log('Additional assets generated', 'success');
  }
}

// Export for use in other scripts
if (require.main === module) {
  const builder = new ProfessionalHomepageBuilder();

  builder
    .buildProfessionalHomepage()
    .then(path => {
      console.log('🎉 Professional homepage created successfully!');
      console.log(`📍 Location: ${path}`);
      console.log('🌐 View at: http://localhost:8080/');
      console.log('🧪 Testing: http://localhost:3002/');
    })
    .catch(err => {
      console.error('💥 Error creating homepage:', err.message);
      process.exit(1);
    });
}

module.exports = { ProfessionalHomepageBuilder };
