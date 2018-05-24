window.onload = function() {
  sequencer = ImageSequencer();

  // Load information of all modules (Name, Inputs, Outputs)
  var modulesInfo = sequencer.modulesInfo();

  // Add modules to the addStep dropdown
  for (var m in modulesInfo) {
    $("#addStep select").append(
      '<option value="' + m + '">' + modulesInfo[m].name + "</option>"
    );
  }

  // UI for each step:
  sequencer.setUI(DefaultHtmlStepUi(sequencer));

  // UI for the overall demo:
  var ui = DefaultHtmlSequencerUi(sequencer);

  sequencer.loadImage("images/tulips.png", ui.onLoad);

  $("#addStep select").on("change", ui.selectNewStepUi);
  $("#addStep button").on("click", ui.addStepUi);
  $('body').on('click', 'button.remove', ui.removeStepUi);

  // image selection and drag/drop handling from examples/lib/imageSelection.js
  sequencer.setInputStep({
    dropZoneSelector: "#dropzone",
    fileInputSelector: "#fileInput",
    onLoad: function onFileReaderLoad(progress) {
      var reader = progress.target;
      var step = sequencer.images.image1.steps[0];
      step.output.src = reader.result;
      sequencer.run(0);
      step.options.step.imgElement.src = reader.result;
    }
  });
};
