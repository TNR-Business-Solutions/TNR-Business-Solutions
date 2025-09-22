#!/usr/bin/env node

/**
 * TNR Business Solutions - Diagnose Wix Setup
 * Comprehensive diagnosis of Wix API access and permissions
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

async function diagnoseWixSetup() {
  console.log('🔍 TNR Business Solutions - Wix Setup Diagnosis');
  console.log('===============================================');

  const clientId = 'd75d8823-b9f6-4edf-8b1a-458d4c94c54d';
  const siteId = '4483f29d-f541-486b-ae48-64f09aaa56b3';
  const tenantId = '513afa1a-0480-4d84-9e79-f203d16800bb';

  console.log('📋 Configuration:');
  console.log(`   Client ID: ${clientId}`);
  console.log(`   Site ID: ${siteId}`);
  console.log(`   Tenant ID: ${tenantId}`);
  console.log('');

  try {
    console.log('🔑 Using provided access token...');
    const accessToken = 'vk2zUZNkmAEQNRQ';

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
    console.log('');

    // Test basic API access
    console.log('🧪 Testing API Access...');
    console.log('========================');

    try {
      // Try to get site information
      console.log('🔍 Testing site access...');
      const siteInfo = await myWixClient.fetch(
        'https://www.wixapis.com/site/v1/site'
      );
      console.log('✅ Site API accessible');
    } catch (error) {
      console.log(`❌ Site API error: ${error.message}`);
    }

    // Test data collections with different approaches
    console.log('');
    console.log('📊 Testing Data Collections...');
    console.log('==============================');

    const testCollections = [
      'Import 1',
      'Import 2',
      'Pages',
      'Content',
      'Blog',
      'Products',
      'Members',
      'Forms',
      'Events',
      'Bookings',
      'SEO',
      'Settings',
      'Site',
      'MyCollection',
      'Data',
      'WebsiteContent',
      'SiteContent',
      'Collection1',
      'Collection2',
      'TestCollection',
    ];

    const availableCollections = [];

    for (const collectionName of testCollections) {
      try {
        console.log(`🔍 Testing: ${collectionName}`);
        const result = await myWixClient.items
          .query({
            dataCollectionId: collectionName,
          })
          .find();

        console.log(
          `✅ Found: ${collectionName} (${result.items.length} items)`
        );
        availableCollections.push({
          name: collectionName,
          itemCount: result.items.length,
          sampleItem: result.items[0] || null,
        });

        // Show sample data structure
        if (result.items.length > 0) {
          console.log(
            `   Sample fields: ${Object.keys(result.items[0].data || {}).join(
              ', '
            )}`
          );
        }
      } catch (error) {
        console.log(`❌ Not found: ${collectionName}`);
      }
    }

    console.log('');
    console.log('📋 Diagnosis Results:');
    console.log('=====================');

    if (availableCollections.length > 0) {
      console.log(
        `✅ Found ${availableCollections.length} accessible collections:`
      );
      availableCollections.forEach(collection => {
        console.log(`   📁 ${collection.name}: ${collection.itemCount} items`);
      });

      console.log('');
      console.log('🎯 Next Steps:');
      console.log('1. Use the available collections for deployment');
      console.log('2. Update the deployment script to use these collections');
      console.log('3. Deploy your content to these collections');
    } else {
      console.log('❌ No accessible data collections found');
      console.log('');
      console.log('🔧 Possible Solutions:');
      console.log('1. Check if your collections are in a different Wix site');
      console.log('2. Verify the Site ID matches your actual Wix site');
      console.log('3. Check if collections need different permissions');
      console.log('4. Use the manual content generation approach instead');
      console.log('');
      console.log('💡 Recommended Action:');
      console.log('Use the manual content generation approach:');
      console.log('   node scripts/generate-wix-content.js');
      console.log('   Then manually copy content to your Wix site');
    }

    return availableCollections;
  } catch (error) {
    console.error(`❌ Diagnosis failed: ${error.message}`);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('1. Verify your Client ID is correct');
    console.log('2. Check if your app has the required permissions');
    console.log('3. Ensure your Wix site is accessible');
    console.log('4. Try using the manual content generation approach');
    return [];
  }
}

// Run diagnosis if called directly
if (require.main === module) {
  diagnoseWixSetup()
    .then(collections => {
      console.log(
        `\n🎉 Diagnosis complete! Found ${collections.length} collections`
      );
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Diagnosis failed:', error.message);
      process.exit(1);
    });
}

module.exports = { diagnoseWixSetup };
