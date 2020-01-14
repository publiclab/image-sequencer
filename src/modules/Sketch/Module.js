module.exports = function Sketch(options, UI) {
  // var defaults = require('../../util/getDefaults.js')(require('./info.json'));
  var output;
  

  function draw(input, callback, progressObj) {
    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var defaults = require('../../util/getDefaults.js')(require('./info.json'));
    
    var step = this;
    var priorStep = this.getStep(-1);
    options.channel = options.channel || defaults.channel ;
    options.thickness = options.thickness || defaults.thickness ;

    var Sketcher = require('./Sketch.js');
    var getPixels = require('get-pixels');
    getPixels(priorStep.output.src, function(err, pixels) {
      // ImagePixels = pixels;
      var $ = require('jquery'); // To make Blob-analysis work in Node
      var img = $(priorStep.imgElement);
      if(Object.keys(img).length === 0){
        img = $(priorStep.options.step.imgElement);
      }

      var canvas = document.createElement('canvas');
      canvas.width = pixels.shape[0];
      canvas.height = pixels.shape[1];
      
      var context = canvas.getContext('2d');
      
      
      
      context.drawImage(img[0], 0, 0);
      
      
      var sketcher = new Sketcher.Sketcher(canvas.width, canvas.height,options);
      sketcher.transformCanvas(canvas,options).whenReady(function () {
        
        function extraManipulation(pixels){
          context = canvas.getContext('2d');
          
          var myImageData = context.getImageData(0, 0, canvas.width, canvas.height);
          pixels.data = myImageData.data;
         
          return pixels;
        }
      
        function output(image, datauri, mimetype, wasmSuccess) {
          step.output = { src: datauri, format: mimetype, wasmSuccess, useWasm: options.useWasm };
        }
      
        return require('../_nomodule/PixelManipulation.js')(input, {
          output: output,
          extraManipulation: extraManipulation,
          format: input.format,
          image: options.image,
          inBrowser: options.inBrowser,
          callback: callback
        });
        // return this.pixela;
      });

    });
    
    
        
       
        
        
    
  }
  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};