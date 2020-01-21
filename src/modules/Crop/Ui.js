// hide on save
module.exports = function CropModuleUi(step, ui) {

  let inputWidth = 0,
    inputHeight = 0;

  // We don't have input image dimensions at the
  // time of setting up the UI; that comes when draw() is triggered.
  // So we trigger setup only on first run of draw()
  // TODO: link this to an event rather than an explicit call in Module.js
  function setup() {
    let x = 0,
      y = 0;

    // display original uncropped input image on initial setup
    showOriginal();

    inputWidth = Math.floor(imgEl().naturalWidth);
    inputHeight = Math.floor(imgEl().naturalHeight);

    // display with 50%/50% default crop:
    setOptions(x, y, inputWidth, inputHeight);

    $(imgEl()).imgAreaSelect({
      handles: true,
      x1: x,
      y1: y,
      x2: x + inputWidth / 2,
      y2: y + inputHeight / 2,
      // when selection is complete
      onSelectEnd: function onSelectEnd(img, selection) {
        // assign crop values to module UI form inputs:
        let converted = convertToNatural(
          selection.x1,
          selection.y1,
          selection.width,
          selection.height
        );
        setOptions(
          converted[0],
          converted[1],
          converted[2],
          converted[3]
        );
        $($(imgEl()).parents()[3]).find('input').trigger('change');
      }
    });
  }

  function convertToNatural(_x, _y, _width, _height) {
    let displayWidth = $(imgEl()).width(),
      displayHeight = $(imgEl()).height();
    // return in same order [ x, y, width, height ]:
    return [
      Math.floor(( _x / displayWidth ) * inputWidth),
      Math.floor(( _y / displayHeight ) * inputHeight),
      Math.floor(( _width / displayWidth ) * inputWidth),
      Math.floor(( _height / displayHeight ) * inputHeight)
    ];
  }

  function hide() {
    // then hide the draggable UI
    $(imgEl()).imgAreaSelect({
      hide: true
    });
  }

  // step.imgSelector is not defined, imgElement is:
  function imgEl() {
    return step.imgElement;
  }

  function setOptions(x1, y1, width, height) {
    let options = $($(imgEl()).parents()[3]).find('input');
    options[0].value = x1;
    options[1].value = y1;
    options[2].value = width;
    options[3].value = height;
  }

  // replaces currently displayed output thumbnail with the input image, for ui dragging purposes
  function showOriginal() {
    step.imgElement.src = step.input;
  }

  return {
    setup: setup,
    hide: hide
  };
};
