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

  function generatePreview(previewStepName, customValues, path) {

    var previewSequencer = ImageSequencer();
    function insertPreview(src) {
      var img = document.createElement('img');
      img.classList.add('img-thumbnail')
      img.classList.add('no-border');
      img.src = src;
      $(img).css("max-width", "200%");
      $(img).css("transform", "translateX(-20%)");
      var stepDiv = $('#insertStep .row').find('div').each(function() {
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

  function updatePreviews(src) {
    $('#insertStep img').remove();

    var previewSequencerSteps = {
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
      generatePreview(step, Object.values(previewSequencerSteps)[index], src);
    });
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
      console.log(sequencer);
    // if (getUrlHashParameter('src')) {
    //   updatePreviews(getUrlHashParameter('src'));
    // } else {
    //   updatePreviews("images/tulips.png");
    // }
    updateThumbnails();
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
    setUrlHashParameter("steps", _sequencer.toString());

  }

  function updateThumbnails(){
    updatePreviews(_sequencer.images.image1.steps[0].options.step.imgElement.src)
  }
  return {
    insertStep,
    updateThumbnails
  }
}