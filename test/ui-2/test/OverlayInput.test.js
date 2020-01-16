const timeout = process.env.SLOWMO ? 30000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Overlay Ranged input', () => {
  test('Overlay Ranged input is working properly', async () => {
    // Wait for .step to load
    await page.waitForSelector('.step');
    try {
      // Click and select step input field.
      await page.click('input[type=select-one]');
      // Select Overlay module.
      await page.click('[data-value=\'overlay\']');

      // Click the Add step button.
      await page.waitForSelector('#add-step-btn');
      await page.click('#add-step-btn');

      // Check to see if Overlay ranged input is present.
      await page.waitForSelector('input[type=range]');

      // Get the value of ranged input of First Overlay Step.
      const rangeValue = await page.evaluate(() => document.querySelectorAll('input[type=range]')[0].value);
      expect(rangeValue).toEqual('-1');

      // Again click #add-step to add second Overlay step.
      await page.click('[data-value=\'overlay\']');
      await page.waitForSelector('#add-step-btn');
      await page.click('#add-step-btn');

      // Check to see if Second Overlay ranged input is present.
      await page.waitForSelector('input[type=range]');
      // Get the value of ranged input of second Overlay Step.
      const rangeValueAfter = await page.evaluate(() => document.querySelectorAll('input[type=range]')[1].value);

      // Check if second Overlay ranged input has value -2.
      expect(rangeValueAfter).toEqual('-2');
    } catch (error) {
      console.log(error);
    }
   
  }, timeout);
});