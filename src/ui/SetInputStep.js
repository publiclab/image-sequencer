// TODO: potentially move this into ImportImage module
function setInputStepInit() {

  return function setInputStep(options) {

    var dropzone = $(options.dropZoneSelector);
    var fileInput = $(options.fileInputSelector);
 
    onLoad = options.onLoad;
 
    var reader = new FileReader();
 
    function handleFile(e) {
 
      e.preventDefault();
      e.stopPropagation(); // stops the browser from redirecting.
 
      if (e.target && e.target.files) var file = e.target.files[0];
      else var file = e.dataTransfer.files[0];
      if(!file) return;
 
      var reader = new FileReader();
      
      reader.onload = onLoad;
 
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

}
module.exports = setInputStepInit;
