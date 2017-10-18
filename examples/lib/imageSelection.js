function setupFileHandling(_sequencer, dropzoneId, fileInputId) {

  dropzoneId = dropzoneId || "dropzone";
  var dropzone = $('#' + dropzoneId);

  fileInputId = fileInputId || "fileInput";
  var fileInput = $('#' + fileInputId);

  function handleFile(e) {

    e.preventDefault();
    e.stopPropagation(); // stops the browser from redirecting.

    if (e.target && e.target.files) var file = e.target.files[0];
    else var file = e.dataTransfer.files[0];
    if(!file) return;

    reader.onload = function onFileReaderLoad() {
      var loadStep = _sequencer.images.image1.steps[0];
      loadStep.output.src = reader.result;
      _sequencer.run(0);
      loadStep.options.step.imgElement.src = reader.result;
    }

    reader.readAsDataURL(file);
  }

  fileInput.on('change', handleFile);

  dropzone[0].addEventListener('drop', handleFile, false);

  dropzone.on('dragover', function onDragover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }, false);

  dropzone.on('dragenter', function onDragEnter(e) {
    dropzone.addClass('hover');
  });

  dropzone.on('dragleave', function onDragLeave(e) {
    dropzone.removeClass('hover');
  });

}
