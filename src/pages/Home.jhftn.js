// TNR Business Solutions - Homepage
// Leading Digital Marketing Agency & Insurance Services in Greensburg, PA

$w.onReady(function () {
    // Update page title and meta description
    $w('#pageTitle').text = "TNR Business Solutions | Digital Marketing & Insurance Services in Greensburg PA | Westmoreland County";
    $w('#pageDescription').text = "Leading digital marketing agency and insurance services in Greensburg PA. Expert SEO, web design, social media marketing, and business insurance solutions for small businesses in Western Pennsylvania.";
    
    // Update main heading
    $w('#mainHeading').text = "TNR Business Solutions";
    
    // Update subheading
    $w('#subHeading').text = "Leading Digital Marketing Agency & Insurance Services in Greensburg, PA | Westmoreland County";
    
    // Update main content
    $w('#mainContent').html = `
        <p>At TNR Business Solutions, we are your trusted local partner for comprehensive digital marketing, professional web design, and complete insurance protection services. We help small and medium-sized businesses in Greensburg, Pennsylvania and surrounding areas grow, protect, and thrive in today's competitive marketplace.</p>
        
        <h2>Why Choose TNR Business Solutions?</h2>
        <ul>
            <li><strong>Local Expertise:</strong> Based in Greensburg, PA, we understand the local market</li>
            <li><strong>Comprehensive Services:</strong> Digital marketing, web design, and insurance solutions</li>
            <li><strong>Proven Results:</strong> Helping businesses grow and succeed</li>
            <li><strong>Personalized Approach:</strong> Tailored solutions for your specific needs</li>
        </ul>
        
        <h2>Our Services</h2>
        <div class="services-grid">
            <div class="service-item">
                <h3>Digital Marketing</h3>
                <p>SEO, social media marketing, paid advertising, and more</p>
            </div>
            <div class="service-item">
                <h3>Web Design</h3>
                <p>Professional, mobile-responsive websites that convert</p>
            </div>
            <div class="service-item">
                <h3>Insurance Services</h3>
                <p>Personal and commercial insurance solutions</p>
            </div>
        </div>
        
        <h2>Ready to Get Started?</h2>
        <p>Contact us today for a free consultation and see how we can help your business grow.</p>
    `;
    
    // Update contact information
    $w('#phoneNumber').text = "+1-412-499-2987";
    $w('#emailAddress').text = "Info@TNRBusinessSolutions.com";
    $w('#businessAddress').text = "418 Concord Avenue, Greensburg, PA 15601";
    
    console.log("TNR Business Solutions homepage loaded successfully!");
});
