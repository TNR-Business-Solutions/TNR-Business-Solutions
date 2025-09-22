#!/usr/bin/env node

/**
 * TNR Business Solutions - Find Wix Site Info
 * Helps find the correct Site ID and collection names
 */

const { createClient, OAuthStrategy } = require('@wix/sdk');
const { items } = require('@wix/data');
const https = require('https');

async function getSitesList(accessToken) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.wixapis.com',
      port: 443,
      path: '/sites/v1/sites',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
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
          resolve(response);
        } catch (error) {
          reject(new Error('Failed to parse sites response: ' + error.message));
        }
      });
    });

    req.on('error', error => {
      reject(new Error('Sites request failed: ' + error.message));
    });

    req.end();
  });
}

async function findWixSiteInfo() {
  console.log('🔍 TNR Business Solutions - Find Wix Site Info');
  console.log('==============================================');

  const accessToken = 'vk2zUZNkmAEQNRQ';

  try {
    console.log('🔑 Using provided access token...');
    console.log('');

    // Get list of sites
    console.log('📋 Getting list of your Wix sites...');
    const sitesResponse = await getSitesList(accessToken);

    if (sitesResponse.sites && sitesResponse.sites.length > 0) {
      console.log(`✅ Found ${sitesResponse.sites.length} site(s):`);
      console.log('');

      sitesResponse.sites.forEach((site, index) => {
        console.log(`📁 Site ${index + 1}:`);
        console.log(`   Site ID: ${site.id}`);
        console.log(`   Site Name: ${site.displayName || 'N/A'}`);
        console.log(`   Site URL: ${site.url || 'N/A'}`);
        console.log(`   Status: ${site.status || 'N/A'}`);
        console.log(`   Created: ${site.createdDate || 'N/A'}`);
        console.log('');
      });

      // Test collections for each site
      for (const site of sitesResponse.sites) {
        console.log(
          `🔍 Testing collections for site: ${site.displayName || site.id}`
        );
        console.log('================================================');

        try {
          const myWixClient = createClient({
            modules: { items },
            auth: OAuthStrategy({
              clientId: 'd75d8823-b9f6-4edf-8b1a-458d4c94c54d',
              accessToken: accessToken,
            }),
            siteId: site.id,
            tenantId: '513afa1a-0480-4d84-9e79-f203d16800bb',
          });

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
                  `   Sample fields: ${Object.keys(
                    result.items[0].data || {}
                  ).join(', ')}`
                );
              }
            } catch (error) {
              // Silently skip not found collections
            }
          }

          if (availableCollections.length > 0) {
            console.log(
              `\n🎉 Found ${availableCollections.length} accessible collections in this site!`
            );
            console.log('Available collections:');
            availableCollections.forEach(collection => {
              console.log(
                `   📁 ${collection.name}: ${collection.itemCount} items`
              );
            });
            console.log('');
            console.log('🎯 This is likely your target site!');
            console.log(`   Site ID: ${site.id}`);
            console.log(`   Site Name: ${site.displayName || 'N/A'}`);
            console.log(`   Site URL: ${site.url || 'N/A'}`);
            break; // Stop after finding the first site with collections
          } else {
            console.log('❌ No accessible collections found in this site');
          }
        } catch (error) {
          console.log(`❌ Error testing site ${site.id}: ${error.message}`);
        }

        console.log('');
      }
    } else {
      console.log('❌ No sites found or error accessing sites');
      console.log('Response:', JSON.stringify(sitesResponse, null, 2));
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('1. Verify your access token is correct');
    console.log('2. Check if your app has the required permissions');
    console.log('3. Ensure your Wix account is accessible');
  }
}

// Run if called directly
if (require.main === module) {
  findWixSiteInfo()
    .then(() => {
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Failed:', error.message);
      process.exit(1);
    });
}

module.exports = { findWixSiteInfo };
