// TNR Business Solutions - Contact Page
// Contact information and form handling

$w.onReady(function () {
    // Update page title and meta description
    $w('#pageTitle').text = "Contact Us | TNR Business Solutions | Greensburg PA Digital Marketing & Insurance";
    $w('#pageDescription').text = "Contact TNR Business Solutions in Greensburg PA for digital marketing and insurance services. Call (412) 499-2987 or email Info@TNRBusinessSolutions.com";
    
    // Update main heading
    $w('#mainHeading').text = "Contact TNR Business Solutions";
    $w('#subHeading').text = "Ready to Grow Your Business? Let's Talk!";
    
    // Update contact information
    $w('#phoneNumber').text = "+1-412-499-2987";
    $w('#emailAddress').text = "Info@TNRBusinessSolutions.com";
    $w('#businessAddress').text = "418 Concord Avenue, Greensburg, PA 15601";
    
    // Update business hours
    $w('#businessHours').html = `
        <h3>Business Hours</h3>
        <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
        <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
        <p><strong>Sunday:</strong> Closed</p>
    `;
    
    // Update service areas
    $w('#serviceAreas').html = `
        <h3>Service Areas</h3>
        <p>We proudly serve businesses throughout Western Pennsylvania, including:</p>
        <ul>
            <li>Greensburg, PA</li>
            <li>Pittsburgh, PA</li>
            <li>Westmoreland County</li>
            <li>Allegheny County</li>
            <li>Indiana County</li>
            <li>Fayette County</li>
            <li>And surrounding areas</li>
        </ul>
    `;
    
    // Update main content
    $w('#mainContent').html = `
        <p>Ready to take your business to the next level? Our team of digital marketing and insurance experts is here to help you succeed. Whether you need a new website, SEO services, social media management, or comprehensive insurance protection, we have the expertise and local knowledge to deliver results.</p>
        
        <h2>Why Choose TNR Business Solutions?</h2>
        <ul>
            <li><strong>Local Expertise:</strong> Based in Greensburg, PA, we understand the local market</li>
            <li><strong>Comprehensive Services:</strong> Digital marketing, web design, and insurance solutions</li>
            <li><strong>Proven Results:</strong> Helping businesses grow and succeed</li>
            <li><strong>Personalized Approach:</strong> Tailored solutions for your specific needs</li>
        </ul>
        
        <h2>Get Your Free Consultation</h2>
        <p>Contact us today for a free consultation and see how we can help your business grow. We'll analyze your current situation and provide recommendations tailored to your specific needs and goals.</p>
    `;
    
    // Set up contact form handling
    $w('#contactForm').onSubmit((event) => {
        event.preventDefault();
        
        const formData = {
            name: $w('#nameInput').value,
            email: $w('#emailInput').value,
            phone: $w('#phoneInput').value,
            company: $w('#companyInput').value,
            service: $w('#serviceSelect').value,
            message: $w('#messageInput').value,
            timestamp: new Date().toISOString()
        };
        
        console.log('Contact form submitted:', formData);
        
        // Show success message
        $w('#formMessage').text = "Thank you for your message! We'll get back to you within 24 hours.";
        $w('#formMessage').style.color = "green";
        
        // Reset form
        $w('#contactForm').reset();
        
        // Here you would typically send the data to your backend
        // For now, we'll just log it
        console.log('Form data ready for backend processing:', formData);
    });
    
    console.log("TNR Business Solutions contact page loaded successfully!");
});
