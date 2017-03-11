/*
 * Plot image on a graph with color bar
 */
module.exports = function Plot(options) {

  options = options || {};
  options.title = "Plot with colorbar";
  options.colorscale = options.colorscale || 'Jet',//'RdBu';
  options.type = options.type || 'contour'; // or 'heatmap'

  var image;

  function draw(_image) {

    /* https://plot.ly/javascript/heatmap-and-contour-colorscales/#custom-colorscale
  type: 'contour',
  colorscale: [[0,    'rgb(166,206,227)'], 
               [0.25, 'rgb(31,120,180)'], 
               [0.45, 'rgb(178,223,138)'], 
               [0.65, 'rgb(51,160,44)'], 
               [0.85, 'rgb(251,154,153)'], 
               [1,    'rgb(227,26,28)']]
    */

    var Plotly = require('plotly.js'),
        getPixels = require("get-pixels");

    var data = [{
      z: [],
      colorscale: options.colorscale,
      type: options.type
    }];

    getPixels(_image.src, function(err, pixels) {

      if(err) {
        console.log("Bad image path")
        return
      }

      for(var y = pixels.shape[1]; y > 0; y--) {
        data[0].z.push([]);
        for(var x = 1; x < pixels.shape[0]; x++) {

          data[0].z[data[0].z.length - 1].push(pixels.get(x, y, 0) / 255.00);

        }
      }

      var layout = { title: '' };
      random = parseInt(Math.random() * (new Date()).getTime() / 1000000);

      options.ui.el.append('<div id="plot-' + random + '"></div>');
      Plotly.newPlot('plot-' + random, data, layout)
/*        .then(function afterPlot(graphData) {

          options.output(Plotly.toImage(graphData, {
            format: 'jpeg',
            height: _image.height,
            width: _image.width 
          }));

      });
*/
    });

  }

  return {
    options: options,
    image: image,
    draw: draw
  }
}
