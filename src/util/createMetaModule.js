module.exports = function createMetaModule(mapFunction, moduleOptions) {

  moduleOptions = moduleOptions || {};
  moduleOptions.infoJson = moduleOptions.infoJson || {};

  function MetaModule(options, UI) {

    var defaults = require('./getDefaults.js')(moduleOptions.infoJson);
    var output;


    // Parses the options and gets the input which is not available in options from defaults
    for (key in moduleOptions.infoJson.inputs) {
      if (moduleOptions.infoJson.inputs.hasOwnProperty(key)) {
        options[key] = options[key] || defaults[key];
      }
    }


    /* example:
    function mapFunction(opt, _defaults) {

      // return steps with options:
      return [
        { 'name': 'gradient', 'options': {} },
        { 'name': 'colormap', 'options': { colormap: options.colormap } },
        { 'name': 'crop', 'options': { 'y': 0, 'h': options.h } },
        { 'name': 'overlay', 'options': { 'x': options.x, 'y': options.y, 'offset': -4 } }
      ];
    }
    */

    // ui: false prevents internal logs

    function draw(input, callback) {

      var step = this;

      // map inputs to internal step options;
      // use this to set defaults for internal steps
      // and to expose internal settings as external meta-module parameters;
      // it must return a steps object
      var steps = mapFunction(options);

      var internalSequencer = ImageSequencer({ inBrowser: false, ui: false });
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
    };
  }

  return [MetaModule, moduleOptions.infoJson];
};
