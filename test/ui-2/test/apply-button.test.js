const timeout = process.env.SLOWMO ? 30000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('Apply Button Works', () => {
  test('Apply Button is clicked', async () => {
    await page.waitForSelector('.step');

  
    await page.click('[data-value=\'resize\']');
    const Length1 = await page.evaluate(() => document.querySelectorAll('.step').length);
    //Lets change the default value
    expect(Length1).toBe(2);
    // Let's check the source of the image output by the default values
    const src1 = await page.evaluate(() => document.querySelectorAll('.step img')[1].src);
    //Lets change the default value
    await page.evaluate(() => document.querySelector('div[name="resize"] input').value = '');
    await page.type('div[name="resize"] input', '50%');
    //Wait for the apply button to get enabled then click
    await page.waitForFunction('document.querySelector(".btn-save").disabled == false');
    await page.$eval('.btn-save', elem => elem.click());
    //Wait for the image to process with the new value
    await page.waitForSelector('.load', {visible: false});
    
    //Let's check the source of the image output by the new values
    const src2 = await page.evaluate(() => document.querySelectorAll('.step img')[1].src);
    //Expect default and new image to be changed
    expect(src1).not.toEqual(src2);
    
    
  }, timeout);
});