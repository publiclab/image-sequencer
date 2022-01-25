module.exports = require('../../util/createMetaModule.js')(
  function mapFunction(options) {
    var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
    // return steps with options:
    return [
      { 'name': 'gradient', 'options': {} },
      { 'name': 'colormap', 'options': { colormap: options.colormap || defaults.colormap } },
      { 'name': 'crop', 'options': { 'y': 0, 'w': '100%', 'h': options.h || defaults.h } },
      { 'name': 'overlay', 'options': { 'x': options.x || defaults.x, 'y': options.y || defaults.y, 'offset': -4 }  }
    ];
  }, {
    infoJson: require('./info.json')
  }
)[0];
