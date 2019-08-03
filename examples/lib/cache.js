var setupCache = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/examples/' })
      .then(function(registration) {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          console.log(installingWorker);
          if (installingWorker.state === 'installed') {
            location.reload();
          }
        };
        console.log('Registration successful, scope is:', registration.scope);
      })
      .catch(function(error) {
        console.log('Service worker registration failed, error:', error);
      });
  }

  if ('serviceWorker' in navigator) {
    caches.keys().then(function(cacheNames) {
      cacheNames.forEach(function(cacheName) {
        $('#clear-cache').append(' ' + cacheName);
      });
    });
  }

  $('#clear-cache').click(function() {
    if ('serviceWorker' in navigator) {
      caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
          caches.delete(cacheName);
        });
      });
    }
    location.reload();
  });
};

module.exports = setupCache;
