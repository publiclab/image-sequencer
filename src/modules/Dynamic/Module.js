module.exports = function Dynamic(options, UI) {

  var output;

  // This function is called on every draw.
  function draw(input, callback, progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    // start with monochrome, but if options.red, options.green, and options.blue are set, accept them too
    options.monochrome = options.monochrome || '(R+G+B)/3';

    function generator(expression) {
      var func = 'f = function (r, g, b, a) { var R = r, G = g, B = b, A = a;';
      func = func + 'return ';
      func = func + expression + '}';
      var f;
      eval(func);
      return f;
    }

    var channels = ['red', 'green', 'blue', 'alpha'];

    channels.forEach(function(channel) {
      if (options.hasOwnProperty(channel)) options[channel + '_function'] = generator(options[channel]);
      else if (channel === 'alpha') options['alpha_function'] = function() { return 255; };
      else options[channel + '_function'] = generator(options.monochrome);
    });

    function changePixel(r, g, b, a) {

      /* neighbourpixels can be calculated by
       this.getNeighbourPixel.fun(x,y)  or this.getNeighborPixel.fun(x,y)
       */
      var combined = (r + g + b) / 3.000;
      return [
        options.red_function(r, g, b, a),
        options.green_function(r, g, b, a),
        options.blue_function(r, g, b, a),
        options.alpha_function(r, g, b, a),
      ];
    }

    /* Functions to get the neighbouring pixel by position (x,y) */
    function getNeighbourPixel(pixels, curX, curY, distX, distY) {
      return [
        pixels.get(curX + distX, curY + distY, 0),
        pixels.get(curX + distX, curY + distY, 1),
        pixels.get(curX + distX, curY + distY, 2),
        pixels.get(curX + distX, curY + distY, 3)
      ];
    }

    // via P5js: https://github.com/processing/p5.js/blob/2920492842aae9a8bf1a779916893ac19d65cd38/src/math/calculation.js#L461-L472
    function map(n, start1, stop1, start2, stop2, withinBounds) {
      var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
      if (!withinBounds) {
        return newval;
      }
      // also via P5js: https://github.com/processing/p5.js/blob/2920492842aae9a8bf1a779916893ac19d65cd38/src/math/calculation.js#L116-L119
      function constrain(n, low, high) {
        return Math.max(Math.min(n, high), low);
      }
      if (start2 < stop2) {
        return constrain(newval, start2, stop2);
      } else {
        return constrain(newval, stop2, start2);
      }
    }

    function output(image, datauri, mimetype) {

      // This output is accessible by Image Sequencer
      step.output = { src: datauri, format: mimetype };

    }
    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      ui: options.step.ui,
      changePixel: changePixel,
      getNeighbourPixel: getNeighbourPixel,
      getNeighborPixel: getNeighbourPixel,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback
    });

  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
