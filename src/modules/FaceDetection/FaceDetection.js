createFileFromUrl = function(path, url, callback) {
  let request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.onload = function(ev) {
    if (request.readyState === 4) {
      if (request.status === 200) {
                
        let data = new Uint8Array(request.response);
        cv.FS_createDataFile('/', 'haarcascade_frontalface_default.xml', data, true, false, false);
                
        callback();
      } else {
        console.log('Failed to load ' + url + ' status: ' + request.status);
      }
    }
  };
  request.send();
};




module.exports = function(pixels, callback){
  var canvas = document.createElement('canvas');
  canvas.width = pixels.shape[0];
  canvas.height = pixels.shape[1];
  var ctx = canvas.getContext('2d');
  ctx.putImageData(new ImageData(new Uint8ClampedArray(pixels.data), pixels.shape[0], pixels.shape[1]), 0, 0);
    
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  
  let src = cv.matFromImageData(imgData);
    
  let gray = new cv.Mat();
    
  let faces = new cv.RectVector();
  let classifier = new cv.CascadeClassifier();
    
  let faceCascadeFile = 'cascade/haarcascade_frontalface_default.xml'; // path to xml
  // console.log(window.location.pathname)
  createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
        
    classifier.load('/haarcascade_frontalface_default.xml'); // in the callback, load the cascade from file
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    try{
            
      classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
      // console.log(faces.size());
    }catch(err){
      console.log(err);
    }
    for (let i = 0; i < faces.size(); ++i) {
      let face = faces.get(i);
      let point1 = new cv.Point(face.x, face.y);
      let point2 = new cv.Point(face.x + face.width, face.y + face.height);
      cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
    }
    cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);
    cv.imshow(canvas, src);
    var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    pixels.data = myImageData.data;
    if(callback) callback();
         
  });

};
  