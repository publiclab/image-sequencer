/*
 * Detect Edges in an Image
 */
module.exports = function edgeDetect(options,UI) {

    options = options || {};
    options.title = "Detect Edges";
    options.description = "Detects the edges in an image";
    options.blur = options.blur || 2
    options.highThresholdRatio = options.highThresholdRatio||0.2
    options.lowThresholdRatio = options.lowThresholdRatio||0.15
  
    // Tell UI that a step has been set up.
    UI.onSetup(options.step);
    var output;
  
    // The function which is called on every draw.
    function draw(input,callback) {
  
      // Tell UI that a step is being drawn.
      UI.onDraw(options.step);
  
      var step = this;


    //   Extra Manipulation function used as an enveloper for applying gaussian blur and Convolution
      function extraManipulation(pixels){
        pixels = require('ndarray-gaussian-filter')(pixels,options.blur)
        return require('./EdgeUtils')(pixels,options.highThresholdRatio,options.lowThresholdRatio,options.inBrowser)
      }
  
      function changePixel(r, g, b, a) {
        return [(r+g+b)/3, (r+g+b)/3, (r+g+b)/3, a];
      }
  
      function output(image,datauri,mimetype){
  
        // This output is accessible by Image Sequencer
        step.output = {src:datauri,format:mimetype};
  
        // This output is accessible by UI
        options.step.output = datauri;
  
        // Tell UI that step has been drawn.
        UI.onComplete(options.step);
      }
  
      return require('../_nomodule/PixelManipulation.js')(input, {
        output: output,
        changePixel: changePixel,
        extraManipulation: extraManipulation,
        format: input.format,
        image: options.image,
        inBrowser: options.inBrowser,
        callback: callback
      });
  
    }
  
    return {
      options: options,
      draw:  draw,
      output: output,
      UI: UI
    }
  }