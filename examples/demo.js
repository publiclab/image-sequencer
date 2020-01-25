var defaultHtmlSequencerUi = require('./lib/defaultHtmlSequencerUi.js'),
  setupCache = require('./lib/cache.js'),
  intermediateHtmlStepUi = require('./lib/intermediateHtmlStepUi.js'),
  DefaultHtmlStepUi = require('./lib/defaultHtmlStepUi.js'),
  urlHash = require('./lib/urlHash.js'),
  insertPreview = require('./lib/insertPreview.js'),
  versionManagement = require('./lib/versionManagement.js'),
  isGIF = require('../src/util/isGif');


window.onload = function () {
  sequencer = ImageSequencer(); // Set the global sequencer variable
  
  options = {
    sortField: 'text',
    openOnFocus: false,
    onInitialize: function () {
      this.$control.on('click', () => {
        this.ignoreFocusOpen = true;
        setTimeout(() => {
          // Trigger onFocus and open dropdown.
          this.ignoreFocusOpen = false;
        }, 50);
      });
    },
    // Open dropdown after timeout of onClick.
    onFocus: function () {
      if (!this.ignoreFocusOpen) {
        this.open();
      }
    }
  };

  versionManagement.getLatestVersionNumber(function(versionNumber) {
    console.log('The latest NPM version number for Image Sequencer (from GitHub) is v' + versionNumber);
  });
  console.log('The local version number for Image Sequencer is v' + versionManagement.getLocalVersionNumber());

  function displayVersionNumber() {
    $('#version-number-text').text('Image Sequencer v' + versionManagement.getLocalVersionNumber());
    $('#version-number-top-right').text('v' + versionManagement.getLocalVersionNumber());
  }
  displayVersionNumber();

  function refreshOptions(options) {
    // Default options if parameter is empty.
    if (options == undefined) options = { sortField: 'text' };
    // Load information of all modules (Name, Inputs, Outputs)
    var modulesInfo = sequencer.modulesInfo();

    var addStepSelect = $('#addStep select');
    addStepSelect.html('');

    // Add modules to the addStep dropdown
    for (var m in modulesInfo) {
      if (modulesInfo[m] && modulesInfo[m].name)
        addStepSelect.append(
          '<option value="' + m + '">' + modulesInfo[m].name + '</option>'
        );
    }
    // Null option
    addStepSelect.append('<option value="" disabled selected>Select a Module</option>');
    addStepSelect.selectize(options);
  }
  refreshOptions(options);

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
    {
      window.location.hash = '';
      location.reload();
    }
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
    } else if(dropDownValue == 'save-pdf') {
      savePDF(getLastImage());
    }
    else if (dropDownValue == 'save-to-publiclab.org' ){
      SaveToPubliclab();
    }
  });

  let isWorkingOnGifGeneration = false;

  $('.js-view-as-gif').on('click', function (event) { // GIF generation and display
    if (isWorkingOnGifGeneration) return; // Prevent multiple button clicks

    isWorkingOnGifGeneration = true;

    var button = event.target;
    button.disabled = true;
    button.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>';

    try {
      // Get GIF resources from previous steps
      let options = getGifResources();

      gifshot.createGIF(options, function (obj) { // GIF generation
        if (!obj.error) {
          // Final GIF encoded with base64 format
          var image = obj.image;
          var animatedImage = document.createElement('img');

          animatedImage.id = 'gif_element';
          animatedImage.src = image;

          let modal = $('#js-download-gif-modal');

          $('#js-download-as-gif-button').one('click', function () {
            downloadGif(image); // Trigger GIF download
            modal.modal('hide');
          });

          var gifContainer = document.getElementById('js-download-modal-gif-container');

          // Clear previous results
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
    // Returns an object with specific gif options
    let imgs = document.getElementsByClassName('step-thumbnail');
    var imgSrcs = [];

    // Pushes image sources of all the modules in the DOM
    for (var i = 0; i < imgs.length; i++) {
      imgSrcs.push(imgs[i].src);
    }

    var options = { // GIF frame options
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

  /**
  * Get the data URL for the last image in the sequence.
  * @return {string} The data URL for the last image in the sequence.
  */
  function getLastImage() {
    // Get the image from the last step.
    let imgs = document.getElementsByClassName('step-thumbnail');
    let lastStepImage = imgs[imgs.length - 1];
    return lastStepImage.getAttribute('src');
  }

  /**
  * Download the given image URL as a PDF file.
  * @param {string} imageDataURL - The data URL for the image.
  */
  function savePDF(imageDataURL) {
    sequencer.getImageDimensions(imageDataURL, function(dimensions) {
      if (isGIF(imageDataURL)) {
        // Get the dimensions of the image.
        let pageWidth = dimensions.width;
        let pageHeight = dimensions.height;

        // Create a new pdf with the same dimensions as the image.
        const pdf = new jsPDF({
          orientation: pageHeight > pageWidth ? 'portrait' : 'landscape',
          unit: 'px',
          format: [pageHeight, pageWidth]
        });

        // Add the image to the pdf with dimensions equal to the internal dimensions of the page.
        pdf.addImage(imageDataURL, 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

        // Save the pdf with the filename specified here:
        pdf.save('index.pdf');
      }
      else console.log('GIFs cannot be converted to PDF');
    });
  }



  function downloadGif(image) {
    download(image, 'index.gif', 'image/gif'); // Downloadjs library function
  }

  function SaveToPubliclab() {
    function postToPL(imgSrc) {
      var uniq = Date.now();
      $('body').append('<form method="post" id="postToPL' + uniq + '" action="https://publiclab.org/post" target="postToPLWindow"><input type="hidden" name="datauri_main_image" /></form>');
      f = $('#postToPL' + uniq)[0];
      f.datauri_main_image.value = imgSrc;
      window.open('', 'postToPLWindow');
      f.submit();
    }
    postToPL($('img')[sequencer.steps.length - 1].src);
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

      insertPreview.updatePreviews(reader.result, document.querySelector('#addStep'));
      DefaultHtmlStepUi(sequencer).updateDimensions(step);
    },
    onTakePhoto: function (url) {
      var step = sequencer.steps[0];
      step.output.src = url;
      sequencer.run({ index: 0 });
      if (typeof step.options !== 'undefined')
        step.options.step.imgElement.src = url;
      else
        step.imgElement.src = url;
      insertPreview.updatePreviews(url, document.querySelector('#addStep'));
      DefaultHtmlStepUi(sequencer).updateDimensions(step);
    }
  });

  setupCache();

  if (urlHash.getUrlHashParameter('src')) {  // Gets the sequence from the URL
    insertPreview.updatePreviews(urlHash.getUrlHashParameter('src'), document.querySelector('#addStep'));
  } else {
    insertPreview.updatePreviews('images/tulips.png', document.querySelector('#addStep'));
  }
};