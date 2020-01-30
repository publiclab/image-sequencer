module.exports = function LosslessCompress(options, UI) {
  function draw(input, callback, progressObj) {
    const compress_images = require("compress-images");
    compress_images(
      "images/**/*.{jpg,JPG,jpeg,JPEG,png}",
      "results/",
      { compress_force: false, statistic: true, autoupdate: true },
      false,
      { jpg: { engine: "jpegoptim", command: ["--all-progressive", "-d"] } },
      { png: { engine: "optipng" } },
      function(err, completed) {
        if (completed === true) {
          var reader = new FileReader();
          reader.readAsDataURL("results/**/*");
          reader.onloadend = function() {
            base64data = reader.result;
            output(null, base64data, input.format, false);
            if (callback) callback();
            return;
          };
        }
      }
    );
    progressObj.stop(true);
    progressObj.overrideFlag = true;

    var step = this;

    function output(image, datauri, mimetype, wasmSuccess) {
      step.output = {
        src: datauri,
        format: mimetype,
        wasmSuccess,
        useWasm: options.useWasm
      };
    }
  }
  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
};
