#!/usr/bin/env node

/**
 * TNR Business Solutions - Check Wix Collections
 * Lists available data collections in your Wix site
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

async function checkWixCollections() {
  console.log('🔍 Checking Wix Data Collections...');
  console.log('====================================');

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
    console.log('🔍 Checking available data collections...');

    // Common collection names to try
    const commonCollections = [
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
      'Pages/Content',
      'SEO/Schemas',
      'Site/Settings',
      'MyCollection',
      'Data',
      'WebsiteContent',
      'SiteContent',
    ];

    const availableCollections = [];

    for (const collectionName of commonCollections) {
      try {
        console.log(`🔍 Checking collection: ${collectionName}`);
        const result = await myWixClient.items
          .query({
            dataCollectionId: collectionName,
          })
          .find();

        console.log(
          `✅ Found collection: ${collectionName} (${result.items.length} items)`
        );
        availableCollections.push({
          name: collectionName,
          itemCount: result.items.length,
          sampleItem: result.items[0] || null,
        });
      } catch (error) {
        console.log(`❌ Collection not found: ${collectionName}`);
      }
    }

    console.log('\n📊 Available Collections Summary:');
    console.log('==================================');

    if (availableCollections.length > 0) {
      availableCollections.forEach(collection => {
        console.log(`📁 ${collection.name}: ${collection.itemCount} items`);
        if (collection.sampleItem) {
          console.log(
            `   Sample fields: ${Object.keys(
              collection.sampleItem.data || {}
            ).join(', ')}`
          );
        }
      });
    } else {
      console.log('❌ No accessible data collections found');
      console.log(
        '💡 You may need to create data collections in your Wix site first'
      );
    }

    return availableCollections;
  } catch (error) {
    console.error(`❌ Error checking collections: ${error.message}`);
    return [];
  }
}

// Run check if called directly
if (require.main === module) {
  checkWixCollections()
    .then(collections => {
      console.log(`\n🎉 Found ${collections.length} accessible collections`);
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Check failed:', error.message);
      process.exit(1);
    });
}

module.exports = { checkWixCollections };
