function Match(options, UI) {
  var output;

  new Matcher(
    'examples/images/big.jpg',
    'examples/images/small.jpg',
    async function(q) {
      var res = await q;
      window.r = res;
      console.log('Matcher loaded.');
    }
  );

  var points = window.r.points;

  function draw(input, callback, progressObj) {
    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function changePixel(r, g, b, a, x, y) {
      for (var i = 0; i < points.length; i++) {
        if (Math.abs(points[i].x - x) <= 3 && Math.abs(points[i].y - y) <= 3) {
          return [0, 255, 0, a];
        }
      }
      return [r, g, b, a];
    }

    function output(image, datauri, mimetype) {
      step.output = { src: datauri, format: mimetype };
    }

    return input.pixelManipulation({
      output: output,
      changePixel: changePixel,
      format: input.format,
      image: options.image,
      inBrowser: options.inBrowser,
      callback: callback,
      useWasm: options.useWasm
    });
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
}

module.exports = Match;
