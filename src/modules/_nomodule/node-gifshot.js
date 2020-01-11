/**
 * @param {Object} options GIFShot options object
 * @param {Function} cb GIFShot callback
 * @returns {null}
 */
function nodejsGIFShot(options, cb) {
  const puppeteer = eval('require')('puppeteer');
  puppeteer.launch(
    {
      headless: true,
      args:['--no-sandbox', '--disable-setuid-sandbox']
    }
  )
    .then(browser => {
      browser.newPage().then(page => {
        page.goto('about:blank').then(() => {

          page.addScriptTag({ path: require('path').join(__dirname, '../../../node_modules/gifshot/dist/gifshot.min.js') })
            .then(() => {
              page.evaluate(options => {
                return new Promise(resolve => {
                  gifshot.createGIF(options, resolve);
                });
              },
              options
              )
                .then(obj => {
                  browser.close().then(() => {
                    if (cb) cb(obj);
                  });
                })
                .catch(e => {
                  console.log('Puppeteer error: ', e);
                  browser.close().then(() => {
                    if (cb) cb({
                      error: true,
                      errorMsg: e
                    });
                  });
                });
            });
        });
      });
    });
}

module.exports = nodejsGIFShot;