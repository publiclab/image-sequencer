const timeout = process.env.SLOWMO ? 30000 : 10000;

const fs = require('fs');

beforeAll(async () => {
  
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Clear and Delete Steps', () => {
  
  test('Resize Module is added', async () => {

    await page.waitForSelector('.step');
    const Length = await page.evaluate(() => document.querySelectorAll('.step').length);
    await page.click('[data-value=\'resize\']');
    const Length1 = await page.evaluate(() => document.querySelectorAll('.step').length);
    expect(Length).toBe(1);
    expect(Length1).toBe(2);
  }, timeout);

  test('Brightness Module is added', async () => {

    await page.click('[data-value=\'brightness\']');
    const Length2 = await page.evaluate(() => document.querySelectorAll('.step').length);
    expect(Length2).toBe(3);
  }, timeout);

  test('Contrast Module is added', async () => {

    await page.click('[data-value=\'contrast\']');
    const Length3 = await page.evaluate(() => document.querySelectorAll('.step').length);
    expect(Length3).toBe(4);
  }, timeout);

  test('Saturation Module is added', async () => {

    await page.click('[data-value=\'saturation\']');
    const Length4 = await page.evaluate(() => document.querySelectorAll('.step').length);
    expect(Length4).toBe(5);
  }, timeout);

  test('Rotate Module is added', async () => {

    await page.click('[data-value=\'rotate\']');
    const Length5 = await page.evaluate(() => document.querySelectorAll('.step').length);
    expect(Length5).toBe(6);
  }, timeout);

  test('Crop Module is added', async () => {

    await page.click('[data-value=\'crop\']');
    const Length6 = await page.evaluate(() => document.querySelectorAll('.step').length);
    expect(Length6).toBe(7);
  }, timeout);

  test('Delete step is pressed', async () => {

    await page.evaluate(() => { document.querySelectorAll('.remove')[1].click(); });
    const Length7 = await page.evaluate(() => document.querySelectorAll('.step').length);
    expect(Length7).toBe(6);
  }, timeout);

  test('Clear Step is pressed', async () => {

    page.on('dialog', async dialog => {
      (await dialog.accept());
    });
    await page.click('#resetButton');
    try {
      let someVar = await page.waitForSelector('.step');
      const Length8 = await page.evaluate(() => document.querySelectorAll('.step').length);
      expect(Length8).toBe(1);
    }
    catch (error) {
      console.log(error);
    }
  }, timeout);
});
    
    

    

    