var gifshot = require('gifshot');

function setGifGenerator(){
  var isWorkingOnGifGeneration = false;

  $('.js-view-as-gif').on('click', function(event) {
    // Prevent user from triggering generation multiple times
    if (isWorkingOnGifGeneration) return;
    isWorkingOnGifGeneration = true;
    var button = event.target;
    button.disabled = true;

    try {
      // Select all images from previous steps
      var imgs = document.getElementsByClassName('step-thumbnail');
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
          animatedImage.classList.add('responsive-img');
          animatedImage.src = image;

          var modal = $('#js-download-gif-modal');

          $('#js-download-as-gif-button').one('click', function() {
            // Close modal
            modal.modal('close');

            // Trigger download
            download(image, 'index.gif', 'image/gif');
          })
          $('.gif-close').click(function(){
            modal.modal('close');
          })

          var gifContainer = document.getElementById('js-download-modal-gif-container');

          // Clear previous results
          gifContainer.innerHTML = '';

          // Insert image
          gifContainer.appendChild(animatedImage);


          // Open modal
          modal.modal('open');

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
  })
}

module.exports = setGifGenerator;