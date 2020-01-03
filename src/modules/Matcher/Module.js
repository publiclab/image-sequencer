/*
 * Match the images
 */
function Match(options, UI) {

  var output, points;

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

  global.XY = [
    options.imageX || defaults.imageX,
    options.imageY || defaults.imageY
  ];

  const core = require('matcher-core');

  core(function(err, out, code){
    points = JSON.parse(out.trim());
  });

  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function changePixel(r, g, b, a, x, y) {
      for(var i = 0; i < 500; i++){
        if(Math.abs(points[i].x - x) <= 10 && Math.abs(points[i].y - y) <= 10){
          return [0, 255, 0];
        }
      }
      return [r, g, b, a];
    }

    function output(image, datauri, mimetype) {

      step.output = { src: datauri, format: mimetype };

    }

    return input.pixelManipulation({
      output: output,
      changePixel: changePixel,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback,
      useWasm:options.useWasm
    });

  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
}

module.exports = Match;
