// Uses a given image as input and replaces it with the output.
// Works only in the browser.
function ReplaceImage(ref, selector, steps, options) {
  if(!ref.options.inBrowser) return false; // This isn't for Node.js
  var tempSequencer = ImageSequencer({ui: false});
  var this_ = ref;
  if (window.hasOwnProperty('$')) var input = $(selector);
  else var input = document.querySelectorAll(selector);
  var images = [];
  for (var i = 0; i < input.length; i++) {
    if (input[i] instanceof HTMLImageElement) images.push(input[i]);
  }

  function replaceImage (img, steps) {
    var url = img.src;
    // refactor to filetypeFromUrl()
    var ext = url.split('?')[0].split('.').pop();

    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url, true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
      var arr = new Uint8Array(this.response);

      // in chunks to avoid "RangeError: Maximum call stack exceeded"
      // https://github.com/publiclab/image-sequencer/issues/241
      // https://stackoverflow.com/a/20048852/1116657
      var raw = '';
      var i, j, subArray, chunk = 5000;
      for (i = 0, j = arr.length; i < j; i += chunk) {
        subArray = arr.subarray(i, i + chunk);
        raw += String.fromCharCode.apply(null, subArray);
      }

      var base64 = btoa(raw);
      var dataURL = 'data:image/' + ext + ';base64,' + base64;
      make(dataURL);
    };

    if(url.substr(0, 11).toLowerCase() != 'data:image/') xmlHTTP.send();
    else make(url);

    function make(url) {
      tempSequencer.loadImage(url, function(){
        // this.addSteps(steps).run({stop:function(){}},function(out){
        var sequence = this.addSteps(steps);
        if (ref.detectStringSyntax(steps))
          sequence = this.stringToSteps(steps);
        sequence.run({stop:function(){}}, function(out){
          img.src = out;
        });
      });
    }
  }

  for (var i = 0; i < images.length; i++) {
    replaceImage(images[i], steps);
    if (i == images.length - 1)
      options.callback();
  }
}

module.exports = ReplaceImage;
