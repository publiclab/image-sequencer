module.exports = function Dynamic(options,UI) {

  options = options || {};
  options.title = "Dynamic";

  // Tell the UI that a step has been set up.
  UI.onSetup(options.step);
  var output;

  // This function is called on every draw.
  function draw(input,callback) {

    // Tell the UI that the step is being drawn
    UI.onDraw(options.step);
    var step = this;

    // start with monochrome, but if options.red, options.green, and options.blue are set, accept them too
    options.monochrome = options.monochrome || "(R+G+B)/3";

    function generator(expression) {
      var func = 'f = function (r, g, b, a) { var R = r, G = g, B = b, A = a;'
      func = func + 'return ';
      func = func + expression + '}';
      var f;
      eval(func);
      return f;
    }

    var channels = ['red', 'green', 'blue', 'alpha'];

    channels.forEach(function(channel) {
      if (options.hasOwnProperty(channel)) options[channel + '_function'] = generator(options[channel]);
      else if (channel === 'alpha')        options['alpha_function'] = function() { return 255; }
      else                                 options[channel + '_function'] = generator(options.monochrome);
    });

    function changePixel(r, g, b, a) {
      var combined = (r + g + b) / 3.000;
      return [
        options.red_function(  r, g, b, a),
        options.green_function(r, g, b, a),
        options.blue_function( r, g, b, a),
        options.alpha_function(r, g, b, a),
      ];
    }

    function output(image,datauri,mimetype){

      // This output is accessible by Image Sequencer
      step.output = { src: datauri, format: mimetype };

      // This output is accessible by the UI
      options.step.output = datauri;

      // Tell the UI that the draw is complete
      UI.onComplete(options.step);

    }
    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      changePixel: changePixel,
      format: input.format,
      image: options.image,
      callback: callback
    });

  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  }
}
