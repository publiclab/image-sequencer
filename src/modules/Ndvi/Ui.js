// hide on save
module.exports = function CropModuleUi(step, ui) {

  /* sets the pixel value under the mouse pointer
     * on the title attribute of the image element.
    */
  function setup() {
    var ndviImage = $(imgEl());

    ndviImage.mousemove(function ndviMousemove(e) {

      var canvas = document.createElement('canvas');
      canvas.width = ndviImage.width();
      canvas.height = ndviImage.height();
      canvas.getContext('2d').drawImage(this, 0, 0);

      var offset = $(this).offset();
      var xPos = e.pageX - offset.left;
      var yPos = e.pageY - offset.top;
      var ndvi = canvas.getContext('2d').getImageData(xPos, yPos, 1, 1).data[0];
      ndvi = ndvi/127.5 - 1 ;
      ndvi = ndvi.toFixed(2);
      ndviImage[0].title = 'NDVI: ' + ndvi;
    });
  }
  // step.imgSelector is not defined, imgElement is:
  function imgEl() {
    return step.imgElement;
  }

  return {
    setup: setup
  };
};
