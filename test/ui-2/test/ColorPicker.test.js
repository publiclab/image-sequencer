const timeout = process.env.SLOWMO ? 30000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Color Picker', () => {
  test('Color Picker is not breaking other input fields', async () => {
    // Wait for .step to load
    await page.waitForSelector('.step');
    // Click and select crop step
    await page.click('[data-value=\'crop\']');
    // Check to see of color picker input is present
    await page.waitForSelector('#color-picker');
    // Click color picker input
    await page.click('#color-picker span.input-group-addon');

    try {
      // Wait to see if colorpicker dialog is appearing
      await page.waitForSelector('.colorpicker');
    } catch (error) {
      // If colorpicker dialog didn't appear display error
      console.log('The ColorPicker didn\'t appear.', error);
    }
    // Click height input of crop 3 times to select whole text in it
    await page.click('input[name=h]', { clickCount: 3 });
    // Type its value to 100
    await page.type('input[name=h]', '100');
    // Evaluate input value of height input of crop
    const heightInput = await page.evaluate(() => document.querySelector('input[name=h]').value);
    // Check if value is changed or not
    expect(heightInput).toEqual('100');

  }, timeout);
});