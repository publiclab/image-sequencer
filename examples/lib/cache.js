var setupCache = function() {
  let newWorker; // When sw.js is changed, this is the new service worker generated.

  // Toggle a CSS class to display a popup prompting the user to fetch a new version.
  function showUpdateModal() {
    $('#update-prompt-modal').addClass('show');
  }

  /**
  * When a new service worker has been loaded, the button in the update prompt
  * modal should trigger the skipWaiting event to replace the current
  * service worker with the new one.
  */
  $('#reload').on('click', function() {
    newWorker.postMessage({ action: 'skipWaiting' });
  });

  if ('serviceWorker' in navigator) {
    // Register the service worker.
    navigator.serviceWorker.register('sw.js', { scope: '/examples/' })
      .then(function(registration) {
        registration.addEventListener('updatefound', () => {
          // When sw.js has been changed, get a reference to the new service worker.
          newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            // Check if service worker state has changed.
            switch(newWorker.state) {
              case 'installed':
                if(navigator.serviceWorker.controller) {
                  // New service worker available; prompt the user to update.
                  showUpdateModal();
                }
                // No updates available; do nothing.
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

      /**
      * This is the event listener for when the service worker updates.
      * When the service worker updates, reload the page.
      */
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
