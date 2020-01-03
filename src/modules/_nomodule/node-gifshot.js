const puppeteer = eval('require')('puppeteer');

/**
 * @param {Object} options GIFShot options object
 * @param {Function} cb GIFShot callback
 * @returns {null}
 */
function nodejsGIFShot(options, cb) {

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
              ).then(obj => {
                browser.close().then(() => {
                  if (cb) cb(obj);
                });
              })
                .catch(e => console.log('Puppeteer error: ', e));
            });
        });
      });
    });
}

module.exports = nodejsGIFShot;