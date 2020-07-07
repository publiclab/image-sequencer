const timeout = 300000 ;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../examples/index.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
  await page.setViewport({ width: 1500, height: 700});
});
describe('Crop UI', ()=>{
  test('Crop UI', async()=>{
    // Wait for the load step to get loaded.
    await page.waitForSelector('.step');
    const Length = await page.evaluate(() => document.querySelectorAll('.step').length);
    // Click on the Crop step from radio-group.
    await page.click('[data-value=\'crop\']');
    const LengthChanged = await page.evaluate(() => document.querySelectorAll('.step').length);
    const src1 = await page.evaluate(() => document.querySelectorAll('.step img')[1].src);
    const example = await page.$$('img.step-thumbnail');
    /**
    * Drawing a bounding box around the image to be cropped.
    * box.x returns x position of mouse pointer.
    * box.y returns y position of mouse pointer.
    **/
    const box = await example[1].boundingBox();
    // Moving mouse pointer inside the the image.
    await page.mouse.move(box.x, box.y);
    await page.mouse.move(box.x + 50, box.y);
    await page.mouse.move(box.x + 50, box.y + 50);
    // Mouse.down() dispatches a mousedown event.
    await page.mouse.down();
    // Selecting area to be cropped.
    await page.mouse.move(box.x + 50, box.y + 200);
    await page.mouse.move(box.x + 200, box.y + 200);
    // Mouse.up() dispatches a mouseup event.
    await page.mouse.up();
    // Removing the crop step from the sequence.
    await page.click('.remove.btn-default');
    const Lengthremoved = await page.evaluate(() => document.querySelectorAll('.step').length);
    // Checking if we can select the crop step again or not.
    await page.click('[data-value=\'crop\']');
    const LengthReadded = await page.evaluate(() => document.querySelectorAll('.step').length);
    expect(Length).toBe(1);
    expect(LengthChanged).toBe(2);
    expect(Lengthremoved).toBe(1);
    expect(LengthReadded).toBe(2);
  }, timeout);
});