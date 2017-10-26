function ReplaceImage(ref,selector,steps,options) {
  if(!ref.options.inBrowser) return false; // This isn't for Node.js
  var tempSequencer = ImageSequencer({ui: false});
  var this_ = ref;
  var input = document.querySelectorAll(selector);
  var images = [];
  for (var i = 0; i < input.length; i++) {
    if (input[i] instanceof HTMLImageElement) images.push(input[i]);
  }

  function replaceImage (img, steps) {
    var url = img.src;
    var ext = url.split('.').pop();

    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url, true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
      var arr = new Uint8Array(this.response);
      var raw = String.fromCharCode.apply(null,arr);
      var base64 = btoa(raw);
      var dataURL="data:image/"+ext+";base64," + base64;
      make(dataURL);
    };

    if(url.substr(0,11).toLowerCase()!="data:image/") xmlHTTP.send();
    else make(url);

    function make(url) {
      tempSequencer.loadImage(url, function(){
        this.addSteps(steps).run(function(out){
          img.src = out;
        });
      });
    }
  }

  for (var i = 0; i < images.length; i++) {
    replaceImage(images[i],steps);
    if (i == images.length-1)
      options.callback();
  }
}

module.exports = ReplaceImage;
