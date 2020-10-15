module.exports = require('../../util/createMetaModule.js')(
  function mapFunction(options) {
    var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
    // return steps with options:
    return [
      { 'name': 'crop', 'options': { 'y': 0, 'w': options.w || defaults.w, 'h': options.h || defaults.h } },
      { 'name': 'gradient', 'options': {} },
      { 'name': 'colormap', 'options': { colormap: options.colormap || defaults.colormap } },
      {'name': 'text-overlay', 'options': {text: options.text || defaults.text, x: options.xt || defaults.xt, y: options.yt || defaults.yt, font: options.font || defaults.font, color: options.color || defaults.color, size: options.size || defaults.size}},
      { 'name': 'overlay', 'options': { 'x': options.x || defaults.x, 'y': options.y || defaults.y, 'offset': -5 } }
    ];
  }, {
    infoJson: require('./info.json')
  }
)[0];
