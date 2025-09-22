#!/usr/bin/env node

/**
 * TNR Business Solutions - Wix CLI Deployment
 * Uses Wix CLI for automated deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class WixCLIDeployer {
  constructor() {
    this.projectRoot = process.cwd();
    this.distDir = path.join(this.projectRoot, 'dist');
    this.previewDir = path.join(this.distDir, 'preview');
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const icons = {
      info: '📝',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      deploy: '🚀',
      cli: '💻',
    };
    console.log(`${icons[type] || '📝'} [${timestamp}] ${message}`);
  }

  async checkWixCLI() {
    try {
      this.log('Checking Wix CLI installation...', 'cli');
      execSync('wix --version', { stdio: 'pipe' });
      this.log('✅ Wix CLI is installed', 'success');
      return true;
    } catch (error) {
      this.log('❌ Wix CLI not found. Installing...', 'error');
      try {
        execSync('npm install -g @wix/cli', { stdio: 'inherit' });
        this.log('✅ Wix CLI installed successfully', 'success');
        return true;
      } catch (installError) {
        this.log(`❌ Failed to install Wix CLI: ${installError.message}`, 'error');
        return false;
      }
    }
  }

  async authenticateWixCLI() {
    try {
      this.log('Authenticating with Wix CLI...', 'cli');
      
      // Set up authentication using the access token
      const authCommand = `wix auth --api-key vk2zUZNkmAEQNRQ`;
      execSync(authCommand, { stdio: 'inherit' });
      
      this.log('✅ Wix CLI authenticated successfully', 'success');
      return true;
    } catch (error) {
      this.log(`❌ Failed to authenticate Wix CLI: ${error.message}`, 'error');
      return false;
    }
  }

  async createWixProject() {
    try {
      this.log('Setting up Wix project...', 'cli');
      
      // Create a wix.config.json if it doesn't exist
      const wixConfig = {
        "siteId": "4483f29d-f541-486b-ae48-64f09aaa56b3",
        "tenantId": "513afa1a-0480-4d84-9e79-f203d16800bb",
        "clientId": "d75d8823-b9f6-4edf-8b1a-458d4c94c54d"
      };

      const configPath = path.join(this.projectRoot, 'wix.config.json');
      if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify(wixConfig, null, 2));
        this.log('✅ Wix config created', 'success');
      }

      return true;
    } catch (error) {
      this.log(`❌ Failed to create Wix project: ${error.message}`, 'error');
      return false;
    }
  }

  async deployToWix() {
    try {
      this.log('Deploying to Wix...', 'deploy');
      
      // Use Wix CLI to deploy
      const deployCommand = `wix deploy --site-id 4483f29d-f541-486b-ae48-64f09aaa56b3`;
      execSync(deployCommand, { stdio: 'inherit', cwd: this.projectRoot });
      
      this.log('✅ Deployment completed successfully', 'success');
      return true;
    } catch (error) {
      this.log(`❌ Deployment failed: ${error.message}`, 'error');
      return false;
    }
  }

  async generateWixContent() {
    try {
      this.log('Generating Wix-compatible content...', 'deploy');
      
      // Create a simple HTML file that Wix can import
      const homepagePath = path.join(this.previewDir, 'index.html');
      if (!fs.existsSync(homepagePath)) {
        this.log('❌ Homepage not found. Run build first.', 'error');
        return false;
      }

      const homepageContent = fs.readFileSync(homepagePath, 'utf8');
      
      // Create a Wix-compatible content file
      const wixContent = {
        site: {
          title: "TNR Business Solutions",
          description: "Professional digital marketing and insurance services for small businesses in Greensburg, PA",
          url: "https://www.tnrbusinesssolutions.com"
        },
        pages: [
          {
            id: "homepage",
            title: "Home",
            content: this.extractTextContent(homepageContent),
            seo: {
              title: this.extractTitle(homepageContent),
              description: this.extractDescription(homepageContent)
            }
          }
        ],
        lastUpdated: new Date().toISOString()
      };

      const contentPath = path.join(this.projectRoot, 'wix-content.json');
      fs.writeFileSync(contentPath, JSON.stringify(wixContent, null, 2));
      
      this.log('✅ Wix content generated', 'success');
      return true;
    } catch (error) {
      this.log(`❌ Failed to generate content: ${error.message}`, 'error');
      return false;
    }
  }

  extractTextContent(htmlContent) {
    // Remove HTML tags and extract text content
    return htmlContent
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<style[^>]*>.*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  extractTitle(htmlContent) {
    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
    return titleMatch ? titleMatch[1] : 'TNR Business Solutions';
  }

  extractDescription(htmlContent) {
    const descriptionMatch = htmlContent.match(/<meta name="description" content="(.*?)"/);
    return descriptionMatch ? descriptionMatch[1] : 'Professional digital marketing and insurance services';
  }

  async deployAllContent() {
    this.log('🚀 TNR Business Solutions - Wix CLI Deployment', 'deploy');
    this.log('==============================================', 'deploy');

    // Check Wix CLI
    const cliReady = await this.checkWixCLI();
    if (!cliReady) {
      return false;
    }

    // Authenticate
    const authSuccess = await this.authenticateWixCLI();
    if (!authSuccess) {
      return false;
    }

    // Create project
    const projectReady = await this.createWixProject();
    if (!projectReady) {
      return false;
    }

    // Generate content
    const contentReady = await this.generateWixContent();
    if (!contentReady) {
      return false;
    }

    // Deploy
    const deploySuccess = await this.deployToWix();

    if (deploySuccess) {
      this.log('🎉 Wix CLI deployment completed successfully!', 'success');
      this.log('🌐 Your site is now updated and live!', 'success');
      this.log('🔗 Editor: https://editor.wix.com/html/editor/web/renderer/edit/02850de4-e269-47bb-8510-343adc4469ee?metaSiteId=4483f29d-f541-486b-ae48-64f09aaa56b3', 'info');
      return true;
    } else {
      this.log('❌ Wix CLI deployment failed', 'error');
      return false;
    }
  }
}

// Run deployment if called directly
if (require.main === module) {
  const deployer = new WixCLIDeployer();
  deployer.deployAllContent()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Deployment failed:', error.message);
      process.exit(1);
    });
}

module.exports = { WixCLIDeployer };
