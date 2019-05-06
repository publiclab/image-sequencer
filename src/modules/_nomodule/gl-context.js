module.exports = function runInBrowserContext(input, callback, step, options) {

    // to ignore this from getting browserified
    const puppeteer = eval('require')('puppeteer');

    //Stripped down version of options which is serializable
    var minOptions = require("lodash").cloneDeep(options);
    minOptions.step = options.step.name;

    var obj = { input: input, modOptions: minOptions }

    puppeteer.launch({headless: true, args:['--no-sandbox', '--disable-setuid-sandbox']}).then(function(browser) {
        browser.newPage().then(page => {
            /* Maybe there is a better way to this, loading the page coz localstorage API
            is not available otherwise */
            page.goto("https://google.com").then(() => {
                page.addScriptTag({ path: require('path').join(__dirname, '../../../dist/image-sequencer.js') }).then(() => {
                    page.evaluate((options) => {
                        return new Promise((resolve, reject) => {
                            var sequencer = ImageSequencer();
                            sequencer.loadImage(options.input.src);
                            sequencer.addSteps(options.modOptions.step, options.modOptions);
                            sequencer.run(function cb(out) {
                                resolve(sequencer.steps[1].output.src)
                            });
                        })
                    }, obj).then(el => {
                        browser.close().then(() => {
                            step.output = { src: el, format: input.format };
                            callback();
                        });
                    });
                })
            });
        });
    });
}
