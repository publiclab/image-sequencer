const timeout = 300000 ;
const fs = require('fs');
//const {installMouseHelper} = require('./install-mouse-helper');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
  await page.setViewport({ width: 1500, height: 700});
  //await installMouseHelper(page);
});
describe('Crop UI', ()=>{
  test('Crop UI', async()=>{
    await page.waitForSelector('.step');
    const Length = await page.evaluate(() => document.querySelectorAll('.step').length);
    await page.click('[data-value=\'crop\']');
    const LengthChanged = await page.evaluate(() => document.querySelectorAll('.step').length);
    const src1 = await page.evaluate(() => document.querySelectorAll('.step img')[1].src);
    await page.screenshot({ path: 'buddy-screenshot.png'});
    const example = await page.$$('img.step-thumbnail');
    const box = await example[1].boundingBox();
    await page.mouse.move(box.x, box.y);
    await page.mouse.move(box.x + 50, box.y);
    await page.mouse.move(box.x + 50, box.y + 50);
    await page.mouse.down();
    await page.mouse.move(box.x + 50, box.y + 200);
    await page.mouse.move(box.x + 200, box.y + 200);
    await page.mouse.up();
    await page.click('.remove.btn-default');
    const Lengthremoved = await page.evaluate(() => document.querySelectorAll('.step').length);
    await page.click('[data-value=\'crop\']');
    const LengthReadded = await page.evaluate(() => document.querySelectorAll('.step').length);
    expect(Length).toBe(1);
    expect(LengthChanged).toBe(2);
    expect(Lengthremoved).toBe(1);
    expect(LengthReadded).toBe(2);
  }, timeout);
});