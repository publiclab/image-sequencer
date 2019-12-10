var defaultHtmlSequencerUi = require('./lib/defaultHtmlSequencerUi.js'),
  setupCache = require('./lib/cache.js'),
  intermediateHtmlStepUi = require('./lib/intermediateHtmlStepUi.js'),
  DefaultHtmlStepUi = require('./lib/defaultHtmlStepUi.js'),
  urlHash = require('./lib/urlHash.js'),
  insertPreview = require('./lib/insertPreview.js');

window.onload = function () {
  sequencer = ImageSequencer(); // Set the global sequencer variable.

  function refreshOptions() {
    // Load information (Name, Inputs, Outputs) of all modules.
    var modulesInfo = sequencer.modulesInfo();

    var addStepSelect = $('#addStep select');
    addStepSelect.html('');

    // Add modules to the addStep dropdown.
    for (var m in modulesInfo) {
      if (modulesInfo[m] && modulesInfo[m].name)
        addStepSelect.append(
          '<option value="' + m + '">' + modulesInfo[m].name + '</option>'
        );
    }
    // Null option
    addStepSelect.append('<option value="" disabled selected>Select a Module</option>');
    addStepSelect.selectize({
      sortField: 'text'
    });
  }
  refreshOptions();

  $(window).on('scroll', scrollFunction);

  /**
   * @description Method to toggle the scroll-up arrow.
   */
  function scrollFunction(A, B) {
    var shouldDisplay = $('body').scrollTop() > 20 || $(':root').scrollTop() > 20;

    $('#move-up').css({
      display: shouldDisplay ? 'block' : 'none'
    });
  }

  /**
   * @description Method to scroll to the top of the page.
   */
  function topFunction() {
    $('body').animate({scrollTop: 0});
    $(':root').animate({scrollTop: 0});
  }

  $('#move-up').on('click', topFunction);


  // UI for each step:
  sequencer.setUI(DefaultHtmlStepUi(sequencer));

  // UI for the overall demo:
  var ui = defaultHtmlSequencerUi(sequencer);

  // Load image data from URL `src` parameter.
  if (urlHash.getUrlHashParameter('src')) {
    sequencer.loadImage(urlHash.getUrlHashParameter('src'), ui.onLoad);
  } else {
    sequencer.loadImage('images/tulips.png', ui.onLoad);
  }

  var resetSequence = function () {
    var r = confirm('Do you want to reset the sequence?');
    if (r)
      window.location = '/';
  };

  $('#addStep select').on('change', ui.selectNewStepUi);
  $('#addStep #add-step-btn').on('click', ui.addStepUi);
  $('#resetButton').on('click', resetSequence);

  // Module Selector quick buttons click handler.
  $('.radio-group .radio').on('click', function () {
    $(this).parent().find('.radio').removeClass('selected');
    $(this).addClass('selected');
    newStep = $(this).attr('data-value');

    $('#addStep select').val(newStep);
    ui.selectNewStepUi(newStep);
    ui.addStepUi(newStep);
    $(this).removeClass('selected');
  });

  /**
   * @method displayMessageOnSaveSequence
   * @description When a sequence is saved to a browser, notification is displayed.
   * @returns {Null}
   */
  function displayMessageOnSaveSequence() {
    $('.savesequencemsg').fadeIn();
    setTimeout(function () {
      $('.savesequencemsg').fadeOut();
    }, 3000);
  }

  $('body').on('click', 'button.remove', ui.removeStepUi);
  function saveSequence() { // 1. save seq
    var result = window.prompt('Please give a name to your sequence... (Saved sequence will only be available in this browser).');
    if (result) {
      result = result + ' (local)';
      sequencer.saveSequence(result, sequencer.toString()); // 1.a study saveSequence
      sequencer.loadModules();
      displayMessageOnSaveSequence();
      refreshOptions();
    }
  }
  $('#saveButton').on('click', function () {
    // Different handlers triggered for different dropdown options.

    let dropDownValue = $('#selectSaveOption option:selected').val();

    if (dropDownValue == 'save-image') {
      $('.download-btn:last()').trigger('click');
    }
    else if (dropDownValue == 'save-gif') {
      handleSavePNG();
    }
    else if (dropDownValue == 'save-seq') {
      saveSequence();
    }
  });

  let isWorkingOnGifGeneration = false;

  $('.js-view-as-gif').on('click', function (event) { // GIF generation and display.
    if (isWorkingOnGifGeneration) return; // Prevent multiple button clicks.

    isWorkingOnGifGeneration = true;

    var button = event.target;
    button.disabled = true;
    button.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>';

    try {
      // Get GIF resources from previous steps.
      let options = getGifResources();

      gifshot.createGIF(options, function (obj) { // GIF generation.
        if (!obj.error) {
          // Final gif encoded with base64 format.
          var image = obj.image;
          var animatedImage = document.createElement('img');

          animatedImage.id = 'gif_element';
          animatedImage.src = image;

          let modal = $('#js-download-gif-modal');

          $('#js-download-as-gif-button').one('click', function () {
            downloadGif(image); // Trigger GIF download.
            modal.modal('hide');
          });

          var gifContainer = document.getElementById('js-download-modal-gif-container');

          // Clear previous results.
          gifContainer.innerHTML = '';

          // Insert image
          gifContainer.appendChild(animatedImage);

          // Open modal
          modal.modal();

          button.disabled = false;
          button.innerHTML = 'View GIF';
          isWorkingOnGifGeneration = false;
        }
      });
    }
    catch (e) {
      console.error(e);
      button.disabled = false;
      button.innerHTML = 'View GIF';
      isWorkingOnGifGeneration = false;
    }
  });

  function getGifResources() {
    // Returns an object with specific gif options.
    let imgs = document.getElementsByClassName('step-thumbnail');
    var imgSrcs = [];

    // Pushes image sources of all the modules in the DOM.
    for (var i = 0; i < imgs.length; i++) {
      imgSrcs.push(imgs[i].src);
    }

    var options = { // GIF frame options.
      'gifWidth': imgs[0].width,
      'gifHeight': imgs[0].height,
      'images': imgSrcs,
      'frameDuration': 7,
    };

    return options;
  }

  function handleSavePNG() {
    let options = getGifResources();
    gifshot.createGIF(options, function(obj){

      downloadGif(obj.image);

    });
  }

  function downloadGif(image) {
    download(image, 'index.gif', 'image/gif'); // Downloadjs library function.
  }

  // Image selection and drag/drop handling from examples/lib/imageSelection.js
  sequencer.setInputStep({
    dropZoneSelector: '#dropzone',
    fileInputSelector: '#fileInput',
    takePhotoSelector: '#take-photo',
    onLoad: function onFileReaderLoad(progress) {
      var reader = progress.target;
      var step = sequencer.steps[0];
      var util = intermediateHtmlStepUi(sequencer);
      step.output.src = reader.result;
      sequencer.run({ index: 0 });
      if (typeof step.options !== 'undefined')
        step.options.step.imgElement.src = reader.result;
      else
        step.imgElement.src = reader.result;
      insertPreview.updatePreviews(reader.result, '#addStep');
      insertPreview.updatePreviews(sequencer.steps[0].imgElement.src, '.insertDiv');
    },
    onTakePhoto: function (url) {
      var step = sequencer.steps[0];
      step.output.src = url;
      sequencer.run({ index: 0 });
      if (typeof step.options !== 'undefined')
        step.options.step.imgElement.src = url;
      else
        step.imgElement.src = url;
      insertPreview.updatePreviews(url, '#addStep');
      insertPreview.updatePreviews(sequencer.steps[0].imgElement.src, '.insertDiv');
    }
  });

  setupCache();

  if (urlHash.getUrlHashParameter('src')) { // Gets the sequence from the URL.
    insertPreview.updatePreviews(urlHash.getUrlHashParameter('src'), '#addStep');
  } else {
    insertPreview.updatePreviews('images/tulips.png', '#addStep');
  }
};