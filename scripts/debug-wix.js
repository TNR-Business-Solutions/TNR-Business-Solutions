#!/usr/bin/env node

/**
 * Debug Wix API connection
 */

const { createClient, OAuthStrategy } = require('@wix/sdk');
const { items } = require('@wix/data');

async function debugWix() {
  console.log('🔍 Debugging Wix API connection...');

  const clientId = 'd75d8823-b9f6-4edf-8b1a-458d4c94c54d';
  const accessToken = 'vk2zUZNkmAEQNRQ';
  const siteId = '4483f29d-f541-486b-ae48-64f09aaa56b3';
  const tenantId = '513afa1a-0480-4d84-9e79-f203d16800bb';

  try {
    console.log('🔧 Creating Wix client...');
    const wixClient = createClient({
      modules: { items },
      auth: OAuthStrategy({
        clientId: clientId,
        accessToken: accessToken,
      }),
      siteId: siteId,
      tenantId: tenantId,
    });
    console.log('✅ Wix client created successfully');

    console.log('🔍 Testing with different collection names...');

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

    for (const collectionName of testCollections) {
      try {
        console.log(`🔍 Testing collection: "${collectionName}"`);
        const result = await wixClient.items
          .query({ dataCollectionId: collectionName })
          .find();
        console.log(
          `✅ Found collection: ${collectionName} (${result.items.length} items)`
        );

        if (result.items.length > 0) {
          console.log(
            `   Sample item fields: ${Object.keys(
              result.items[0].data || {}
            ).join(', ')}`
          );
        }
        break; // Stop after finding the first working collection
      } catch (error) {
        console.log(
          `❌ Collection "${collectionName}" not found: ${error.message}`
        );
      }
    }
  } catch (error) {
    console.error(`❌ Debug failed: ${error.message}`);
    console.error('Stack trace:', error.stack);
  }
}

debugWix()
  .then(() => {
    console.log('🔍 Debug complete');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Debug failed:', error.message);
    process.exit(1);
  });
