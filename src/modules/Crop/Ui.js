module.exports = function CropModuleUi(step, ui) {

  // The problem is we don't have input image dimensions at the 
  // time of setting up the UI; that comes when draw() is triggered...
  // so we're triggering setup only on first run of draw()
  function setup() {
    // display original input image on initial setup
    showOriginal()
    let width = Math.floor(imgEl.width),
        height = Math.floor(imgEl.height),
        x1 = 0,
        y1 = 0,
        x2 = width / 2,
        y2 = height / 2;

    // display with 50%/50% default crop:
    setOptions(
      x1,
      y1,
      x2 - x1,
      y2 - y1
    )

    $(imgEl()).imgAreaSelect({
      handles: true,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      // when selection is complete
      onSelectEnd: function onSelectEnd(img, selection) {
        // assign crop values to module UI form inputs:
        setOptions(
          selection.x1,
          selection.y1,
          selection.x2 - selection.x1,
          selection.y2 - selection.y1
        )
        // then hide the draggable UI
        $(imgEl()).imgAreaSelect({
          hide: true
        });
      }
    });
  }

  // step.imgSelector is not defined, imgElement is:
  function imgEl() {
    return step.imgElement;
  }

  function setOptions(x1,y1,x2,y2) {
    let options = $($(imgEl()).parents()[2]).find("input");
    options[0].value = x1;
    options[1].value = y1;
    options[2].value = x2 - x1;
    options[3].value = y2 - y1;
  }

  // replaces currently displayed output thumbnail with the input image, for ui dragging purposes
  function showOriginal() {
    step.imgElement.src = step.input;
  }

  return {
    setup: setup
  }
}
