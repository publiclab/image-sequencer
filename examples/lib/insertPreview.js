function generatePreview(previewStepName, customValues, path, selector) {

    var previewSequencer = ImageSequencer();
    function insertPreview(src) {
      var img = document.createElement('img');
      img.classList.add('img-thumbnail')
      img.classList.add('no-border');
      img.src = src;
      $(img).css("max-width", "200%");
      $(img).css("transform", "translateX(-20%)");
      var stepDiv = $('#'+selector+' .row').find('div').each(function() {
        if ($(this).find('div').attr('data-value') === previewStepName) {
          $(this).find('div').append(img);
        }
      });
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
    $('#'+selector+' img').remove();

    var previewSequencerSteps = {
      "resize": "125%",
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
  generatePreview : generatePreview,
  updatePreviews : updatePreviews
}