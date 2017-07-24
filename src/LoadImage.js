function LoadImage(ref, name, src) {
  function CImage(src) {
    var datauri = (ref.options.inBrowser || src.substring(0,11) == "data:image/")?(src):require('urify')(src);
    var image = {
      src: datauri,
      format: datauri.split(':')[1].split(';')[0].split('/')[1]
    }
    return image;
  }

  function loadImage(name, src) {
    var image = {
      src: src,
      metadata: {},
      steps: [{
        options: {
          id: ref.options.sequencerCounter++,
          name: "load-image",
          title: "Load Image"
        },
        UI: ref.UI({
          stepName: "load-image",
          stepID: ref.options.sequencerCounter++,
          imageName: name
        }),
        draw: function() {
          if(arguments.length==1){
            this.output = CImage(arguments[0]);
            return true;
          }
          else if(arguments.length==2) {
            this.output = CImage(arguments[0]);
            arguments[1]();
            return true;
          }
          return false;
        },
        output: CImage(src)
      }]
    };
    image.metadata['load-image'] = [{
      name: name,
      src: src,
      format: image.steps[0].output.format
    }];
    image.metadata['load-image'].last = function() {
      return this[this.length-1];
    }
    ref.images[name] = image;
    ref.images[name].steps[0].UI.onSetup();
    ref.images[name].steps[0].UI.onDraw();
    ref.images[name].steps[0].UI.onComplete(image.steps[0].output.src);
  }

  return loadImage(name,src);
}

module.exports = LoadImage;
