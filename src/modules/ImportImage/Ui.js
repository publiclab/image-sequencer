// hide on save
module.exports = function ImportImageModuleUi(step, ui) {

  function setup(setImage, onLoad) {

    // generate a unique timestamp based id for the dropzone
    var dropzoneId = 'dropzone-import-image-' + step.ID;

    // add a file input listener
    var dropZone ='\
    <div class="dropzone" style="padding: 30px;margin: 10px 20% 30px;border: 4px dashed #ccc;border-radius: 8px;text-align: center;color: #444;" id="' + dropzoneId + '">\
          <p>\
        <i>Select or drag in an image to overlay.</i>\
      </p>\
      <center>\
        <input type="file" class="file-input" value="">\
      </center>\
    </div>';

    // insert into .details area
    // TODO: develop API-based consistent way to add UI elements
    $(step.ui)
      .find('.details')
      .prepend(dropZone);

    // setup file input listener
    sequencer.setInputStep({
      dropZoneSelector: '#' + dropzoneId,
      fileInputSelector: '#' + dropzoneId + ' .file-input',
      onLoad: function onLoadFromInput(progress) {
        var reader = progress.target;
        step.options.imageUrl = reader.result;
        step.options.url = reader.result;
        sequencer.run();
        setUrlHashParameter('steps', sequencer.toString());
      }
    });

    $(step.ui)
      .find('.btn-save').on('click', function onClickSave() {

        var src = $(step.ui)
          .find('.det input').val();
        step.options.imageUrl = src;
        sequencer.run();

      });

  }

  return {
    setup: setup
  };
};
