const parseCornerCoordinateInputs = require('../../util/ParseInputCoordinates'),
  getPixels = require('get-pixels');
module.exports = function Crop(pixels, options, input, cb) {
  

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  options.x = options.x || defaults.x;
  options.y = options.y || defaults.y;

  options.w = options.w || defaults.w;
  options.h = options.h || defaults.h;

  let iw = pixels.shape[0], // Width of Original Image
    ih = pixels.shape[1], // Height of Original Image
    offsetX,
    offsetY,
    w,
    h;

  // Parse the inputs
  const { coord } = parseCornerCoordinateInputs(
    { iw, ih },
    {
      x: { valInp: options.x, type: 'horizontal' },
      y: { valInp: options.y, type: 'vertical' },
      w: { valInp: options.w, type: 'horizontal' },
      h: { valInp: options.h, type: 'vertical' }
    },
    function(opt, coord) {}
  );
  offsetX = Math.floor(coord.x.valInp);
  offsetY = Math.floor(coord.y.valInp);
  w = Math.floor(coord.w.valInp);
  h = Math.floor(coord.h.valInp);

  const getDataUri = require('../../util/getDataUri');
  getDataUri(pixels, input.format).then(dataUri => {
    getPixels(dataUri, (err, pix) => {
      if (err) console.log('get-pixels error: ', err);

      const { createCanvas, createImageData } = require('canvas');

      const canvas = createCanvas(w, h);

      const ctx = canvas.getContext('2d');
      ctx.putImageData(
        new createImageData(
          new Uint8ClampedArray(pix.data),
          pix.shape[0],
          pix.shape[1]
        ),
        -offsetX,
        -offsetY
      );

      getPixels(canvas.toDataURL(), (err, newPix) => {
        if (err) console.log('get-pixels error: ', err);

        pixels.data = newPix.data;
        pixels.shape = newPix.shape;
        pixels.stride = newPix.stride;

        if(cb) cb();
      });
    });
  });
};
