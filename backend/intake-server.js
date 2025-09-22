#!/usr/bin/env node
/**
 * TNR Business Solutions - Contact Form Server (Node.js)
 * Optimized Express server to handle contact form submissions and send email notifications
 */

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const { Client } = require('squareup');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('✅ SendGrid configured');
} else {
  console.log('⚠️ SendGrid API key not found - using fallback email');
}

// Initialize Square (only if credentials provided)
let squareClient, paymentsApi, locationsApi;
if (process.env.SQUARE_ACCESS_TOKEN) {
  try {
    squareClient = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment:
        process.env.SQUARE_ENVIRONMENT === 'production'
          ? 'production'
          : 'sandbox',
    });
    paymentsApi = squareClient.paymentsApi;
    locationsApi = squareClient.locationsApi;
    console.log(
      '✅ Square configured for',
      process.env.SQUARE_ENVIRONMENT || 'sandbox'
    );
  } catch (error) {
    console.log('⚠️ Square configuration error:', error.message);
  }
} else {
  console.log('⚠️ Square not configured - using mock payment for testing');
}

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
});

// Apply rate limiting to all routes
app.use('/api/', limiter);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Email configuration
const EMAIL_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS || 'Roy.Turner@TNRBusinessSolutions.com',
    pass: process.env.EMAIL_PASSWORD || '', // Set this as environment variable
  },
};

const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || 'Roy.Turner@TNRBusinessSolutions.com';

// Create submissions directory
const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');

async function ensureSubmissionsDir() {
  try {
    await fs.mkdir(SUBMISSIONS_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating submissions directory:', error);
  }
}

// SendGrid email function
async function sendEmailViaSendGrid(emailData) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('⚠️ SendGrid not configured, using fallback');
      return await sendEmailViaNodemailer(emailData);
    }

    await sgMail.send(emailData);
    console.log('✅ Email sent via SendGrid');
    return true;
  } catch (error) {
    console.error('❌ SendGrid error:', error);
    // Fallback to nodemailer if SendGrid fails
    return await sendEmailViaNodemailer(emailData);
  }
}

// Fallback nodemailer function
async function sendEmailViaNodemailer(emailData) {
  try {
    if (!EMAIL_CONFIG.auth.pass) {
      console.log('⚠️ No email service configured');
      return false;
    }

    const transporter = nodemailer.createTransporter(EMAIL_CONFIG);
    await transporter.sendMail({
      from: EMAIL_CONFIG.auth.user,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    });
    console.log('✅ Email sent via Gmail fallback');
    return true;
  } catch (error) {
    console.error('❌ Email fallback error:', error);
    return false;
  }
}

// Contact form email notification
async function sendContactEmailNotification(formData) {
  const emailData = {
    to: process.env.TO_EMAIL || 'roy.turner@tnrbusinesssolutions.com',
    from: process.env.FROM_EMAIL || 'roy.turner@tnrbusinesssolutions.com',
    subject: `New Contact Form Submission - ${formData.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
      <p><strong>Service Interest:</strong> ${
        formData.service || 'Not specified'
      }</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
      <hr>
      <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
    `,
  };

  return await sendEmailViaSendGrid(emailData);
}

// Contact form confirmation email
async function sendContactConfirmation(formData) {
  const emailData = {
    to: formData.email,
    from: process.env.FROM_EMAIL || 'roy.turner@tnrbusinesssolutions.com',
    subject: 'Thank you for contacting TNR Business Solutions',
    html: `
      <h2>Thank you for your inquiry!</h2>
      <p>Dear ${formData.name},</p>
      <p>Thank you for contacting TNR Business Solutions. We have received your message and will respond within 24 hours.</p>
      <p><strong>Your inquiry details:</strong></p>
      <p><strong>Service Interest:</strong> ${
        formData.service || 'General inquiry'
      }</p>
      <p><strong>Message:</strong> ${formData.message}</p>
      <hr>
      <p>Best regards,<br>
      Roy Turner<br>
      TNR Business Solutions<br>
      📞 (412) 499-2987<br>
      ✉️ Roy.Turner@tnrbusinesssolutions.com</p>
    `,
  };

  return await sendEmailViaSendGrid(emailData);
}

async function sendEmailNotification(formData) {
  try {
    // Only send if email password is configured
    if (!EMAIL_CONFIG.auth.pass) {
      console.log(
        '⚠️ Email password not configured. Storing submission locally only.'
      );
      return false;
    }

    const transporter = nodemailer.createTransporter(EMAIL_CONFIG);

    const mailOptions = {
      from: EMAIL_CONFIG.auth.user,
      to: NOTIFICATION_EMAIL,
      subject: `🚀 New Lead from TNR Website Chatbot - ${formData.business_name}`,
      html: `
        <h2>🎯 New Lead from TNR Business Solutions Website</h2>
        
        <h3>📋 Contact Information:</h3>
        <ul>
            <li><strong>Name:</strong> ${formData.name}</li>
            <li><strong>Business:</strong> ${formData.business_name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone}</li>
        </ul>
        
        <h3>🎯 Service Requirements:</h3>
        <ul>
            <li><strong>Services Needed:</strong> ${
              formData.services_needed
            }</li>
            <li><strong>Budget Range:</strong> ${
              formData.budget || 'Not specified'
            }</li>
            <li><strong>Timeline:</strong> ${
              formData.timeline || 'Not specified'
            }</li>
        </ul>
        
        ${
          formData.additional_info
            ? `<h3>📝 Additional Information:</h3><p>${formData.additional_info}</p>`
            : ''
        }
        
        <h3>📊 Submission Details:</h3>
        <ul>
            <li><strong>Source:</strong> ${formData.source}</li>
            <li><strong>Submitted:</strong> ${formData.timestamp}</li>
        </ul>
        
        <hr>
        <p><strong>🚀 Action Required:</strong> Contact this lead within 24 hours for best conversion rates!</p>
        <p><strong>📞 Quick Contact:</strong> Call ${formData.phone} or email ${
        formData.email
      }</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `✅ Email notification sent for lead: ${formData.business_name}`
    );
    return true;
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
    return false;
  }
}

async function saveSubmissionLocally(formData, type = 'intake') {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const businessName =
      formData.business_name || formData.name || formData.fullName || 'Unknown';
    const filename = `${type}_${timestamp}_${businessName.replace(
      /[^a-zA-Z0-9]/g,
      '_'
    )}.json`;
    const filepath = path.join(SUBMISSIONS_DIR, filename);

    await fs.writeFile(filepath, JSON.stringify(formData, null, 2));
    console.log(`📁 Submission saved locally: ${filename}`);
    return filename;
  } catch (error) {
    console.error('❌ Error saving submission locally:', error);
    return null;
  }
}

async function saveCartSubmissionLocally(cartData) {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `cart_${timestamp}_${cartData.source.replace(
      /[^a-zA-Z0-9]/g,
      '_'
    )}.json`;
    const filepath = path.join(SUBMISSIONS_DIR, filename);

    await fs.writeFile(filepath, JSON.stringify(cartData, null, 2));
    console.log(`📁 Cart submission saved locally: ${filename}`);
    return filename;
  } catch (error) {
    console.error('❌ Error saving cart submission locally:', error);
    return null;
  }
}

async function sendCartEmailNotification(cartData) {
  try {
    // Only send if email password is configured
    if (!EMAIL_CONFIG.auth.pass) {
      console.log(
        '⚠️ Email password not configured. Storing cart submission locally only.'
      );
      return false;
    }

    const transporter = nodemailer.createTransporter(EMAIL_CONFIG);

    // Create items list
    const itemsList = cartData.items
      .map(
        item =>
          `<li><strong>${item.name}</strong> - $${item.price}/month + $${item.setupFee} setup</li>`
      )
      .join('');

    const mailOptions = {
      from: EMAIL_CONFIG.auth.user,
      to: NOTIFICATION_EMAIL,
      subject: `🛒 New Package Order - TNR Business Solutions`,
      html: `
        <h2>🛒 New Package Order from TNR Business Solutions Website</h2>
        
        <h3>📋 Order Summary:</h3>
        <ul>
            <li><strong>Source:</strong> ${cartData.source}</li>
            <li><strong>Submitted:</strong> ${cartData.timestamp}</li>
            <li><strong>Total Monthly:</strong> $${cartData.subtotal.toLocaleString()}.00</li>
            <li><strong>Setup Fees:</strong> $${cartData.setupFee.toLocaleString()}.00</li>
            <li><strong>Grand Total:</strong> $${cartData.total.toLocaleString()}.00</li>
        </ul>
        
        <h3>📦 Packages Ordered:</h3>
        <ul>
            ${itemsList}
        </ul>
        
        <hr>
        <p><strong>🚀 Action Required:</strong> Contact this customer within 24 hours to finalize their package order!</p>
        <p><strong>📞 Next Steps:</strong> Call the customer to confirm package details and payment information.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `✅ Cart email notification sent for order: $${cartData.total.toLocaleString()}`
    );
    return true;
  } catch (error) {
    console.error('❌ Error sending cart email notification:', error);
    return false;
  }
}

// Routes
app.post('/api/cart-checkout', async (req, res) => {
  try {
    const cartData = req.body;
    console.log(`🛒 New cart checkout from: ${cartData.source}`);

    // Save cart submission locally
    const filename = await saveCartSubmissionLocally(cartData);

    // Send email notification for cart checkout
    const emailSent = await sendCartEmailNotification(cartData);

    // Return success response
    res.json({
      success: true,
      message: 'Cart checkout submitted successfully',
      submission_id: filename,
      email_sent: emailSent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error processing cart checkout:', error);
    res.status(500).json({
      success: false,
      error: `Error processing cart checkout: ${error.message}`,
    });
  }
});

app.post('/api/intake-form', async (req, res) => {
  try {
    const formData = req.body;
    console.log(
      `📝 New intake form submission from: ${formData.business_name}`
    );

    // Save submission locally (always)
    const filename = await saveSubmissionLocally(formData);

    // Send email notification
    const emailSent = await sendEmailNotification(formData);

    // Return success response
    res.json({
      success: true,
      message: 'Intake form submitted successfully',
      submission_id: filename,
      email_sent: emailSent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error processing intake form:', error);
    res.status(500).json({
      success: false,
      error: `Error processing form: ${error.message}`,
    });
  }
});

// Contact form endpoint
app.post(
  '/api/contact-form',
  [
    body('name').trim().isLength({ min: 2 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').optional().trim().escape(),
    body('service').optional().trim().escape(),
    body('message').trim().isLength({ min: 10 }).escape(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const formData = req.body;
      console.log(`📧 New contact form submission from: ${formData.name}`);

      // Save submission locally
      const filename = await saveSubmissionLocally(formData, 'contact');

      // Send email notification to Roy
      const emailSent = await sendContactEmailNotification(formData);

      // Send confirmation email to client
      const confirmationSent = await sendContactConfirmation(formData);

      res.json({
        success: true,
        message: 'Contact form submitted successfully',
        submission_id: filename,
        email_sent: emailSent,
        confirmation_sent: confirmationSent,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('❌ Error processing contact form:', error);
      res.status(500).json({
        success: false,
        error: `Error processing form: ${error.message}`,
      });
    }
  }
);

// Insurance inquiry endpoint
app.post(
  '/api/insurance-inquiry',
  [
    body('fullName').trim().isLength({ min: 2 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').trim().isLength({ min: 10 }).escape(),
    body('zipCode').trim().isLength({ min: 5 }).escape(),
    body('coverageTypes').isArray().isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const formData = req.body;
      console.log(`🛡️ New insurance inquiry from: ${formData.fullName}`);

      // Save submission locally
      const filename = await saveSubmissionLocally(formData, 'insurance');

      // Send email notification to Roy (function defined below)
      const emailSent = await sendInsuranceEmailNotification(formData);

      // Send confirmation email to client (function defined below)
      const confirmationSent = await sendInsuranceConfirmation(formData);

      res.json({
        success: true,
        message: 'Insurance inquiry submitted successfully',
        submission_id: filename,
        email_sent: emailSent,
        confirmation_sent: confirmationSent,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('❌ Error processing insurance inquiry:', error);
      res.status(500).json({
        success: false,
        error: `Error processing form: ${error.message}`,
      });
    }
  }
);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'TNR Intake Form API (Node.js)',
    email_configured: !!EMAIL_CONFIG.auth.pass,
  });
});

app.get('/api/submissions', async (req, res) => {
  try {
    const files = await fs.readdir(SUBMISSIONS_DIR);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    const submissions = [];
    for (const file of jsonFiles.slice(-10)) {
      // Last 10 submissions
      try {
        const filepath = path.join(SUBMISSIONS_DIR, file);
        const data = await fs.readFile(filepath, 'utf8');
        submissions.push({
          filename: file,
          data: JSON.parse(data),
        });
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
      }
    }

    res.json({
      submissions: submissions,
      count: submissions.length,
    });
  } catch (error) {
    console.error('❌ Error retrieving submissions:', error);
    res.status(500).json({
      success: false,
      error: `Error retrieving submissions: ${error.message}`,
    });
  }
});

// Start server
async function startServer() {
  await ensureSubmissionsDir();

  app.listen(PORT, () => {
    console.log('🚀 TNR Business Solutions - Contact Form Server (Node.js)');
    console.log(`📧 Notification Email: ${NOTIFICATION_EMAIL}`);
    console.log(
      `📧 SMTP Configured: ${
        EMAIL_CONFIG.auth.pass ? 'Yes' : 'No (local storage only)'
      }`
    );
    console.log(`🌐 Server running on http://localhost:${PORT}`);
    console.log('=' * 50);
  });
}

// Insurance inquiry email notification
async function sendInsuranceEmailNotification(formData) {
  const coverageList = Array.isArray(formData.coverageTypes)
    ? formData.coverageTypes.join(', ')
    : formData.coverageTypes || 'Not specified';

  const emailData = {
    to: process.env.TO_EMAIL || 'roy.turner@tnrbusinesssolutions.com',
    from: process.env.FROM_EMAIL || 'roy.turner@tnrbusinesssolutions.com',
    subject: `New Insurance Inquiry - ${formData.fullName}`,
    html: `
      <h2>New Insurance Coverage Inquiry</h2>
      <h3>Contact Information:</h3>
      <p><strong>Name:</strong> ${formData.fullName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>ZIP Code:</strong> ${formData.zipCode}</p>
      
      <h3>Coverage Details:</h3>
      <p><strong>Coverage Types:</strong> ${coverageList}</p>
      <p><strong>Bundling Preference:</strong> ${
        formData.bundlingOptions || 'Not specified'
      }</p>
      <p><strong>Current Status:</strong> ${
        formData.currentInsurance || 'Not specified'
      }</p>
      <p><strong>Budget Range:</strong> ${
        formData.budgetRange || 'Not specified'
      }</p>
      <p><strong>Timeline:</strong> ${formData.timeline || 'Not specified'}</p>
      <p><strong>Contact Preference:</strong> ${
        formData.contactPreference || 'Not specified'
      }</p>
      
      <h3>Additional Information:</h3>
      <p>${formData.additionalInfo || 'None provided'}</p>
      
      <hr>
      <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
    `,
  };

  return await sendEmailViaSendGrid(emailData);
}

// Insurance inquiry confirmation email
async function sendInsuranceConfirmation(formData) {
  const emailData = {
    to: formData.email,
    from: process.env.FROM_EMAIL || 'roy.turner@tnrbusinesssolutions.com',
    subject: 'Thank you for your insurance inquiry - TNR Business Solutions',
    html: `
      <h2>Thank you for your insurance inquiry!</h2>
      <p>Dear ${formData.fullName},</p>
      <p>Thank you for your interest in our insurance services. We have received your inquiry and will contact you within 24 hours to discuss your coverage needs.</p>
      
      <h3>Your inquiry summary:</h3>
      <p><strong>Coverage Types:</strong> ${
        Array.isArray(formData.coverageTypes)
          ? formData.coverageTypes.join(', ')
          : formData.coverageTypes
      }</p>
      <p><strong>Preferred Contact:</strong> ${
        formData.contactPreference || 'Any method'
      }</p>
      <p><strong>Timeline:</strong> ${formData.timeline || 'Flexible'}</p>
      
      <h3>What happens next?</h3>
      <ul>
        <li>We'll review your coverage needs</li>
        <li>Prepare personalized quotes from multiple carriers</li>
        <li>Contact you via your preferred method</li>
        <li>Schedule a consultation to discuss your options</li>
      </ul>
      
      <hr>
      <p>Best regards,<br>
      Roy Turner<br>
      TNR Business Solutions<br>
      📞 (412) 499-2987<br>
      ✉️ Roy.Turner@tnrbusinesssolutions.com<br>
      📍 418 Concord Avenue, Greensburg, PA 15601</p>
    `,
  };

  return await sendEmailViaSendGrid(emailData);
}

// Square payment processing endpoint
app.post(
  '/api/process-payment',
  [
    body('sourceId').notEmpty().trim().escape(),
    body('amount').isFloat({ min: 0.01 }),
    body('currency').equals('USD'),
    body('customerEmail').isEmail().normalizeEmail(),
    body('customerName').trim().isLength({ min: 2 }).escape(),
    body('orderDetails').isArray(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const {
        sourceId,
        amount,
        currency,
        customerEmail,
        customerName,
        orderDetails,
      } = req.body;

      // Convert amount to cents (Square uses cents)
      const amountInCents = Math.round(amount * 100);

      // Create payment request
      const paymentRequest = {
        sourceId,
        amountMoney: {
          amount: amountInCents,
          currency: currency.toUpperCase(),
        },
        idempotencyKey: `${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        note: `TNR Business Solutions - Package Purchase`,
        buyerEmailAddress: customerEmail,
      };

      // Check if Square is configured, otherwise use mock payment
      if (!paymentsApi) {
        console.log('🧪 Using mock payment system for testing');

        // Simulate payment processing
        const mockResult = {
          payment: {
            id: `mock_payment_${Date.now()}`,
            status: 'COMPLETED',
            totalMoney: {
              amount: amountInCents,
              currency: currency.toUpperCase(),
            },
            sourceType: 'CARD',
            createdAt: new Date().toISOString(),
          },
        };

        console.log('🧪 Mock payment processed:', mockResult.payment.id);

        // Continue with mock payment record
        const paymentRecord = {
          paymentId: mockResult.payment.id,
          amount: amount,
          currency: currency,
          customerName: customerName,
          customerEmail: customerEmail,
          orderDetails: orderDetails,
          timestamp: new Date().toISOString(),
          paymentMethod: 'MOCK_CARD',
          isTest: true,
        };

        await saveSubmissionLocally(paymentRecord, 'payment');
        const emailSent = await sendPaymentNotification(paymentRecord);
        const confirmationSent = await sendPaymentConfirmation(paymentRecord);

        return res.json({
          success: true,
          message: 'Mock payment processed successfully',
          paymentId: mockResult.payment.id,
          amount: amount,
          status: mockResult.payment.status,
          email_sent: emailSent,
          confirmation_sent: confirmationSent,
          isTest: true,
          timestamp: paymentRecord.timestamp,
        });
      }

      // Process payment with Square
      const { result } = await paymentsApi.createPayment(paymentRequest);

      if (result.payment && result.payment.status === 'COMPLETED') {
        console.log('✅ Payment processed successfully:', result.payment.id);

        // Save payment record
        const paymentRecord = {
          paymentId: result.payment.id,
          amount: amount,
          currency: currency,
          customerName: customerName,
          customerEmail: customerEmail,
          orderDetails: orderDetails,
          timestamp: new Date().toISOString(),
          status: 'completed',
        };

        await saveSubmissionLocally(paymentRecord, 'payment');

        // Send confirmation emails
        await sendPaymentConfirmation(paymentRecord);
        await sendPaymentNotification(paymentRecord);

        res.json({
          success: true,
          paymentId: result.payment.id,
          message: 'Payment processed successfully',
        });
      } else {
        throw new Error('Payment not completed');
      }
    } catch (error) {
      console.error('❌ Payment processing error:', error);
      res.status(500).json({
        success: false,
        error: 'Payment processing failed',
        details: error.message,
      });
    }
  }
);

// Payment confirmation email to customer
async function sendPaymentConfirmation(paymentRecord) {
  const orderItemsList = paymentRecord.orderDetails
    .map(item => `<li>${item.name} - $${item.price}</li>`)
    .join('');

  const emailData = {
    to: paymentRecord.customerEmail,
    from: process.env.FROM_EMAIL || 'roy.turner@tnrbusinesssolutions.com',
    subject: 'Payment Confirmation - TNR Business Solutions',
    html: `
      <h2>Payment Confirmation</h2>
      <p>Dear ${paymentRecord.customerName},</p>
      <p>Thank you for your purchase! Your payment has been successfully processed.</p>
      
      <h3>Order Details:</h3>
      <ul>${orderItemsList}</ul>
      <p><strong>Total Amount:</strong> $${paymentRecord.amount}</p>
      <p><strong>Payment ID:</strong> ${paymentRecord.paymentId}</p>
      <p><strong>Date:</strong> ${new Date(
        paymentRecord.timestamp
      ).toLocaleDateString()}</p>
      
      <h3>What happens next?</h3>
      <ul>
        <li>We'll begin work on your services within 1-2 business days</li>
        <li>You'll receive a welcome email with next steps</li>
        <li>Our team will contact you to schedule any necessary consultations</li>
      </ul>
      
      <hr>
      <p>Best regards,<br>
      Roy Turner<br>
      TNR Business Solutions<br>
      📞 (412) 499-2987<br>
      ✉️ Roy.Turner@tnrbusinesssolutions.com</p>
    `,
  };

  return await sendEmailViaSendGrid(emailData);
}

// Payment notification to Roy
async function sendPaymentNotification(paymentRecord) {
  const orderItemsList = paymentRecord.orderDetails
    .map(item => `${item.name} - $${item.price}`)
    .join('\n');

  const emailData = {
    to: process.env.TO_EMAIL || 'roy.turner@tnrbusinesssolutions.com',
    from: process.env.FROM_EMAIL || 'roy.turner@tnrbusinesssolutions.com',
    subject: `New Payment Received - $${paymentRecord.amount}`,
    html: `
      <h2>New Payment Received!</h2>
      <h3>Customer Information:</h3>
      <p><strong>Name:</strong> ${paymentRecord.customerName}</p>
      <p><strong>Email:</strong> ${paymentRecord.customerEmail}</p>
      
      <h3>Order Details:</h3>
      <p><strong>Items:</strong></p>
      <pre>${orderItemsList}</pre>
      <p><strong>Total Amount:</strong> $${paymentRecord.amount}</p>
      <p><strong>Payment ID:</strong> ${paymentRecord.paymentId}</p>
      
      <h3>Action Required:</h3>
      <ul>
        <li>Begin service delivery within 1-2 business days</li>
        <li>Contact customer to schedule consultations</li>
        <li>Update project management system</li>
      </ul>
      
      <hr>
      <p><small>Payment processed: ${new Date(
        paymentRecord.timestamp
      ).toLocaleString()}</small></p>
    `,
  };

  return await sendEmailViaSendGrid(emailData);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Server stopped by user');
  process.exit(0);
});

startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
