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

  var isWorkingOnGifGeneration = false;

  $('.js-view-as-gif').on('click', function(event) {
    // Prevent user from triggering generation multiple times
    if (isWorkingOnGifGeneration) return;

    isWorkingOnGifGeneration = true;

    var button = event.target;
    button.disabled = true;


    try {
      // Select all images from previous steps
      var imgs = document.getElementsByClassName("img-thumbnail");

      var imgSrcs = [];

      for (var i = 0; i < imgs.length; i++) {
        imgSrcs.push(imgs[i].src);
      }

      var options = {
        'gifWidth': imgs[0].width,
        'gifHeight': imgs[0].height,
        'images': imgSrcs,
        'frameDuration': 7,
      }

      gifshot.createGIF(options, function(obj) {
        if(!obj.error) {
          // Final gif encoded with base64 format
          var image = obj.image;
          var animatedImage = document.createElement('img');

          animatedImage.id = "gif_element";
          animatedImage.src = image;


          var modal = $('#js-download-gif-modal');

          $("#js-download-as-gif-button").one("click", function() {
            // Trigger download
            download(image, "index.gif", "image/gif");

            // Close modal
            modal.modal('hide');
          })

          var gifContainer = document.getElementById("js-download-modal-gif-container");

          // Clear previous results
          gifContainer.innerHTML = '';

          // Insert image
          gifContainer.appendChild(animatedImage);


          // Open modal
          modal.modal();

          button.disabled = false;
          isWorkingOnGifGeneration = false;
        }
      });
    }
    catch(e) {
      console.error(e);
      button.disabled = false;
      isWorkingOnGifGeneration = false;

    }
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
