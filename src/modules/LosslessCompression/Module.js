module.exports = function LosslessCompress(options, UI) {
  const compress_images = require("compress-images");
  compress_images(
    "src/img/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}",
    "build/img/",
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "jpegoptim", command: ["--all-progressive", "-d"] } },
    { png: { engine: "optipng" } },
    function(err, completed) {
      if (completed === true) {
        // Doing something.
      }
    }
  );
};
