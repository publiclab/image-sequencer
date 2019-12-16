module.exports = function(pixels, options, priorStep){

  var $ = require('jquery'); // To make Blob-analysis work in Node
  
  var img = $(priorStep.imgElement);
  if(Object.keys(img).length === 0){
    img = $(priorStep.options.step.imgElement);
  }

  var canvas = document.createElement('canvas');
  canvas.width = pixels.shape[0];
  canvas.height = pixels.shape[1];
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img[0], 0, 0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);


  let src = cv.matFromImageData(imgData);
  let dst = new cv.Mat();
  let gray = new cv.Mat();
  let opening = new cv.Mat();
  let imageBg = new cv.Mat();
  let imageFg = new cv.Mat();
  let distTrans = new cv.Mat();
  let unknown = new cv.Mat();
  let markers = new cv.Mat();
 
  // Gray and Threshold the image
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(gray, gray, 0, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);
 
  // Get background
  let M = cv.Mat.ones(3, 3, cv.CV_8U);
  cv.erode(gray, gray, M);
  cv.dilate(gray, opening, M);
  cv.dilate(opening, imageBg, M, new cv.Point(-1, -1), 3);
 
  // Distance transform
  cv.distanceTransform(opening, distTrans, cv.DIST_L2, 5);
  cv.normalize(distTrans, distTrans, 1, 0, cv.NORM_INF);
 
  // Get foreground
  cv.threshold(distTrans, imageFg, 0.7 * 1, 255, cv.THRESH_BINARY);
  imageFg.convertTo(imageFg, cv.CV_8U, 1, 0);
  cv.subtract(imageBg, imageFg, unknown);
 
  // Get connected components markers
  cv.connectedComponents(imageFg, markers);
  for (let i = 0; i < markers.rows; i++) {
    for (let j = 0; j < markers.cols; j++) {
      markers.intPtr(i, j)[0] = markers.ucharPtr(i, j)[0] + 1;
      if (unknown.ucharPtr(i, j)[0] == 255) {
        markers.intPtr(i, j)[0] = 0;
      }
    }
  }
 
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);
  cv.watershed(src, markers);
 
  // Grow barriers
  for (let i = 0; i < markers.rows; i++) {
    for (let j = 0; j < markers.cols; j++) {
      if (markers.intPtr(i, j)[0] == -1) {
        src.ucharPtr(i, j)[0] = 255; // Red
        src.ucharPtr(i, j)[1] = 0; // Green
        src.ucharPtr(i, j)[2] = 0; // Blue
      }
    }
  }

  cv.imshow(canvas, src);

  src.delete(); dst.delete(); gray.delete(); opening.delete(); imageBg.delete();
  imageFg.delete(); distTrans.delete(); unknown.delete(); markers.delete(); M.delete();
  
  var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  pixels.data = myImageData.data;
 
  return pixels;
};
