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

module.exports = function SegmentedColormap(value, options) {
  options.colormap = options.colormap || colormaps.default;
  // if a lookup table is provided as an array:
  if(typeof(options.colormap) == "object")
    colormapFunction = segmented_colormap(options.colormap);
  // if a stored colormap is named with a string like "fastie":
  else if(colormaps.hasOwnProperty(options.colormap))
    colormapFunction = colormaps[options.colormap];
  else colormapFunction = colormaps.default;
  return colormapFunction(value / 255.00);
}

function segmented_colormap(segments) {
  return function(x) {
    var i, result, x0, x1, xstart, y0, y1, _i, _j, _len, _ref, _ref1, _ref2, _ref3;
    _ref = [0, 0], y0 = _ref[0], y1 = _ref[1];
    _ref1 = [segments[0][0], 1], x0 = _ref1[0], x1 = _ref1[1];
    if (x < x0) {
      return y0;
    }
    for (i = _i = 0, _len = segments.length; _i < _len; i = ++_i) {
      _ref2 = segments[i], xstart = _ref2[0], y0 = _ref2[1], y1 = _ref2[2];
      x0 = xstart;
      if (i === segments.length - 1) {
        x1 = 1;
        break;
      }
      x1 = segments[i + 1][0];
      if ((xstart <= x && x < x1)) {
        break;
      }
    }
    result = [];
    for (i = _j = 0, _ref3 = y0.length; 0 <= _ref3 ? _j < _ref3 : _j > _ref3; i = 0 <= _ref3 ? ++_j : --_j) {
      result[i] = (x - x0) / (x1 - x0) * (y1[i] - y0[i]) + y0[i];
    }
    return result;
  };
};

var colormaps = {
  greyscale: segmented_colormap([
               [0,     [0,   0,   0],   [255, 255, 255] ],
               [1,     [255, 255, 255], [255, 255, 255] ]
             ]),
  default:   segmented_colormap([
               [0,     [0,   0,   255], [0,   255, 0]   ],
               [0.25,  [0,   255, 0],   [255, 255, 0]   ],
               [0.50,  [0,   255, 255], [255, 255, 0]   ],
               [0.75,  [255, 255, 0],   [255, 0,   0]   ]
             ]),
  ndvi:      segmented_colormap([
               [0,     [0,   0,   255], [38,  195, 195] ],
               [0.5,   [0,   150, 0],   [255, 255, 0]   ],
               [0.75,  [255, 255, 0],   [255, 50,  50]  ]
             ]),
  stretched: segmented_colormap([
               [0,     [0,   0,   255], [0,   0,   255] ],
               [0.1,   [0,   0,   255], [38,  195, 195] ],
               [0.5,   [0,   150, 0],   [255, 255, 0]   ],
               [0.7,   [255, 255, 0],   [255, 50,  50]  ],
               [0.9,   [255, 50,  50],  [255, 50,  50]  ]
             ]),
  fastie:    segmented_colormap([
               [0,     [255, 255, 255], [0,   0,   0]   ],
               [0.167, [0,   0,   0],   [255, 255, 255] ],
               [0.33,  [255, 255, 255], [0,   0,   0]   ],
               [0.5,   [0,   0,   0],   [140, 140, 255] ],
               [0.55,  [140, 140, 255], [0,   255, 0]   ],
               [0.63,  [0,   255, 0],   [255, 255, 0]   ],
               [0.75,  [255, 255, 0],   [255, 0,   0]   ],
               [0.95,  [255, 0,   0],   [255, 0,   255] ]
             ])
}
