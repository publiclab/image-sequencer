var setupCache = function() {
  let newWorker;

  function showUpdateModal() {
    $('#update-prompt-modal').addClass('show');
  }

  $('#reload').on('click', function() {
    newWorker.postMessage({ action: 'skipWaiting' });
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/examples/' })
      .then(function(registration) {
        registration.addEventListener('updatefound', () => {
          newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            switch(newWorker.state) {
              case 'installed':
                if(navigator.serviceWorker.controller) {
                  // New update available.
                  showUpdateModal();
                }
                // No updates available.
                break;
            }
          });
        });

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

      let refreshing;
      navigator.serviceWorker.addEventListener('controllerchange', function() {
        if(refreshing) return;
        window.location.reload();
        refreshing = true;
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
