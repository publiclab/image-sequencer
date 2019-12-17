const timeout = process.env.SLOWMO ? 30000 : 10000;
const fs = require('fs');
beforeAll(async () => {

  await page.goto('file:///home/keshav/image-sequencer/examples/index.html', {waitUntil: 'domcontentloaded'});
});

describe('title of the page', () => {
  test('Title of the page', async () => {
    const title = await page.title();
    expect(title).toBe('Image Sequencer');
        
  }, timeout);
});
describe('Add step', () => {
  test('length is increased', async () => {
    	await page.waitForSelector('.step');
    const previousLength = await page.evaluate(() => document.querySelectorAll('.step').length);
    await page.click('[data-value=\'brightness\']');
    const previousLength1 = await page.evaluate(() => document.querySelectorAll('.step').length);
    console.log(previousLength);
    console.log(previousLength1);

    expect(previousLength).toBe(1);
    expect(previousLength1).toBe(2);
  }, timeout);
});