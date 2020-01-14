const timeout = process.env.SLOWMO ? 30000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Color Picker', () => {
  test('Color Picker is not breaking other input fields', async () => {
    await page.waitForSelector('.step');
    await page.click('[data-value=\'crop\']');
    await page.waitForSelector('#color-picker');
    await page.click('#color-picker span.input-group-addon');
    try {
      await page.waitForSelector('.colorpicker');
    } catch (error) {
      console.log('The ColorPicker didn\'t appear.');
    }
    await page.click('input[name=h]', { clickCount: 3 });
    await page.type('input[name=h]', '100');
    const heightInput = await page.evaluate(() => document.querySelector('input[name=h]').value);

    expect(heightInput).toEqual('100');

  }, timeout);
});