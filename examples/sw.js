const staticCacheName = 'image-sequencer-static-v3.5.0';
// const versionManagement = require('./lib/versionManagement.js');
self.addEventListener('install', event => {
  console.log('Attempting to install service worker');
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  // let localVersionNumber = versionManagement.getLocalVersionNumber();
  // staticCacheName += localVersionNumber;
  //
  // versionManagement.getLatestVersionNumber(function(latestVersionNumber) {
  //   if(versionManagement.versionCompare(localVersionNumber, latestVersionNumber) < 0) {
  //     //the local version is out of date, fetch a new version
  //     console.log("The current version of image sequencer is out of date.");
  //   } else {
  //     console.log("The current version of image sequencer is up to date.");
  //   }
  // });

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
    caches.open(staticCacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          if(event.request.method == 'GET')
            cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('message', function(event) {
  if(event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
