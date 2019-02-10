var insertPreview = require('../DOM/insertPreview');

function setDefaultSequencer(sequencer, stepUi, sequencerUi, options){
  //find any `src` parameters in URL hash and attempt to source image from them and run the sequencer
  if (uiUtils.urlHash.getUrlHashParameter('src')) {
    sequencer.loadImage(getUrlHashParameter('src'), ui.onLoad);
  } else {
    sequencer.loadImage(options.loadImage || 'images/tulips.png', sequencerUi.onLoad);
  }

  $('body').on('click', options.remove-btn || 'button.remove', sequencerUi.removeStepUi);

  // image selection and drag/drop handling from examples/lib/imageSelection.js
  sequencer.setInputStep({
    dropZoneSelector: options.dropZoneSelector || '#dropzone',
    fileInputSelector: options.fileInputSelector || '#fileInput',
    takePhotoSelector: options.takePhotoSelector || '#take-photo',
    onLoad: function onFileReaderLoad(progress) {
      var reader = progress.target;
      var step = sequencer.images.image1.steps[0];
      step.output.src = reader.result;
      sequencer.run({ index: 0 });
      step.options.step.imgElement.src = reader.result;
      insertPreview.updatePreviews(reader.result, sequencerUi.options.addStepSel);
      insertPreview.updatePreviews(sequencer.images.image1.steps[0].options.step.imgElement.src, stepUi.options.insertStepSel || '.insert-step');
    },
    onTakePhoto: function (url) {
      var step = sequencer.images.image1.steps[0];
      step.output.src = url;
      sequencer.run({ index: 0 });
      step.options.step.imgElement.src = url;
    }
  })

  if (getUrlHashParameter('src')) {
    insertPreview.updatePreviews(getUrlHashParameter('src'), sequencerUi.options.addStepSel);
  } else {
    insertPreview.updatePreviews(options.loadImage || 'images/tulips.png', sequencerUi.options.addStepSel);
  }
}

module.exports = setDefaultSequencer;