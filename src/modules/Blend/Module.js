module.exports = function Dynamic(options, UI, util) {
  
  options = options || {};
  options.func = options.func || "function(r1, g1, b1, a1, r2, g2, b2, a2) { return [ r1, g2, b2, a2 ] }";
  
  // Tell the UI that a step has been set up.
  UI.onSetup(options.step);
  var output;
  
  // This function is called on every draw.
  function draw(input,callback,progressObj) {

    progressObj.stop(true);
    progressObj.overrideFlag = true;

    // Tell the UI that the step is being drawn
    UI.onDraw(options.step);
    var step = this;

    // convert to runnable code:
    if (typeof options.func === "string") eval('options.func = ' + options.func);

    var getPixels = require('get-pixels');
   
    // save first image's pixels
    var priorStep = util.getStep(-1);
console.log(priorStep);

    getPixels(priorStep.output.src, function(err, pixels) {
      options.firstImagePixels = pixels;
    });

    function changePixel(r2, g2, b2, a2, x, y) {
      // blend!
      var p = options.firstImagePixels;
      return options.func(
        r2, g2, b2, a2,
        p.get(x, y, 0),
        p.get(x, y, 1),
        p.get(x, y, 2),
        p.get(x, y, 3)
      )
    }
    
    function output(image, datauri, mimetype){

      // This output is accessible by Image Sequencer
      step.output = { src: datauri, format: mimetype };
      
      // This output is accessible by the UI
      options.step.output = datauri;
      
      // Tell the UI that the draw is complete
      UI.onComplete(options.step);

    }

    // run PixelManipulatin on second image's pixels 
    return require('../_nomodule/PixelManipulation.js')(input, {
      output: output,
      changePixel: changePixel,
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
  }
}
