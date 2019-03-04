module.exports = require('../../util/createMetaModule.js')(
  function mapFunction(options) {

    // return steps with options:
    return [
      { 'name': 'gradient', 'options': {} },
      { 'name': 'colormap', 'options': { colormap: options.colormap } },
      { 'name': 'crop', 'options': { 'y': 0, 'h': options.h } },
      { 'name': 'overlay', 'options': { 'x': options.x, 'y': options.y, 'offset': -4 } }
    ];
  }, {
    infoJson: require('./info.json')
  }
)[0];
