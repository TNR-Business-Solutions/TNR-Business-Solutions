/**
 * Premium Contact Section for TNR Business Solutions
 */

function generatePremiumContactSection() {
  return `<!-- Premium Contact Section -->
<section class="contact-section premium-contact" id="contact">
    <div class="container">
        <div class="section-header" data-aos="fade-up">
            <h2 class="section-title gold-shimmer">Contact Us</h2>
            <p class="section-subtitle">
                Ready to unlock your business potential? Connect with us today.
            </p>
        </div>

        <div class="contact-content">
            <div class="contact-info premium-card" data-aos="fade-right">
                <h3 class="gold-shimmer">Get in Touch</h3>
                
                <div class="business-card-container mb-4" style="text-align: center;">
                    <img src="/media/premium-business-card.svg" alt="TNR Business Solutions Business Card" width="300" height="150">
                </div>
                
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <h4>Location</h4>
                        <p>418 Concord Avenue, Greensburg, PA 15601</p>
                    </div>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <div>
                        <h4>Phone</h4>
                        <p><a href="tel:4124992987">(412) 499-2987</a></p>
                    </div>
                </div>
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <div>
                        <h4>Email</h4>
                        <p><a href="mailto:Roy.Turner@TNRBusinessSolutions.com">Roy.Turner@TNRBusinessSolutions.com</a></p>
                    </div>
                </div>
                <div class="contact-item">
                    <i class="fas fa-globe"></i>
                    <div>
                        <h4>Website</h4>
                        <p><a href="https://www.tnrbusinesssolutions.com">www.TnrBusinessSolutions.com</a></p>
                    </div>
                </div>
                <div class="contact-item">
                    <i class="fas fa-map"></i>
                    <div>
                        <h4>Service Area</h4>
                        <p>Serving All of Southwestern PA</p>
                    </div>
                </div>
            </div>

            <div class="contact-form premium-form" data-aos="fade-left">
                <form id="contactForm">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="service">Service Interested In</label>
                        <select id="service" name="service">
                            <option value="">Select a service...</option>
                            <option value="seo">SEO Services</option>
                            <option value="web">Web Design & Development</option>
                            <option value="digital">Digital Marketing</option>
                            <option value="insurance">Insurance Services</option>
                            <option value="consulting">Business Consulting</option>
                            <option value="branding">Branding & Design</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn-primary soft-pulse">
                        <i class="fas fa-paper-plane"></i>
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>`;
}

module.exports = { generatePremiumContactSection };
