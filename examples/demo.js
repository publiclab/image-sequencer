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

  $('.js-view-as-gif').on('click', function(event) {
    var button = event.target
    button.disabled = true

    // Select all images from previous steps
    var imgs = document.getElementsByClassName("img-thumbnail")


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
        var image = obj.image,
        animatedImage = document.createElement('img');
        animatedImage.src = image;
        animatedImage.id = "gif_element";
        var link = document.createElement('a');
        var att1 = document.createAttribute("href");

        var options = { type: 'image/gif' }

        // Can't just set href attribute. Most gifs data are too big.
        var gifBlob = new Blob([animatedImage.src], options)
        var dataUrl = window.URL.createObjectURL(gifBlob, options)

        att1.value = dataUrl;

        var att2 = document.createAttribute("download");
        att2.value = "index.gif";
        link.setAttributeNode(att1);
        link.setAttributeNode(att2);
        link.appendChild(animatedImage);


        var gifContainer = document.getElementById("js-download-modal-gif-container")
        var gifButton = document.getElementById("js-download-as-gif-button")


        gifButton.href = dataUrl

        // Clear previous results
        gifContainer.innerHTML = ''

        // Insert image
        gifContainer.appendChild(link);

        // Trigger modal
        $('#js-download-gif-modal').modal()
        button.disabled = false

      }
    });
  })

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
