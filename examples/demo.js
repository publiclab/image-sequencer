window.onload = function() {
  sequencer = ImageSequencer();

  function refreshOptions() {
    // Load information of all modules (Name, Inputs, Outputs)
    var modulesInfo = sequencer.modulesInfo();

    var addStepSelect = $("#addStep select");
    addStepSelect.html("");

    // Add modules to the addStep dropdown
    for (var m in modulesInfo) {
      addStepSelect.append(
        '<option value="' + m + '">' + modulesInfo[m].name + "</option>"
      );
    }
  }
  refreshOptions();

  // UI for each step:
  sequencer.setUI(DefaultHtmlStepUi(sequencer));

  // UI for the overall demo:
  var ui = DefaultHtmlSequencerUi(sequencer);

  sequencer.loadImage("images/tulips.png", ui.onLoad);

  $("#addStep select").on("change", ui.selectNewStepUi);
  $("#addStep #add-step-btn").on("click", ui.addStepUi);
  $('#addStep #download-btn').click(function() {
    $('img:last()').trigger( "click" );
 
    return false;
    });
  $('body').on('click', 'button.remove', ui.removeStepUi);
  $('#save-seq').click(() => {
    sequencer.saveSequence(window.prompt("Please give a name to your sequence..."), sequencer.toString());
    sequencer.loadModules();
    refreshOptions();
  });

  // image selection and drag/drop handling from examples/lib/imageSelection.js
  sequencer.setInputStep({
    dropZoneSelector: "#dropzone",
    fileInputSelector: "#fileInput",
    onLoad: function onFileReaderLoad(progress) {
      var reader = progress.target;
      var step = sequencer.images.image1.steps[0];
      step.output.src = reader.result;
      sequencer.run({ index: 0 });
      step.options.step.imgElement.src = reader.result;
    }
  });
};
