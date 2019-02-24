// Shadow Module
module.exports = require('../../util/createMetaModule.js')(
   function mapFunction(options) {

       return [
           { 'name': 'resize', 'options': { 'resize': options.resize } },
           { 'name': 'gradient', 'options': {} },
           { 'name': 'overlay', 'options': { 'x': options.x, 'y': options.y, 'offset': -4 } }
       ];
   }, {
       infoJson: require('./info.json')
   }
)[0];
