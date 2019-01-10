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
    var hash = getUrlHashParameter("steps");

    if (hash) {
      _sequencer.importString(hash);
      _sequencer.run({ index: 0 });
    }
    setUrlHashParameter("steps", sequencer.toString());
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
    setUrlHashParameter("steps", sequencer.toString());
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

    //enable save-sequence button if disabled initially
    handleSaveSequence();

    // add to URL hash too
    setUrlHashParameter("steps", _sequencer.toString());
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

// Set the UI in sequencer. This Will generate HTML based on
// Image Sequencer events :
// onSetup : Called every time a step is added
// onDraw : Called every time a step starts draw
// onComplete : Called every time a step finishes drawing
// onRemove : Called everytime a step is removed
// The variable 'step' stores useful data like input and
// output values, step information.
// See documetation for more details.
function stepRemovedNotify() {
  if ($('#stepRemovedNotification').length == 0) {
    var notification = document.createElement('span');
    notification.innerHTML = ' <i class="fa fa-info-circle" aria-hidden="true"></i> Step Removed ';
    notification.id = 'stepRemovedNotification';

    $('body').append(notification);
  }

  $('#stepRemovedNotification').fadeIn(500).delay(200).fadeOut(500);
}
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
    <h3>' +step.name + 
    ' <span class="toggle"><i class="fa fa-caret-up" aria-hidden="true"></i></span>' +
      '</h3><div class="collapse"><p><i>"'+
      (step.description || "") +
      '</i></p></div>\
    </div>\
    </form>\
    <div class="col-md-8 collapse">\
    <div class="load" style="display:none;"><i class="fa fa-circle-o-notch fa-spin"></i></div>\
    <a><img alt="" style="max-width=100%" class="img-thumbnail step-thumbnail"/></a>\
    </div>\
    </div>\
    </div>\
    </div>';

    var tools =
      '<div class="collapse"><div class="tools btn-group">\
       <button confirm="Are you sure?" onclick="stepRemovedNotify()" class="remove btn btn btn-default">\
         <i class="fa fa-trash"></i>\
       </button>\
       <button class="btn  insert-step" style="margin-left:10px;border-radius:6px;background-color:#fff;border:solid #bababa 1.1px;" >\
         <i class="fa fa-plus"></i> Add\
       </button>\
       </div>\
       </div>';

    var util = IntermediateHtmlStepUi(_sequencer, step);

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
          "<div class='det collapse'>\
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
        '<div class="collapse"><p><button type="submit" class="btn btn-default btn-save" disabled = "true" >Apply</button><span> Press apply to see changes</span></p></div>'
      );

      
    }

    if (step.name != "load-image") {
      step.ui
        .querySelector("div.details")
        .appendChild(
          parser.parseFromString(tools, "text/html").querySelector("div")
        );
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
    $(step.ui.querySelector(".toggle")).on("click", (e) => {
      var className = e.target.className;
      console.log("ele "+element)
      if(className=="fa fa-caret-up"){
        $(step.ui.querySelectorAll(".collapse")).show();
        e.target.className="fa fa-caret-down";
      }
      else{ 
        $(step.ui.querySelectorAll(".collapse")).hide();
        //e.target.localName.toggleClass('fa-caret-up');
        e.target.className="fa fa-caret-up";
      }
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
        setUrlHashParameter("steps", _sequencer.toString());

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
  }

  function onComplete(step) {
    $(step.ui.querySelector(".load")).hide();
    $(step.ui.querySelector("img")).show();

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

  return {
    getPreview: getPreview,
    onSetup: onSetup,
    onComplete: onComplete,
    onRemove: onRemove,
    onDraw: onDraw
  }
}

function IntermediateHtmlStepUi(_sequencer, step, options) {
  function stepUI() {
    return '<div class="row insertDiv">\
        <div class="col-md-6" style="margin-top:5%">\
        <section id="insertStep" class="panel panel-primary">\
          <div class="form-inline">\
            <div class="panel-body">\
              <p class="info">Select a new module to add to your sequence.</p>\
              <div class="row center-align radio-group">\
                <div>\
                  <button type="button" class="btn btn-default btn-circle btn-xl radio" data-value="brightness">\
                    <i class="fa fa-sun-o fa-4x"></i>\
                  </button>\
                  <p>Brightness</p>\
                </div>\
                <div>\
                  <button type="button" class="btn btn-default btn-circle btn-xl radio" data-value="contrast">\
                    <i class="fa fa-adjust fa-4x"></i>\
                  </button>\
                  <p>Contrast</p>\
                </div>\
                <div>\
                  <button type="button" class="btn btn-default btn-circle btn-xl radio" data-value="saturation">\
                    <i class="fa fa-tint fa-4x"></i>\
                  </button>\
                  <p>Saturation</p>\
                </div>\
                <div>\
                  <button type="button" class="btn btn-default btn-circle btn-xl radio" data-value="rotate">\
                    <i class="fa fa-rotate-right fa-4x"></i>\
                  </button>\
                  <p>Rotate</p>\
                </div>\
                <div>\
                  <button type="button" class="btn btn-default btn-circle btn-xl radio" data-value="crop">\
                    <i class="fa fa-crop fa-4x"></i>\
                  </button>\
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
  insertStep = function(id) {
    var modulesInfo = _sequencer.modulesInfo();
    var parser = new DOMParser();
    var addStepUI = stepUI();
    addStepUI = parser.parseFromString(addStepUI, "text/html").querySelector("div")
    step.ui
      .querySelector("div.step")
      .insertAdjacentElement('afterend',
        addStepUI
      );
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
    $('#insertStep .radio-group .radio').on("click", function() {
      $(this).parent().find('.radio').removeClass('selected');
      $(this).addClass('selected');
      newStep = $(this).attr('data-value');
      insertStepSelect.val(newStep);
      selectNewStepUi();
      insert(id);
      $(this).removeClass('selected');
    });
    $(step.ui.querySelector("#insertStep select")).on('change', selectNewStepUi);
    $(step.ui.querySelector("#insertStep #add-step-btn")).on('click', function() { insert(id) });
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
    setUrlHashParameter("steps", _sequencer.toString());

  }
  return {
    insertStep
  }
}
$(document).ready(function($){
	$(function(){
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100){
				$('.move-up').fadeIn();
			} else {
				$('.move-up').fadeOut();
			}
		});
		$('.move-up button').click(function(){
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
});

const staticCacheName = 'image-sequencer-static-v3';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker');
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('image-sequencer-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName){
          return caches.delete(cacheName);
        })
      );
    })
  );      
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(staticCacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          if(event.request.method == "GET")
            cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
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
