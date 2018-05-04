/*
 * Image Cropping module
 * Usage:
 *    Expected Inputs:
 *      options.x : x-coordinate of image where the modules starts cropping | default : 0
 *      options.y : y-coordinate of image where the modules starts cropping | default : 0
 *      options.w : width of the resulting cropped image | default : 50% of input image width
 *      options.h : height of the resulting cropped image | default : 50% of input image height
 *    Output:
 *      The cropped image, which is essentially a rectangle bounded by the lines:
 *          x = options.x
 *          x = options.x + options.w
 *          y = options.y
 *          y = options.y + options.h
 */
module.exports = function CropModule(options, UI) {

  // TODO: we could also set this to {} if nil in AddModule.js to avoid this line:
  options = options || {};

  // Tell the UI that a step has been added
  UI.onSetup(options.step); // we should get UI to return the image thumbnail so we can attach our own UI extensions
  // add our custom in-module html ui:
  var ui = require('./Ui.js')(options.step, UI);
  var output,
      setupComplete = false;

  // This function is caled everytime the step has to be redrawn
  function draw(input,callback) {

    // Tell the UI that the step has been triggered
    UI.onDraw(options.step);
    var step = this;

    // save the input image; 
    // TODO: this should be moved to module API to persist the input image
    options.step.input = input.src;

    require('./Crop')(input, options, function(out, format){

      // This output is accessible to Image Sequencer
      step.output = {
        src: out,
        format: format
      }

      // This output is accessible to the UI
      options.step.output = out;

      // Tell the UI that the step has been drawn
      UI.onComplete(options.step);

      // start custom UI setup (draggable UI)
      // only once we have an input image
      if (setupComplete === false && options.step.inBrowser) {
        setupComplete = true;
        ui.setup();
      }

      // Tell Image Sequencer that step has been drawn
      callback();

    });

  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  }
}
