var setUpCache = new require('../../../examples/lib/cache')();
var test = require('tape');

function SWInstallation(){
    return new Promise(() => {
      return setupCache();
    });
}

function UnRegisterSW(){

    function unregister() {
        return navigator.serviceWorker.getRegistrations()
        .then(function(registrations) {
            var unRegisteredWorker = registrations.map(function(registration) {
            return registration.unregister();
            });
            return Promise.all(unRegisteredWorker);
        });
    }
    
    return Promise.all([
        unregister(),
        setUpCache.clearCache()
    ]);
}  

test('Register service worker',function(t) {

    t.test('unregister service worker',function(st) {
      st.equal(UnRegisterSW(),true,'unregistered successfully and cleared the cache') 
    })

    t.test('install service worker',function(st) {
      st.equal(SWInstallation(),true,'successfully installed new service worker')
    });
});
