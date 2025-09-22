
    // TNR Business Solutions Service Worker
    const CACHE_NAME = 'tnr-business-v2';
    const urlsToCache = [
      'index.html',
      'assets/styles.css',
      'assets/standalone-chatbot.js',
      'media/logo.png'
    ];

    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => {
            // Add files one by one to handle individual failures gracefully
            return Promise.allSettled(
              urlsToCache.map(url => cache.add(url).catch(err => {
                console.log(`Failed to cache ${url}:`, err);
                return null; // Don't fail the entire cache operation
              }))
            );
          })
      );
    });

    self.addEventListener('fetch', event => {
      event.respondWith(
        caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    });
    