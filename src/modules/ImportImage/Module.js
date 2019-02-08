/*
 * Import Image module; this fetches a given remote or local image via URL
 * or data-url, and overwrites the current one. It saves the original as
 * step.metadata.input for use in future modules such as blending.
 * TODO: we could accept an operation for blending like "screen" or "overlay",
 * or a function with blend(r1,g1,b1,a1,r2,g2,b2,a2), OR we could simply allow
 * subsequent modules to do this blending and keep this one simple.
 */
module.exports = function ImportImageModule(options, UI) {

  options.imageUrl = options.url || "./images/monarch.png";

  var output,
      imgObj = new Image();

  // we should get UI to return the image thumbnail so we can attach our own UI extensions

  // add our custom in-module html ui:
  if (options.step.inBrowser) {
    var ui = require('./Ui.js')(options.step, UI);
    ui.setup();
  }

  // This function is caled everytime the step has to be redrawn
  function draw(input,callback) {

    var step = this;

    step.metadata = step.metadata || {};
    // TODO: develop a standard API method for saving each input state,
    // for reference in future steps (for blending, for example)
    step.metadata.input = input;

    function onLoad() {

      // This output is accessible to Image Sequencer
      step.output = {
        src: imgObj.src,
        format: options.format
      }

      // Tell Image Sequencer that step has been drawn
      callback();
    }

    options.format = require('../../util/GetFormat')(options.imageUrl);
    imgObj.onload = onLoad;
    imgObj.src = options.imageUrl;

  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  }
}
