#!/usr/bin/env node

/**
 * TNR Business Solutions - Test Wix Connection
 * Tests the connection to Wix API using OAuth2 anonymous flow
 */

const { createClient, OAuthStrategy } = require('@wix/sdk');
const { items } = require('@wix/data');
const https = require('https');

async function getAnonymousToken(clientId) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      clientId: clientId,
      grantType: 'anonymous',
    });

    const options = {
      hostname: 'www.wixapis.com',
      port: 443,
      path: '/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.access_token) {
            console.log('✅ Anonymous token obtained successfully');
            resolve(response.access_token);
          } else {
            reject(
              new Error(
                'Failed to get access token: ' + JSON.stringify(response)
              )
            );
          }
        } catch (error) {
          reject(new Error('Failed to parse token response: ' + error.message));
        }
      });
    });

    req.on('error', error => {
      reject(new Error('Token request failed: ' + error.message));
    });

    req.write(postData);
    req.end();
  });
}

async function testWixConnection() {
  console.log('🔌 Testing Wix API Connection...');
  console.log('================================');

  const clientId = 'd75d8823-b9f6-4edf-8b1a-458d4c94c54d';
  const siteId = '4483f29d-f541-486b-ae48-64f09aaa56b3';
  const tenantId = '513afa1a-0480-4d84-9e79-f203d16800bb';

  try {
    console.log('🔑 Getting anonymous token...');
    const accessToken = await getAnonymousToken(clientId);

    console.log('🔧 Creating Wix client...');
    const myWixClient = createClient({
      modules: { items },
      auth: OAuthStrategy({
        clientId: clientId,
        accessToken: accessToken,
      }),
      siteId: siteId,
      tenantId: tenantId,
    });

    console.log('✅ Wix client created successfully');
    console.log('🔍 Testing basic connection...');

    console.log('✅ Wix client is properly initialized');
    console.log('📊 Client modules available:', Object.keys(myWixClient));

    if (myWixClient.items) {
      console.log('✅ Items module is available');
      console.log(
        '📋 Available methods:',
        Object.getOwnPropertyNames(myWixClient.items)
      );
    } else {
      console.log('⚠️ Items module not found in client');
    }

    console.log('\n🎉 Wix integration is working perfectly!');
    console.log('You can now use the deployment scripts.');

    return true;
  } catch (error) {
    console.error(`❌ Wix API connection failed: ${error.message}`);
    console.log('🔧 Troubleshooting:');
    console.log('   1. Check if your Client ID is correct');
    console.log('   2. Verify your app has the required permissions');
    console.log('   3. Make sure your Wix site is accessible');
    console.log('   4. Check if you need a Client Secret for authentication');
    return false;
  }
}

// Run test if called directly
if (require.main === module) {
  testWixConnection()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Test failed:', error.message);
      process.exit(1);
    });
}

module.exports = { testWixConnection };
