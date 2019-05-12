/*
 * Sample Meta Module for demonstration purpose only
 */
module.exports = require('../../util/createMetaModule.js')(
  function mapFunction(options) {

    return [
      { 'name': 'ndvi', 'options': {} },
      { 'name': 'colormap', 'options': { colormap: options.colormap } },
    ];
  }, {
    infoJson: require('./info.json')
  }
)[0];