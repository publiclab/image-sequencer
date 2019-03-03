module.exports = function Colorbar(options, UI) {

  var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
  var output;

  options.x = options.x || defaults.x;
  options.y = options.y || defaults.y;
  options.colormap = options.colormap || defaults.colormap;
  options.h = options.h || defaults.h;

  var steps = [
    { 'name': 'gradient', 'options': {} },
    { 'name': 'colormap', 'options': { colormap: options.colormap } },
    { 'name': 'crop', 'options': { 'y': 0, 'h': options.h } },
    { 'name': 'overlay', 'options': { 'x': options.x, 'y': options.y, 'offset': -4 } }
  ];

  // ui: false prevents internal logs
  var internalSequencer = ImageSequencer({ inBrowser: false, ui: false });

  function draw(input, callback) {

    var step = this;

    internalSequencer.loadImage(input.src, function onAddImage() {
      internalSequencer.importJSON(steps);
      internalSequencer.run(function onCallback(internalOutput) {
        step.output = { src: internalOutput, format: input.format };
        callback();
      });
    });

  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  }
}
