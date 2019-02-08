module.exports = function NdviColormapfunction(options, UI) {

    options.x = options.x || 0;
    options.y = options.y || 0;
    options.colormap = options.colormap || "default";
    options.h = options.h || 10;
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