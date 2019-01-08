window.onload = function() {
  function generatePreview(previewStepName, customValues, path) {
    var previewSequencer = ImageSequencer();

    function insertPreview(src) {
      var img = document.createElement('img');
      img.classList.add('img-thumbnail')
      img.classList.add('no-border');
      img.src = src;
      $(img).css("max-width", "200%");
      $(img).css("transform", "translateX(-20%)");
      var stepDiv = $('#addStep .row').find('div').each(function() {
        if ($(this).find('div').attr('data-value') === previewStepName) {
          $(this).find('div').append(img);
        }
      });
    }
    function loadPreview() {
      previewSequencer = previewSequencer.addSteps('resize', { resize: "40%" });

      if (previewStepName === "crop") {
        console.log(customValues);
        previewSequencer.addSteps(previewStepName, customValues).run(insertPreview);
      }
      else {
        previewSequencer.addSteps(previewStepName, { [previewStepName]: customValues }).run(insertPreview);
      }
    }
    previewSequencer.loadImage(path, loadPreview);
  }


  sequencer = ImageSequencer();

  function refreshOptions() {
    // Load information of all modules (Name, Inputs, Outputs)
    var modulesInfo = sequencer.modulesInfo();
    console.log(modulesInfo)

    var addStepSelect = $("#addStep select");
    addStepSelect.html("");

    // Add modules to the addStep dropdown
    for (var m in modulesInfo) {
      if (modulesInfo[m] && modulesInfo[m].name)
        addStepSelect.append(
          '<option value="' + m + '">' + modulesInfo[m].name + "</option>"
        );
    }
    // Null option
    addStepSelect.append('<option value="none" disabled selected>More modules...</option>');
  }
  refreshOptions();

  // UI for each step:
  sequencer.setUI(DefaultHtmlStepUi(sequencer));

  // UI for the overall demo:
  var ui = DefaultHtmlSequencerUi(sequencer);

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

  $("#addStep select").on("change", ui.selectNewStepUi);
  $("#addStep #add-step-btn").on("click", ui.addStepUi);
  $("#resetButton").on("click",resetSequence);

  //Module button radio selection
  $('.radio-group .radio').on("click", function() {
    $(this).parent().find('.radio').removeClass('selected');
    $(this).addClass('selected');
    newStep = $(this).attr('data-value');
    console.log(newStep);
    //$("#addStep option[value=" + newStep + "]").attr('selected', 'selected');
    $("#addStep select").val(newStep);
    ui.selectNewStepUi();
    ui.addStepUi();
    $(this).removeClass('selected');
  });

  $('#download-btn').click(function() {
    $('.step-thumbnail:last()').trigger("click");
    return false;
  });

  function displayMessageOnSaveSequence(){
      $(".savesequencemsg").fadeIn();
      setTimeout(function() {
          $(".savesequencemsg").fadeOut();
      }, 1000);
    }

  $('body').on('click', 'button.remove', ui.removeStepUi);
  $('#save-seq').click(() => {
    var result = window.prompt("Please give a name to your sequence... (Saved sequence will only be available in this browser).");
    if(result){
      result = result + " (local)";
      sequencer.saveSequence(result, sequencer.toString());
      sequencer.loadModules();
      displayMessageOnSaveSequence();
      refreshOptions();
    }
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
      var imgs = document.getElementsByClassName("step-thumbnail");

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
        if (!obj.error) {
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
    catch (e) {
      console.error(e);
      button.disabled = false;
      isWorkingOnGifGeneration = false;

    }
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
      updatePreviews(reader.result);
    },
    onTakePhoto: function (url) {
      var step = sequencer.images.image1.steps[0];
      step.output.src = url;
      sequencer.run({ index: 0 });
      step.options.step.imgElement.src = url;
    }
  });

  setupCache();
  
  function updatePreviews(src) {
    $('#addStep img').remove();

    var previewSequencerSteps = {
      "brightness": "175",
      "saturation": "0.5",
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

    Object.keys(previewSequencerSteps).forEach(function(step, index) {
      generatePreview(step, Object.values(previewSequencerSteps)[index], src);
    });
  }

  if (getUrlHashParameter('src')) {
    updatePreviews(getUrlHashParameter('src'));
  } else {
    updatePreviews("images/tulips.png");
  }
};
