/*
 * Accepts a value from 0-255 and returns the new color-mapped pixel 
 * from a lookup table, which can be specified as an array of [begin, end] 
 * gradients, where begin and end are represented as [r, g, b] colors. In 
 * combination, a lookup table which maps values from 0 - 255 smoothly from black to white looks like:
 * [
 *   [0, [0, 0, 0], [255, 255, 255]],
 *   [1, [255, 255, 255], [255, 255, 255]]
 * ]
 * 
 * Adapted from bgamari's work in Infragram: https://github.com/p-v-o-s/infragram-js/commit/346c97576a07b71a55671d17e0153b7df74e803b
 */

module.exports = function Colormap(value, options) {
  options.colormap = options.colormap || colormaps.default;
  // if this is a full colormap object with author, description, and a colormap function:
  if(options.colormap.hasOwnProperty("fn") && typeof options.colormap.fn === "function"))
    colormapFunction = options.colormap.fn;
  // if this is a full colormap object but hasn't had its function generated:
  else if(options.colormap.hasOwnProperty("fn") && typeof options.colormap.fn !== "function"))
    colormapFunction = colormapFunctionGenerator(options.colormap.colormap);
  // if a lookup table is provided as an array:
  else if(typeof(options.colormap) == "object")
    colormapFunction = colormapFunctionGenerator(options.colormap);
  // if a stored colormap is named with a string like "fastie":
  else if(colormaps.hasOwnProperty(options.colormap))
    colormapFunction = colormaps[options.colormap];
  else colormapFunction = colormaps.default.fn;
  return colormapFunction(value / 255.00);
}

var colormapFunctionGenerator = require('.colormapFunctionGenerator.js');

var colormaps = require('.colormaps.json');

// Here if there is colormap.colormapRanges defined, we use them to generate a lookup function;
// otherwise, the colormap.fn can be used if already provided.
Object.keys(colormaps).forEach(function(key) {
  // make a function from the colormap, which we can't easily do in JSON
  colormaps[key].fn = colormapFunctionGenerator(colormaps[key].colormapRanges);
});
