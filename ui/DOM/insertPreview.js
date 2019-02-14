function generatePreview(previewStepName, customValues, path, selector) {

    var previewSequencer = ImageSequencer();
    function insertPreview(src) {
      var img = document.createElement('img');
      img.classList.add('preview-thumbnail');
      img.src = src;
      $(selector).each(function(quickBtn) {
        if ($(quickBtn).attr('data-value') === previewStepName) {
          $(quickBtn).append(img);
        }
      });
      console.log('insertPreview', selector)
    }

    function loadPreview() {
      previewSequencer = previewSequencer.addSteps('resize', { resize: "40%" });
      if (previewStepName === "crop") {
        previewSequencer.addSteps(previewStepName, customValues).run(insertPreview);
      }
      else {
        previewSequencer.addSteps(previewStepName, { [previewStepName]: customValues }).run(insertPreview);
      }
    }
    previewSequencer.loadImage(path, loadPreview);
  }

  function updatePreviews(src, selector) {
    $(selector+' img').remove();

    var previewSequencerSteps = {
      "brightness": "20",
      "saturation": "5",
      "rotate": 90,
      "contrast": 90,
      "crop": {
        "x": 0,
        "y": 0,
        "w": "(50%)",
        "h": "(50%)",
        "noUI": true
      }
    }

    Object.keys(previewSequencerSteps).forEach(function (step, index) {
      generatePreview(step, Object.values(previewSequencerSteps)[index], src, selector);
    });
  }

module.exports = {
  generatePreview,
  updatePreviews
}