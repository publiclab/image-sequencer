var gifshot = require('gifshot');

function setGifGenerator(viewGifBtn, imgSrcSel, gifClass, gifCb){
  var isWorkingOnGifGeneration = false;

  $(viewGifBtn || '.view-as-gif-btn').on('click', function(event) {
    // Prevent user from triggering generation multiple times
    if (isWorkingOnGifGeneration) return;
    isWorkingOnGifGeneration = true;
    var button = event.target;
    button.disabled = true;

    try {
      // Select all images from previous steps
      var imgs = $(imgSrcSel || '.step-thumbnail');
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
          animatedImage.classList.add(gifClass || 'gif-img');
          animatedImage.src = image;

          // Callback with the image as a param
          gifCb(animatedImage);

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