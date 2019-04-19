var test = require('tape');
var getPixels = require("get-pixels");


var red = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z";

var getImageDimensions = require('../../../src/util/getImageDimensions');

test('getImageDimension works.', function (t) {
    
    getPixels(red,function (err, pixels){
        getImageDimensions(red,function(dim){
            t.equal(dim.width, pixels.shape[0], "correct width of image returned");
            t.equal(dim.height, pixels.shape[1], "correct height of image returned");
            t.end();
        } )
      })
});
