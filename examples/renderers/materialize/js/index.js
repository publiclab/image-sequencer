var uiUtils = require('../../../../ui/index'),
  templates = require('./templates');

var insertUi = function(ui){
  $(step.ui.querySelector('div.insertDiv')).append(ui);
}

sequencer = ImageSequencer();

var sequencerUi = uiUtils.generateSequencerUi(sequencer, {});

var stepUi = uiUtils.generateStepUi(sequencer, {
  getStepTemplate: templates.getStepTemplate,
  getToolsTemplate: templates.getToolsTemplate,
  inputTemplates: templates.inputTemplates,
  getStepInsertTemplate: templates.getStepInsertTemplate,
  insertUi
});

uiUtils.setDefaultSequencer(sequencer, stepUi, sequencerUi, {});

$('#file-input-label').on('click', function(e) {
  $('#fileInput').click();
})

// setScrollBtn('#move-up');
// setCacheShortcut();
// initializeTooltips();
uiUtils.setSequenceSave();

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

uiUtils.setupCache('examples/', '#clear-cache');
uiUtils.sw();
// initializeSelect();

require('../../../../node_modules/materialize-css/dist/js/materialize');
require('../../../../node_modules/bootstrap/dist/js/bootstrap');