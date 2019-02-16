(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var defaultHtmlSequencerUi = require('./lib/defaultHtmlSequencerUi.js'),
    setupCache = require('./lib/cache.js'),
    intermediateHtmlStepUi = require('./lib/intermediateHtmlStepUi.js'),
    DefaultHtmlStepUi = require('./lib/defaultHtmlStepUi.js'),
    urlHash = require('./lib/urlHash.js'),
    insertPreview = require('./lib/insertPreview.js');

window.onload = function() {
  sequencer = ImageSequencer();

  function refreshOptions() {
    // Load information of all modules (Name, Inputs, Outputs)
    var modulesInfo = sequencer.modulesInfo();

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

  $(window).on('scroll', scrollFunction);

  function scrollFunction() {
    var shouldDisplay = $('body').scrollTop() > 20 || $(':root').scrollTop() > 20;

    $('#move-up').css({
       display: shouldDisplay ? 'block' : 'none'
    });
  }


  function topFunction() {
    $('body').animate({scrollTop: 0});
    $(':root').animate({scrollTop: 0});
  }

  $('#move-up').on("click",topFunction);


  // UI for each step:
  sequencer.setUI(DefaultHtmlStepUi(sequencer));

  // UI for the overall demo:
  var ui = defaultHtmlSequencerUi(sequencer);

  // find any `src` parameters in URL hash and attempt to source image from them and run the sequencer
  if (urlHash.getUrlHashParameter('src')) {
    sequencer.loadImage(urlHash.getUrlHashParameter('src'), ui.onLoad);
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
      var util= intermediateHtmlStepUi(sequencer);
      step.output.src = reader.result;
      sequencer.run({ index: 0 });
      step.options.step.imgElement.src = reader.result;
      insertPreview.updatePreviews(reader.result,'addStep');
      insertPreview.updatePreviews(sequencer.images.image1.steps[0].options.step.imgElement.src,'insertStep');
    },
    onTakePhoto: function (url) {
      var step = sequencer.images.image1.steps[0];
      step.output.src = url;
      sequencer.run({ index: 0 });
      step.options.step.imgElement.src = url;
    }
  });

  setupCache();

  if (urlHash.getUrlHashParameter('src')) {
    insertPreview.updatePreviews(urlHash.getUrlHashParameter('src'),'addStep');
  } else {
    insertPreview.updatePreviews("images/tulips.png",'addStep');
  }
};
},{"./lib/cache.js":2,"./lib/defaultHtmlSequencerUi.js":3,"./lib/defaultHtmlStepUi.js":4,"./lib/insertPreview.js":5,"./lib/intermediateHtmlStepUi.js":6,"./lib/urlHash.js":7}],2:[function(require,module,exports){
var setupCache = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/examples/' })
      .then(function(registration) {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          console.log(installingWorker)
          if (installingWorker.state === 'installed') {
            location.reload();
          }
        }
        console.log('Registration successful, scope is:', registration.scope);
      })
      .catch(function(error) {
        console.log('Service worker registration failed, error:', error);
      });
  }

  if ('serviceWorker' in navigator) {
    caches.keys().then(function(cacheNames) {
      cacheNames.forEach(function(cacheName) {
        $("#clear-cache").append(" " + cacheName);
      });
    });
  }

  $("#clear-cache").click(function() {
    if ('serviceWorker' in navigator) {
      caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
          caches.delete(cacheName);
        });
      });
    }
    location.reload();
  });
}

module.exports = setupCache;
},{}],3:[function(require,module,exports){
var urlHash = require('./urlHash.js');
function DefaultHtmlSequencerUi(_sequencer, options) {

  options = options || {};
  var addStepSel = options.addStepSel = options.addStepSel || "#addStep";
  var removeStepSel = options.removeStepSel = options.removeStepSel || "button.remove";
  var selectStepSel = options.selectStepSel = options.selectStepSel || "#selectStep";

  function onLoad() {
    importStepsFromUrlHash();
    if (!$('#selectStep').val())
      $(addStepSel + " #add-step-btn").prop("disabled", true);
      handleSaveSequence();
  }

  // look up needed steps from Url Hash:
  function importStepsFromUrlHash() {
    var hash = urlHash.getUrlHashParameter("steps");

    if (hash) {
      _sequencer.importString(hash);
      _sequencer.run({ index: 0 });
    }
    urlHash.setUrlHashParameter("steps", sequencer.toString());
  }

  function selectNewStepUi() {
    var m = $(addStepSel + " select").val();
    $(addStepSel + " .info").html(_sequencer.modulesInfo(m).description);
    $(addStepSel + " #add-step-btn").prop("disabled", false);
  }

  function removeStepUi() {
    var index = $(removeStepSel).index(this) + 1;
    sequencer.removeSteps(index).run({ index: index - 1 });
    // remove from URL hash too
    urlHash.setUrlHashParameter("steps", sequencer.toString());
    //disable save-sequence button if all steps are removed
    handleSaveSequence();
  }

  function addStepUi() {
    if ($(addStepSel + " select").val() == "none") return;

    var newStepName = $(addStepSel + " select").val();

    /*
    * after adding the step we run the sequencer from defined step
    * and since loadImage is not a part of the drawarray the step lies at current
    * length - 2 of the drawarray
    */
    var sequenceLength = 1;
    if (sequencer.sequences[newStepName]) {
      sequenceLength = sequencer.sequences[newStepName].length;
    } else if (sequencer.modules[newStepName][1]["length"]) {
      sequenceLength = sequencer.modules[newStepName][1]["length"];
    }
    _sequencer
      .addSteps(newStepName, options)
      .run({ index: _sequencer.images.image1.steps.length - sequenceLength - 1 });
      $(addStepSel + " .info").html("Select a new module to add to your sequence.");
      $(addStepSel + " select").val("none");

    //enable save-sequence button if disabled initially
    handleSaveSequence();

    // add to URL hash too
    urlHash.setUrlHashParameter("steps", _sequencer.toString());
  }

  function handleSaveSequence(){
    var stepCount=sequencer.images.image1.steps.length;
    if(stepCount<2)
    $(" #save-seq").prop("disabled", true);
    else
    $(" #save-seq").prop("disabled", false);
  }

  return {
    onLoad: onLoad,
    importStepsFromUrlHash: importStepsFromUrlHash,
    selectNewStepUi: selectNewStepUi,
    removeStepUi: removeStepUi,
    addStepUi: addStepUi
  }
}

module.exports = DefaultHtmlSequencerUi;


},{"./urlHash.js":7}],4:[function(require,module,exports){
// Set the UI in sequencer. This Will generate HTML based on
// Image Sequencer events :
// onSetup : Called every time a step is added
// onDraw : Called every time a step starts draw
// onComplete : Called every time a step finishes drawing
// onRemove : Called everytime a step is removed
// The variable 'step' stores useful data like input and
// output values, step information.
// See documetation for more details.

var intermediateHtmlStepUi = require('./intermediateHtmlStepUi.js');
var urlHash = require('./urlHash.js');

function DefaultHtmlStepUi(_sequencer, options) {
  
  options = options || {};
  var stepsEl = options.stepsEl || document.querySelector("#steps");
  var selectStepSel = options.selectStepSel = options.selectStepSel || "#selectStep";

  function onSetup(step, stepOptions) {
    if (step.options && step.options.description)
      step.description = step.options.description;

    step.ui =
      '\
      <div class="container">\
    <div class="row step">\
    <form class="input-form">\
    <div class="col-md-4 details">\
    <h3>\
    <span class = "toggle">' +step.name + ' <i class="fa fa-caret-up toggleIcon" aria-hidden="true"></i></span>' +
    '<span class="load-spin" style="display:none;"><i class="fa fa-circle-o-notch fa-spin"></i></span>' +
    '</h3><div class="cal"><p><i>"'+
      (step.description || "") +
      '</i></p></div>\
    </div>\
    </form>\
    <div class="col-md-8 cal">\
    <div class="load" style="display:none;"><i class="fa fa-circle-o-notch fa-spin"></i></div>\
    <a><img alt="" style="max-width=100%" class="img-thumbnail step-thumbnail"/></a>\
    </div>\
    </div>\
    </div>\
    </div>';

    var tools =
    '<div class="cal"><div class="tools btn-group">\
    <button confirm="Are you sure?" class="remove btn btn btn-default">\
      <i class="fa fa-trash"></i>\
    </button>\
    <button class="btn  insert-step" style="margin-left:10px;border-radius:6px;background-color:#fff;border:solid #bababa 1.1px;" >\
      <i class="fa fa-plus"></i> Add\
    </button>\
    </div>\
    </div>';

    var util = intermediateHtmlStepUi(_sequencer, step);

    var parser = new DOMParser();
    step.ui = parser.parseFromString(step.ui, "text/html");
    step.ui = step.ui.querySelector("div.container");
    step.linkElements = step.ui.querySelectorAll("a");
    step.imgElement = step.ui.querySelector("a img");

    if (_sequencer.modulesInfo().hasOwnProperty(step.name)) {
      var inputs = _sequencer.modulesInfo(step.name).inputs;
      var outputs = _sequencer.modulesInfo(step.name).outputs;
      var merged = Object.assign(inputs, outputs); // combine outputs w inputs

      for (var paramName in merged) {
        var isInput = inputs.hasOwnProperty(paramName);
        var html = "";
        var inputDesc = isInput ? inputs[paramName] : {};
        if (!isInput) {
          html += '<span class="output"></span>';
        } else if (inputDesc.type.toLowerCase() == "select") {
          html += '<select class="form-control target" name="' + paramName + '">';
          for (var option in inputDesc.values) {
            html += "<option>" + inputDesc.values[option] + "</option>";
          }
          html += "</select>";
        } else {
          let paramVal = step.options[paramName] || inputDesc.default;
          html =
            '<input class="form-control target" type="' +
            inputDesc.type +
            '" name="' +
            paramName +
            '" value="' +
            paramVal +
            '" placeholder ="' +
            (inputDesc.placeholder || "");

          if (inputDesc.type.toLowerCase() == "range") {
            html +=
              '"min="' +
              inputDesc.min +
              '"max="' +
              inputDesc.max +
              '"step="' +
              inputDesc.step + '">' + '<span>' + paramVal + '</span>';

          }
          else html += '">';
        }

        var div = document.createElement("div");
        div.className = "row";
        div.setAttribute("name", paramName);
        var description = inputs[paramName].desc || paramName;
        div.innerHTML =
          "<div class='det cal'>\
                           <label for='" +
          paramName +
          "'>" +
          description +
          "</label>\
                           " +
          html +
          "\
                         </div>";
        step.ui.querySelector("div.details").appendChild(div);
      }

      $(step.ui.querySelector("div.details")).append(
        '<div class="cal"><p><button type="submit" class="btn btn-default btn-save" disabled = "true" >Apply</button><span> Press apply to see changes</span></p></div>'
      );

      
    }

    if (step.name != "load-image") {
      step.ui
        .querySelector("div.details")
        .appendChild(
          parser.parseFromString(tools, "text/html").querySelector("div")
        );
      $(step.ui.querySelectorAll(".remove")).on('click', function() {notify('Step Removed','remove-notification')});  
      $(step.ui.querySelectorAll(".insert-step")).on('click', function() { util.insertStep(step.ID) });

      // Insert the step's UI in the right place
      if (stepOptions.index == _sequencer.images.image1.steps.length) {
        stepsEl.appendChild(step.ui);
        $("#steps .container:nth-last-child(1) .insert-step").prop('disabled',true);
        if($("#steps .container:nth-last-child(2)"))
        $("#steps .container:nth-last-child(2) .insert-step").prop('disabled',false);
      } else {
        stepsEl.insertBefore(step.ui, $(stepsEl).children()[stepOptions.index]);
      }
    }
    else {
      $("#load-image").append(step.ui);
    }
    $(step.ui.querySelector(".toggle")).on("click", () => {
      $(step.ui.querySelector('.toggleIcon')).toggleClass('fa-caret-up').toggleClass('fa-caret-down');
      $(step.ui.querySelectorAll(".cal")).toggleClass("collapse");
    });
    

    function saveOptions(e) {
      e.preventDefault();
      if (optionsChanged){
        $(step.ui.querySelector("div.details"))
          .find("input,select")
          .each(function(i, input) {
            $(input)
              .data('initValue', $(input).val())
              .data('hasChangedBefore', false);
            step.options[$(input).attr("name")] = $(input).val();
          });
        _sequencer.run({ index: step.index - 1 });

        // modify the url hash
        urlHash.setUrlHashParameter("steps", _sequencer.toString());

        // disable the save button
        $(step.ui.querySelector('.btn-save')).prop('disabled', true);
        optionsChanged = false;
        changedInputs = 0;
      }
    }

    function handleInputValueChange(currentValue, initValue, hasChangedBefore) {
      var inputChanged = !(isNaN(initValue) || isNaN(currentValue) ? currentValue === initValue : currentValue - initValue === 0);
      changedInputs += hasChangedBefore ? inputChanged ? 0 : -1 : inputChanged ? 1 : 0;
      optionsChanged = changedInputs > 0;

      $(step.ui.querySelector('.btn-save')).prop('disabled', !optionsChanged);
      return inputChanged;
    }

    var 
      changedInputs = 0,
      optionsChanged = false;
    $(step.ui.querySelector('.input-form')).on('submit', saveOptions);
    $(step.ui.querySelectorAll('.target')).each(function(i, input) {
      $(input)
        .data('initValue', $(input).val())
        .data('hasChangedBefore', false)
        .on('input', function() {
          $(this)
            .focus()
            .data('hasChangedBefore',
              handleInputValueChange(
                $(this).val(),
                $(this).data('initValue'),
                $(this).data('hasChangedBefore')
            )
          )
        })
    })



    $('input[type="range"]').on('input', function() {
        $(this).next().html($(this).val());
    })
  }


  function onDraw(step) {
    $(step.ui.querySelector(".load")).show();
    $(step.ui.querySelector("img")).hide();
    if( $(step.ui.querySelector(".toggleIcon")).hasClass("fa-caret-down") )
    {
      $(step.ui.querySelector(".load-spin")).show();
    }
  }

  function onComplete(step) {
    $(step.ui.querySelector(".load")).hide();
    $(step.ui.querySelector("img")).show();
    $(step.ui.querySelector(".load-spin")).hide();

    step.imgElement.src = step.output;
    var imgthumbnail = step.ui.querySelector(".img-thumbnail");
    for (let index = 0; index < step.linkElements.length; index++) {
      if (step.linkElements[index].contains(imgthumbnail))
        step.linkElements[index].href = step.output;
    }

    // TODO: use a generalized version of this
    function fileExtension(output) {
      return output.split("/")[1].split(";")[0];
    }

    for (let index = 0; index < step.linkElements.length; index++) {
      step.linkElements[index].download = step.name + "." + fileExtension(step.output);
      step.linkElements[index].target = "_blank";
    }

    // fill inputs with stored step options
    if (_sequencer.modulesInfo().hasOwnProperty(step.name)) {
      var inputs = _sequencer.modulesInfo(step.name).inputs;
      var outputs = _sequencer.modulesInfo(step.name).outputs;
      for (var i in inputs) {
        if (step.options[i] !== undefined) {
          if (inputs[i].type.toLowerCase() === "input")
            $(step.ui.querySelector('div[name="' + i + '"] input'))
              .val(step.options[i])
              .data('initValue', step.options[i]);
          if (inputs[i].type.toLowerCase() === "select")
            $(step.ui.querySelector('div[name="' + i + '"] select'))
              .val(step.options[i])
              .data('initValue', step.options[i]);
        }
      }
      for (var i in outputs) {
        if (step[i] !== undefined)
          $(step.ui.querySelector('div[name="' + i + '"] input'))
            .val(step[i]);
      }
    }
  }

  function onRemove(step) {
    step.ui.remove();
    $("#steps .container:nth-last-child(1) .insert-step").prop('disabled',true);
    $('div[class^=imgareaselect-]').remove();
  }

  function getPreview() {
    return step.imgElement;
  }

  function notify(msg,id){
    if ($('#'+id).length == 0) {
      var notification = document.createElement('span');
      notification.innerHTML = ' <i class="fa fa-info-circle" aria-hidden="true"></i> ' + msg ;
      notification.id = id;
      notification.classList.add("notification");
  
      $('body').append(notification);
    }
  
    $('#'+id).fadeIn(500).delay(200).fadeOut(500);
  }

  return {
    getPreview: getPreview,
    onSetup: onSetup,
    onComplete: onComplete,
    onRemove: onRemove,
    onDraw: onDraw, 
    notify: notify
  }
}

if(typeof window === "undefined"){
  module.exports={
    DefaultHtmlStepUi: DefaultHtmlStepUi
  }
}

module.exports = DefaultHtmlStepUi;


},{"./intermediateHtmlStepUi.js":6,"./urlHash.js":7}],5:[function(require,module,exports){
function generatePreview(previewStepName, customValues, path, selector) {

    var previewSequencer = ImageSequencer();
    function insertPreview(src) {
      var img = document.createElement('img');
      img.classList.add('img-thumbnail')
      img.classList.add('no-border');
      img.src = src;
      $(img).css("max-width", "200%");
      $(img).css("transform", "translateX(-20%)");
      var stepDiv = $('#'+selector+' .row').find('div').each(function() {
        if ($(this).find('div').attr('data-value') === previewStepName) {
          $(this).find('div').append(img);
        }
      });
    }

    function loadPreview() {
      previewSequencer = previewSequencer.addSteps('resize', { resize: "40%" });
      if (previewStepName === "crop") {
        previewSequencer.addSteps(previewStepName, customValues).run(insertPreview);
      }
      else {
        previewSequencer.addSteps(previewStepName, { [previewStepName]: customValues }).run(insertPreview);
      }
    }
    previewSequencer.loadImage(path, loadPreview);
  }

  function updatePreviews(src, selector) {
    $('#'+selector+' img').remove();

    var previewSequencerSteps = {
      "resize": "125%",
      "brightness": "20",
      "saturation": "5",
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

    Object.keys(previewSequencerSteps).forEach(function (step, index) {
      generatePreview(step, Object.values(previewSequencerSteps)[index], src, selector);
    });
  }

module.exports = {
  generatePreview : generatePreview,
  updatePreviews : updatePreviews
}
},{}],6:[function(require,module,exports){
var urlHash = require('./urlHash.js'),
    insertPreview = require('./insertPreview.js');

function IntermediateHtmlStepUi(_sequencer, step, options) {
  function stepUI() {
    return '<div class="row insertDiv">\
        <div class="col-md-6 col-md-offset-2" style="margin-top:5%">\
        <section id="insertStep" class="panel panel-primary">\
          <div class="form-inline">\
            <div class="panel-body">\
              <p class="info">Select a new module to add to your sequence.</p>\
              <div class="row center-align radio-group">\
              <div>\
              <div class="radio" data-value="resize">\
              <i class="fa fa-arrows-alt fa-4x i-over"></i>\
            </div>\
                <p>Resize</p>\
                </div>\
                <div>\
                <div class="radio" data-value="brightness">\
                <i class="fa fa-sun-o fa-4x i-over"></i>\
              </div>\
                  <p>Brightness</p>\
                </div>\
                <div>\
                <div class="radio" data-value="contrast">\
                <i class="fa fa-adjust fa-4x i-over"></i>\
              </div>\
                  <p>Contrast</p>\
                </div>\
                <div>\
                <div class="radio" data-value="saturation">\
                <i class="fa fa-tint fa-4x i-over i-small"></i>\
              </div>\
                  <p>Saturation</p>\
                </div>\
                <div>\
                <div class="radio" data-value="rotate">\
                <i class="fa fa-rotate-right fa-4x i-over"></i>\
              </div>\
                  <p>Rotate</p>\
                </div>\
                <div>\
                <div class="radio" data-value="crop">\
                <i class="fa fa-crop fa-4x i-over"></i>\
              </div>\
                  <p>Crop</p>\
                </div>\
              </div>\
              <div class="center-align">\
                <select class="form-control input-lg" id="selectStep">\
                  <!-- The default null selection has been appended manually in demo.js\
                  This is because the options in select are overritten when options are appended.-->\
                </select>\
                <button class="btn btn-success btn-lg" name="add" id="add-step-btn">Add Step</button>\
              </div>\
            </div>\
          </div>\
        </section>\
        </div>';
  }


  function selectNewStepUi() {
    var m = $("#insertStep select").val();
    $("#insertStep .info").html(_sequencer.modulesInfo(m).description);
    $("#insertStep #add-step-btn").prop("disabled", false);
  }
  insertStep = function (id) {
    var modulesInfo = _sequencer.modulesInfo();
    var parser = new DOMParser();
    var addStepUI = stepUI();
    addStepUI = parser.parseFromString(addStepUI, "text/html").querySelector("div")
    step.ui
      .querySelector("div.step")
      .insertAdjacentElement('afterend',
        addStepUI
      );
    insertPreview.updatePreviews(step.output,'insertStep');
    var insertStepSelect = $("#insertStep select");
    insertStepSelect.html("");
    // Add modules to the insertStep dropdown
    for (var m in modulesInfo) {
      if (modulesInfo[m] !== undefined)
        insertStepSelect.append(
          '<option value="' + m + '">' + modulesInfo[m].name + "</option>"
        );
    }

    $('#insertStep #add-step-btn').prop('disabled', true);

    insertStepSelect.append('<option value="none" disabled selected>More modules...</option>');
    $('#insertStep .radio-group .radio').on("click", function () {
      $(this).parent().find('.radio').removeClass('selected');
      $(this).addClass('selected');
      newStep = $(this).attr('data-value');
      insertStepSelect.val(newStep);
      selectNewStepUi();
      insert(id);
      $(this).removeClass('selected');
    });
    $(step.ui.querySelector("#insertStep select")).on('change', selectNewStepUi);
    $(step.ui.querySelector("#insertStep #add-step-btn")).on('click', function () { insert(id) });
  }

  function insert(id) {

    options = options || {};
    var insertStepSelect = $("#insertStep select");
    if (insertStepSelect.val() == "none") return;

    var newStepName = insertStepSelect.val()
    $('div .insertDiv').remove();
    var sequenceLength = 1;
    if (sequencer.sequences[newStepName]) {
      sequenceLength = sequencer.sequences[newStepName].length;
    } else if (sequencer.modules[newStepName][1]["length"]) {
      sequenceLength = sequencer.modules[newStepName][1]["length"];
    }
    _sequencer
      .insertSteps(id + 1, newStepName).run({ index: id });

    // add to URL hash too
    urlHash.setUrlHashParameter("steps", _sequencer.toString());

  }

  return {
    insertStep
  }
}
module.exports = IntermediateHtmlStepUi;


},{"./insertPreview.js":5,"./urlHash.js":7}],7:[function(require,module,exports){
function getUrlHashParameter(param) {

  var params = getUrlHashParameters();
  return params[param];

}

function getUrlHashParameters() {

  var sPageURL = window.location.hash;
  if (sPageURL) sPageURL = sPageURL.split('#')[1];
  var pairs = sPageURL.split('&');
  var object = {};
  pairs.forEach(function(pair, i) {
    pair = pair.split('=');
    if (pair[0] != '') object[pair[0]] = pair[1];
  });
  return object;
}

// accepts an object like { paramName: value, paramName1: value }
// and transforms to: url.com#paramName=value&paramName1=value
function setUrlHashParameters(params) {

  var keys = Object.keys(params);
  var values = Object.values(params);
  var pairs = [];
  keys.forEach(function(key, i) {
    if (key != '') pairs.push(keys[i] + '=' + values[i]);
  });
  var hash = pairs.join('&');
  window.location.hash = hash;

}

function setUrlHashParameter(param, value) {

  var params = getUrlHashParameters();
  params[param] = value;
  setUrlHashParameters(params);

}

module.exports =  {
                    getUrlHashParameter: getUrlHashParameter,
                    setUrlHashParameter: setUrlHashParameter,
                    getUrlHashParameters: getUrlHashParameters,
                    setUrlHashParameters: setUrlHashParameters
                  }

},{}]},{},[1]);
