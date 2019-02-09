module.exports = function NdviColormapfunction(options, UI) {

    var defaults = require('./../../util/getDefaults.js')(require('./info.json'));

    options.x = options.x || defaults.x;
    options.y = options.y || defaults.y;
    options.colormap = options.colormap || defaults.colormap;
    options.h = options.h || defaults.h;
    this.expandSteps([
        { 'name': 'gradient', 'options': {} },
        { 'name': 'colormap', 'options': { colormap: options.colormap } },
        { 'name': 'crop', 'options': { 'y': 0, 'h': options.h } },
        { 'name': 'overlay', 'options': { 'x': options.x, 'y': options.y, 'offset': -4 } }
    ]);
    return {
        isMeta: true
    }
}