// TNR Business Solutions - Master Page
// Global site settings and navigation

$w.onReady(function () {
    // Update site-wide settings
    $w('#siteTitle').text = "TNR Business Solutions";
    $w('#siteTagline').text = "Digital Marketing & Insurance Services in Greensburg, PA";
    
    // Update navigation menu
    const navigationItems = [
        { id: 'home', text: 'Home', link: '/home' },
        { id: 'services', text: 'Services', link: '/services' },
        { id: 'about', text: 'About', link: '/about' },
        { id: 'contact', text: 'Contact', link: '/contact' },
        { id: 'insurance', text: 'Insurance', link: '/insurance-services' },
        { id: 'seo', text: 'SEO', link: '/seo' }
    ];
    
    // Update navigation
    navigationItems.forEach((item, index) => {
        const navElement = $w(`#navItem${index + 1}`);
        if (navElement) {
            navElement.text = item.text;
            navElement.link = item.link;
        }
    });
    
    // Update footer information
    $w('#footerCompanyName').text = "TNR Business Solutions";
    $w('#footerAddress').text = "418 Concord Avenue, Greensburg, PA 15601";
    $w('#footerPhone').text = "+1-412-499-2987";
    $w('#footerEmail').text = "Info@TNRBusinessSolutions.com";
    
    // Update footer content
    $w('#footerContent').html = `
        <p><strong>TNR Business Solutions</strong></p>
        <p>Leading digital marketing agency and insurance services in Greensburg, Pennsylvania. We help small and medium-sized businesses grow, protect, and thrive in today's competitive marketplace.</p>
        <p><strong>Service Areas:</strong> Greensburg, Pittsburgh, Westmoreland County, Allegheny County, and surrounding areas</p>
    `;
    
    // Add global CSS styles
    $w('#globalStyles').html = `
        <style>
            /* TNR Business Solutions Global Styles */
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
            }
            
            .tnr-primary {
                color: #2c3e50;
            }
            
            .tnr-secondary {
                color: #3498db;
            }
            
            .tnr-accent {
                color: #e74c3c;
            }
            
            .btn-primary {
                background: #3498db;
                color: white;
                padding: 12px 24px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
            }
            
            .btn-primary:hover {
                background: #2980b9;
            }
            
            .service-card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 20px;
                margin: 10px 0;
                background: #fff;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .contact-info {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            
            .service-areas {
                background: #e8f4f8;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
        </style>
    `;
    
    // Set up global event handlers
    $w('#logo').onClick(() => {
        $w('#homePage').navigate();
    });
    
    // Add Google Analytics tracking (if needed)
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: 'TNR Business Solutions',
            page_location: window.location.href
        });
    }
    
    console.log("TNR Business Solutions master page loaded successfully!");
});
