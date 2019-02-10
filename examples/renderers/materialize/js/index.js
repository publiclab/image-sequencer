var uiUtils = require('../../../../ui/index'),
  templates = require('./templates');

var insertUi = function(ui){
  $(step.ui.querySelector('div.insertDiv')).append(ui);
}

window.onload = function() {
  sequencer = ImageSequencer();

  uiUtils.setSequencerUi(sequencer, {});

  uiUtils.setStepUi(sequencer, {
    getStepTemplate: templates.getStepTemplate,
    getToolsTemplate: templates.getToolsTemplate,
    inputTemplates: templates.inputTemplates,
    getStepInsertTemplate: templates.getStepInsertTemplate,
    insertUi
  });


  $('#file-input-label').on('click', function(e) {
    $('#fileInput').click();
  })
  
  // setScrollBtn('#move-up');
  // setCacheShortcut();
  initializeTooltips();
  uiUtils.setSaveSequence();

  // UI for each step:
  sequencer.setUI(DefaultHtmlStepUi(sequencer));

  // UI for the overall demo:
  var ui = defaultHtmlSequencerUi(sequencer);
  setModuleSelector(ui);

  // find any `src` parameters in URL hash and attempt to source image from them and run the sequencer
  if (getUrlHashParameter('src')) {
    sequencer.loadImage(getUrlHashParameter('src'), ui.onLoad);
  } else {
    sequencer.loadImage("images/tulips.png", ui.onLoad);
  }

  var resetSequence = function(){
    var r=confirm("Do you want to reset the sequence?");
    if (r)
      window.location = "/";
  }

  $("#resetButton").on("click", resetSequence);

  $('#download-btn').click(function() {
    download($('.step-thumbnail:last()').attr('src'), $('.step-thumbnail:last()').attr('alt') + '.png', 'image/png');
    return false;
  });

  $('body').on('click', 'button.remove', ui.removeStepUi);

  uiUtils.setGifGenerator(function(gif) {
    var modal = $('#js-download-gif-modal');
    $('#js-download-as-gif-button').one('click', function() {
      modal.modal('close');
      download(image, 'index.gif', 'image/gif');
    })
    $('.gif-close').click(function(){
      modal.modal('close');
    })
    var gifContainer = document.getElementById('js-download-modal-gif-container');
    gifContainer.innerHTML = '';
    gifContainer.appendChild(gif);

    modal.modal('open');
  });

  // image selection and drag/drop handling from examples/lib/imageSelection.js
  sequencer.setInputStep({
    dropZoneSelector: "#dropzone",
    fileInputSelector: "#fileInput",
    takePhotoSelector: "#take-photo",
    onLoad: function onFileReaderLoad(progress) {
      var reader = progress.target;
      var step = sequencer.images.image1.steps[0];
      step.output.src = reader.result;
      sequencer.run({ index: 0 });
      step.options.step.imgElement.src = reader.result;
      insertPreview.updatePreviews(reader.result,'#addStep');
      insertPreview.updatePreviews(sequencer.images.image1.steps[0].options.step.imgElement.src,'.insert-step');
    },
    onTakePhoto: function (url) {
      var step = sequencer.images.image1.steps[0];
      step.output.src = url;
      sequencer.run({ index: 0 });
      step.options.step.imgElement.src = url;
    }
  })

  uiUtils.setupCache('examples/', '#clear-cache');
  uiUtils.sw();

  if (getUrlHashParameter('src')) {
    insertPreview.updatePreviews(getUrlHashParameter('src'),'#addStep');
  } else {
    insertPreview.updatePreviews("images/tulips.png",'#addStep');
  }
  initializeSelect();
};

require('materialize-css')();
require('bootstrap')();