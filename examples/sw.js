const staticCacheName = 'image-sequencer-static-v3.7.1';
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      console.log('Attempting to install service worker');
      return cache.addAll([
        '/',
        '/examples/offline.html'
      ]);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('image-sequencer-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName){
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try to fetch the latest data first.
    fetch(event.request)
      .then(function(response) {
        return caches.open(staticCacheName)
          .then(function(cache) {
            if(event.request.method == 'GET'){
              cache.put(event.request.url, response.clone());
            }
            return response;
          });
      })
      .catch(function(err) {
      // Now the request has been failed so show cached data.
        return caches.match(event.request).then(function(res){
          if (res === undefined) {
            // Display offline page
            return caches.match('offline.html');
          }
          return res;
        });
      })
  );
});

// When the update modal sends a 'skipWaiting' message, call the skipWaiting method.
self.addEventListener('message', function(event) {
  if(event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
