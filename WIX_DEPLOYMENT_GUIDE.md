# TNR Business Solutions - Wix Deployment Guide

## 🚀 Overview

This guide will help you deploy the TNR Business Solutions website to Wix from GitHub using the Wix
API.

## 📋 Prerequisites

1. **Wix Account** with a premium plan
2. **Wix Developer Account** (free)
3. **GitHub Repository** with the TNR Business Solutions code
4. **Node.js** installed locally

## 🔧 Step 1: Set up Wix API Access

### 1.1 Create a Wix App

1. Go to [Wix Developers](https://dev.wix.com/)
2. Sign in with your Wix account
3. Click "Create New App"
4. Choose "Custom App"
5. Fill in the details:
   - **App Name**: TNR Business Solutions
   - **Description**: Website deployment and content management
   - **App URL**: `https://www.tnrbusinesssolutions.com`

### 1.2 Get API Credentials

1. In your app dashboard, go to "OAuth" tab
2. Copy your **Client ID** and **Client Secret**
3. Set the **Redirect URI** to: `https://www.tnrbusinesssolutions.com/auth/callback`

### 1.3 Configure Site Access

1. Go to "Site Access" tab
2. Add your site ID: `4483f29d-f541-486b-ae48-64f09aaa56b3`
3. Request access to:
   - **Wix Data API** (for content management)
   - **Wix Sites API** (for site settings)
   - **Wix SEO API** (for SEO optimization)

## 🔑 Step 2: Configure Environment Variables

### 2.1 Create .env File

Copy the example file and fill in your credentials:

```bash
cp env.example .env
```

### 2.2 Add Your Credentials

Edit `.env` file with your actual values:

```env
# Wix API Configuration
WIX_CLIENT_ID=your_actual_client_id_here
WIX_CLIENT_SECRET=your_actual_client_secret_here
WIX_ACCESS_TOKEN=your_access_token_here

# Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=Info@TNRBusinessSolutions.com
TO_EMAIL=Info@TNRBusinessSolutions.com
```

### 2.3 Get Access Token

Run the authentication command:

```bash
npm run wix:auth
```

This will generate an access token and save it to your `.env` file.

## 🚀 Step 3: Deploy to Wix

### 3.1 Local Deployment

Build and deploy the website:

```bash
# Build the website
npm run build

# Deploy to Wix
npm run deploy:wix
```

### 3.2 GitHub Deployment

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Deploy to Wix"
   git push origin main
   ```

2. **Set up GitHub Secrets**:

   - Go to your GitHub repository
   - Click "Settings" → "Secrets and variables" → "Actions"
   - Add these secrets:
     - `WIX_CLIENT_ID`
     - `WIX_CLIENT_SECRET`
     - `WIX_ACCESS_TOKEN`

3. **Automatic Deployment**:
   - Every push to `main` branch will trigger deployment
   - Check the "Actions" tab to monitor deployment status

## 📊 Step 4: Verify Deployment

### 4.1 Check Your Wix Site

1. Go to your Wix dashboard
2. Open your site editor
3. Verify that content has been updated
4. Check the live site: https://www.tnrbusinesssolutions.com

### 4.2 Test API Connection

```bash
npm run wix:test
```

This will test the connection to Wix APIs and verify authentication.

## 🔄 Step 5: Continuous Deployment

### 5.1 GitHub Actions Workflow

The repository includes a GitHub Actions workflow (`.github/workflows/deploy-to-wix.yml`) that:

- Triggers on every push to `main` branch
- Builds the website
- Deploys to Wix automatically
- Sends notifications on success/failure

### 5.2 Manual Deployment

You can also trigger deployment manually:

1. Go to GitHub repository
2. Click "Actions" tab
3. Select "Deploy to Wix" workflow
4. Click "Run workflow"

## 🛠️ Troubleshooting

### Common Issues

1. **Authentication Failed**

   - Verify your Client ID and Secret
   - Check if your app has the required permissions
   - Regenerate access token

2. **Deployment Failed**

   - Check GitHub Actions logs
   - Verify environment variables
   - Ensure site ID is correct

3. **Content Not Updated**
   - Check if Wix site is in published state
   - Verify API permissions
   - Check deployment logs

### Debug Commands

```bash
# Test authentication
npm run wix:auth

# Test API connection
npm run wix:test

# Full deployment with logs
npm run deploy:full
```

## 📞 Support

If you encounter issues:

1. Check the deployment logs in GitHub Actions
2. Verify your Wix app permissions
3. Test API connection locally
4. Contact Wix Developer Support if needed

## 🎯 Next Steps

After successful deployment:

1. **Monitor Performance**: Check site speed and SEO
2. **Update Content**: Use the deployment process for content updates
3. **Set up Monitoring**: Add error tracking and analytics
4. **Backup Strategy**: Ensure regular backups of your content

---

**🎉 Congratulations!** Your TNR Business Solutions website is now deployed to Wix with automated
GitHub integration.
