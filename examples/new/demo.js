var defaultHtmlSequencerUi = require('./lib/sequencer/sequence/defaultHtmlSequencerUi'),
    setupCache = require('./lib/sw/cache.js'),
    DefaultHtmlStepUi = require('./lib/sequencer/step/defaultHtmlStepUi.js'),
    { setModuleSelector } = require('./lib/sequencer/sequence/setModuleSelector'),
    { getUrlHashParameter } = require('./lib/sequencer/sequence/urlHash.js'),
    { initializeSelect, initializeTooltips } = require('./lib/DOM/initializeComponents'),
    { setScrollBtn, setCacheShortcut } = require('./lib/DOM/helpers'),
    setGifGenerator = require('./lib/sequencer/sequence/gif'),
    setSaveSequence = require('./lib/sequencer/sequence/saveSequence')
    insertPreview = require('./lib/DOM/insertPreview');

window.onload = function() {
  sequencer = ImageSequencer();

  $('#file-input-label').on('click', function(e) {
    $('#fileInput').click();
  })
  $('button#old-ui').on('click', function(){
    var loc = window.location.toString();
    var oldLoc  = loc.substr(0, loc.indexOf('examples/') + 9) + 'legacy/#steps=' + getUrlHashParameter('steps');
    window.location = oldLoc;
  })
  
  setScrollBtn('#move-up');
  setCacheShortcut();
  initializeTooltips();
  setSaveSequence();

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
  setGifGenerator();

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

  setupCache();

  if (getUrlHashParameter('src')) {
    insertPreview.updatePreviews(getUrlHashParameter('src'),'#addStep');
  } else {
    insertPreview.updatePreviews("images/tulips.png",'#addStep');
  }
  initializeSelect();
};