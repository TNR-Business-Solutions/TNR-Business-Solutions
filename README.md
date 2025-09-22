# TNR Business Solutions Website

Professional business website for TNR Business Solutions - Digital Marketing and Insurance Services.

## 🚀 Features

- **Modern Design**: Responsive, mobile-first design with sunset-inspired color scheme
- **Digital Marketing Services**: Web design, SEO, content creation, paid advertising, social media, email marketing
- **Insurance Services**: Auto, home, life, business, and BOP insurance
- **Package Deals**: Comprehensive service packages with secure checkout
- **Contact Forms**: Professional contact and insurance inquiry forms
- **Email Integration**: SendGrid-powered email notifications and confirmations
- **Secure Backend**: Node.js API with rate limiting, validation, and security headers

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Email**: SendGrid API
- **Payments**: Square Web Payments SDK (with mock testing)
- **Security**: Helmet, CORS, Rate Limiting, Input Validation

## 📁 Project Structure

```
├── dist/preview/          # Static website files
│   ├── assets/           # CSS, JS, and images
│   ├── *.html           # Website pages
│   └── blog/            # Blog posts
├── backend/              # Node.js API server
│   ├── intake-server.js # Main server file
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Environment variables template
├── media/               # Images and media files
├── serve-optimized.js   # Static file server
└── package.json         # Project dependencies
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- SendGrid account (for email functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tnr-business-solutions-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   ```

3. **Configure environment variables**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your SendGrid API key
   ```

4. **Start the servers**
   ```bash
   # Terminal 1: Frontend server
   npm start
   
   # Terminal 2: Backend API
   cd backend && npm start
   ```

5. **Access the website**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 📧 Email Configuration

The website uses SendGrid for email delivery:

1. **Sign up for SendGrid** at https://sendgrid.com
2. **Verify your sender email** in SendGrid dashboard
3. **Get your API key** from SendGrid settings
4. **Add to backend/.env**:
   ```
   SENDGRID_API_KEY=your_api_key_here
   FROM_EMAIL=your-verified-email@domain.com
   TO_EMAIL=your-verified-email@domain.com
   ```

## 💳 Payment Configuration (Optional)

For production payments, configure Square:

1. **Sign up for Square** at https://squareup.com
2. **Get your credentials** from Square Developer Dashboard
3. **Add to backend/.env**:
   ```
   SQUARE_ACCESS_TOKEN=your_access_token
   SQUARE_APPLICATION_ID=your_app_id
   SQUARE_ENVIRONMENT=sandbox
   ```

## 🔧 API Endpoints

- `POST /api/contact-form` - Contact form submissions
- `POST /api/insurance-inquiry` - Insurance inquiry forms
- `POST /api/process-payment` - Package payment processing
- `GET /api/health` - Server health check

## 🚀 Deployment

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy frontend automatically
3. Add backend as serverless functions

### Option 2: Netlify
1. Connect repository to Netlify
2. Deploy static site
3. Add backend functions

### Option 3: Traditional Hosting
1. Upload `dist/preview/` files to web server
2. Deploy backend to Node.js hosting (Heroku, DigitalOcean, etc.)
3. Configure environment variables

## 📱 Pages

- **Home** (`/`) - Main landing page
- **Services** (`/services`) - Digital marketing services
- **Insurance** (`/insurance`) - Insurance services overview
- **Packages** (`/packages`) - Service packages and pricing
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form
- **Blog** (`/blog`) - Latest blog posts
- **Careers** (`/careers`) - Job postings

## 🔒 Security Features

- **Rate Limiting**: 10 requests per 15 minutes per IP
- **Input Validation**: All form inputs validated and sanitized
- **CORS Protection**: Secure cross-origin requests
- **Security Headers**: Helmet.js security middleware
- **Email Validation**: Proper email format checking

## 📞 Support

For technical support or questions about this website, contact:
- **Email**: Roy.Turner@tnrbusinesssolutions.com
- **Website**: https://tnrbusinesssolutions.com

## 📄 License

© 2025 TNR Business Solutions. All rights reserved.
