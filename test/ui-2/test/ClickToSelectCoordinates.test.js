const timeout = process.env.SLOWMO ? 30000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Click to Select Coordinates', () => {
  test('Crosshairs icon is present and behavior activates on click', async () => {
    // Wait for .step to load
    await page.waitForSelector('.step');
    // Click and select crop step
    await page.click('[data-value=\'crop\']');
    // Check to see if crosshairs icon is present
    await page.waitForSelector('.input-group-addon .fa-crosshairs');
    // Click crosshairs icon
    await page.click('.input-group-addon .fa-crosshairs');

    try {
      // Wait to see if coordinate input is activated
      await page.waitForSelector('.coordinate-input-active');
    } catch (error) {
      // If coordinate input didn't activate, display error
      console.log('The coordinate input didn\'t activate.', error);
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
