var insertPreview = require('../DOM/insertPreview'),
  getUrlHashParameter = require('./sequence/urlHash').getUrlHashParameter;

function setDefaultSequencer(sequencer, stepUi, sequencerUi, options){
  //find any `src` parameters in URL hash and attempt to source image from them and run the sequencer
  sequencer.setUI(stepUi);
  if (getUrlHashParameter('src')) {
    sequencer.loadImage(getUrlHashParameter('src'), sequencerUi.onLoad);
  } else {
    sequencer.loadImage(options.loadImage || 'images/tulips.png', sequencerUi.onLoad);
  }

  $('body').on('click', options.removeBtn || 'button.remove', sequencerUi.removeStepUi);

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
      insertPreview.updatePreviews(reader.result, sequencerUi.options.quickBtnsSel);
      insertPreview.updatePreviews(sequencer.images.image1.steps[0].options.step.imgElement.src, sequencerUi.options.quickBtnsSel);
    },
    onTakePhoto: function (url) {
      var step = sequencer.images.image1.steps[0];
      step.output.src = url;
      sequencer.run({ index: 0 });
      step.options.step.imgElement.src = url;
    }
  })

  if (getUrlHashParameter('src')) {
    insertPreview.updatePreviews(getUrlHashParameter('src'), sequencerUi.options.quickBtnsSel);
  } else {
    insertPreview.updatePreviews(options.loadImage || 'images/tulips.png', sequencerUi.options.quickBtnsSel);
  }
}

module.exports = setDefaultSequencer;