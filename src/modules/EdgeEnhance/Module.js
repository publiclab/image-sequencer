module.exports = function EdgeEnhance(options, UI) {

  var output;

  function draw(input, callback) {
    // Emit draw event for UI
    if (UI && UI.onDraw) UI.onDraw(options.step);

    // Use pixelManipulation API for cross-platform compatibility
    var pixelManipulation = input.pixelManipulation;
    
    // Define edge enhancement kernel (Sobel-like)
    var kernel = [
      [-1, -1, -1],
      [-1,  8, -1],
      [-1, -1, -1]
    ];

    // Apply convolution using pixelManipulation
    var outputImage = pixelManipulation.convolve(input, kernel, { 
      normalize: false,
      clamp: true 
    });

    this.output = outputImage;
    
    // Emit complete event with output
    if (UI && UI.onComplete) UI.onComplete(options.step, outputImage.src);
    
    callback();
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};