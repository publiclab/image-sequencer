// TODO: potentially move this into ImportImage module
function setInputStepInit() {

  return function setInputStep(options) {

    var dropzone = $(options.dropZoneSelector);
    var fileInput = $(options.fileInputSelector);
    var takePhoto = $(options.takePhotoSelector);
 
    var onLoad = options.onLoad;
    var onTakePhoto = options.onTakePhoto;

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

    function runVideo(){
      /* event handler for Take-Photo */
      document.getElementById('video').style.display = 'inline';
      document.getElementById('capture').style.display = 'inline';
      document.getElementById('close').style.display = 'inline';

      fileInput.css('display', 'none');
      takePhoto.css('display', 'none');
      document.getElementById('dropzone-text').style.display = 'none';
      
      var video = document.getElementById('video');
      canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      vendorUrl = window.URL || window.webkitURL;

      const constraints = { audio: false, video: true};

      function handleSuccess(stream) {
        window.stream = stream; // make stream available to browser console
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
          video.play();
        };

        document.getElementById('capture').addEventListener('click', function(stream){
          context.drawImage(video, 0, 0, 400, 300);
          options.onTakePhoto(canvas.toDataURL());
        });

        document.getElementById('close').addEventListener('click', function () {
          stopStream(stream);
        });
      }
      function handleError(error) {
        console.log('navigator.getUserMedia error: ', error);

        // when user dismissed the camera access (includes closing of prompt which requests for camera access)
        if(error.message == 'Permission denied' || error.message == 'NotAllowedError' || error.message == 'PermissionDismissedError'){
          document.getElementById('capture').addEventListener('click', function(e) {
            alert('Enable camera access in order to take picture');
          });
        }
        
        // when user don't have webcam to use.
        if(error.message == 'NotFoundError' || error.message == 'DevicesNotFoundError'){
          alert('You do not have appropriate devices to use this Functionality');
        }

        // when webcam is already used by some other application
        if(error.message == 'NotReadableError' || error.message == 'TrackStartError' || error.message == 'Concurrent mic process limit'){
          alert('Your webcam is already in use by some other application');
        }

        // when some of the requested constraints can't be satisfied like high frame rate or high resolution
        if(error.message == 'OverconstrainedError' || error.message == 'ConstraintNotSatisfiedError'){
          console.log('Requested Constraints can not be satisfied ', error);
        }
      }
      navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
      
      document.getElementById('close').addEventListener('click', function() {
        video.style.display = 'none';
      });


      function stopStream(stream) {
        stream.getVideoTracks().forEach(function (track) {
          track.stop();
        });
        document.getElementById('video').style.display = 'none';
        document.getElementById('capture').style.display = 'none';
        document.getElementById('close').style.display = 'none';

        fileInput.css('display', 'block');
        takePhoto.css('display', 'block');
        document.getElementById('dropzone-text').style.display = 'block';
      }
    }
 
    fileInput.on('change', handleFile);
    takePhoto.on('click', runVideo);
 
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

  };

}
module.exports = setInputStepInit;
