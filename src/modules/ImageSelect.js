/*
 * Special module to kick off the sequence
 *  -- depends on jQuery for interface setup & drag & drop
 */
module.exports = function ImageSelect(options) {

  if (!window.hasOwnProperty('$')) window.$ = window.jQuery = require('jquery');

  options = options || {};
  options.title = "Select image";
  options.inputSelector = options.inputSelector || "#file-select";

  var image,
      el = $('.' + options.selector + ' .mod-drop');

  function setup() {

    // CSS UI
    el.on('dragenter', function(e) {
      el.addClass('hover');
    });

    el.on('dragleave', function(e) {
      el.removeClass('hover');
    });

    // Drag & Drop behavior
    function onImage(e) {
      e.preventDefault();
      e.stopPropagation(); // stops the browser from redirecting.

      var files;
      if (e.target && e.target.files) files = e.target.files;
      else files = e.dataTransfer.files;

      for (var i = 0, f; f = files[i]; i++) {
        // Read the File objects in this FileList.

        reader = new FileReader();
        reader.onload = function(e) {
          // we should trigger "load" event here

          image = new Image();
          image.src = event.target.result;

          el.html(image); // may be redundant

          // this is done once per image:
          options.output(image);
        }
        reader.readAsDataURL(f);

      }
    }

    function onDragOver(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    el.on('dragover', onDragOver, false);
    el[0].addEventListener('drop', onImage, false);
    $(options.inputSelector).change(onImage);

  }

  // this module is unique because it creates the image
  function draw(_image) {
    image = _image;
    options.el.html(image);
    if (options.output) options.output(image);
  }

  return {
    options: options,
    image: image,
    draw: draw,
    setup: setup
  }

}
