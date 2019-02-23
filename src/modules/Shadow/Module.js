module.exports = function Shadow(options, UI) {

    var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
    var output;

    var steps = [
        { 'name': 'resize', 'options': {} },
        { 'name': 'gradient', 'options': {} },
        { 'name': 'overlay', 'options': { 'x': options.x, 'y': options.y, 'offset': -4 } }
    ];

    // ui: false prevents internal logs
    var internalSequencer = ImageSequencer({ inBrowser: true, ui: true });

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
