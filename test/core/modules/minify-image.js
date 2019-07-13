const dataURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABlBMVEX+AAD///+KQee0AAAAAWJLR0QB/wIt3gAAAAd0SU1FB+EGHRIVAvrm6EMAAAAMSURBVAjXY2AgDQAAADAAAceqhY4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMDYtMjlUMTg6MjE6MDIrMDI6MDDGD83DAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTA2LTI5VDE4OjIxOjAyKzAyOjAwt1J1fwAAAABJRU5ErkJggg==';
console.log(dataURI);
const ImageSequencer = require('../../../src/ImageSequencer');
const test = require('tape');
var atob = require('atob');

var sequencer = ImageSequencer();
var base64str = dataURI.substr(22);
var decoded = atob(base64str);


var initialSize = decoded.length;


sequencer.loadImage(dataURI, function(){
  this.addSteps('minify-image');
});


test('minify-image minifies the image', t => {
  sequencer.run(function callback(out){
    console.log(out);
    var base64str = out.substr(22);
    var decoded = atob(base64str);
    var miniifiedSize = decoded.length;
    var isLess = miniifiedSize < initialSize;
    t.equal(isLess, true, 'image minified');
    t.end();
  });
});

  