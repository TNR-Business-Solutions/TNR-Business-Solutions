#!/usr/bin/env node
/**
 * TNR Business Solutions - Contact Form Server (Node.js)
 * Optimized Express server to handle contact form submissions and send email notifications
 */

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

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

async function saveSubmissionLocally(formData) {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `intake_${timestamp}_${formData.business_name.replace(
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

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Server stopped by user');
  process.exit(0);
});

startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
