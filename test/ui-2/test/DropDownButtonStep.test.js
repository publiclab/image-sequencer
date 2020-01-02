const timeout = process.env.SLOWMO ? 30000 : 10000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});
describe('Add step dropdown', ()=>{
  test('Click Button', async()=>{
    // Wait for .step to load
    await page.waitForSelector('.step');
    /// Get Length Of steps
    const Length = await page.evaluate(() => document.querySelectorAll('.step').length);

    // Wait for .selectize-input to load
    await page.waitForSelector('.selectize-input');
    // Click dropdown and select appropriate option. then submit
    await page.click('.selectize-input');
    await page.click('[data-value=\'blend\']');
    await page.waitForSelector('#add-step-btn');
    await page.click('#add-step-btn');
 
    // Get Changed Length
    const LengthChanged = await page.evaluate(() => document.querySelectorAll('.step').length);

    // Check If Image Of Step actually Changed
    await page.waitForSelector('.step img');
    const src1 = await page.evaluate(() => document.querySelectorAll('.step img')[0].src);
    const src2 = await page.evaluate(() => document.querySelectorAll('.step img')[1].src);
    expect(src1).not.toEqual(src2);
    
    expect(Length).toBe(1);
    expect(LengthChanged).toBe(2);

  }, timeout);
});
