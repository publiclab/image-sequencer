const savePixels = require('save-pixels');

/**
   * @description Returns the DataURI of an image from its pixels
   * @param {"ndarray"} pix pixels ndarray of pixels of the image.
   * @param {String} format Format/MimeType of the image input.
   * @returns {Promise} Promise with DataURI as parameter in the callback.
*/

module.exports = getDataUri = (pix, format) => {
  return new Promise(resolve => {
    let chunks = [],
      totalLength = 0;

    let r = savePixels(pix, format, {
      quality: 100
    });

    r.on('data', function(chunk) {
      totalLength += chunk.length;
      chunks.push(chunk);
    });

    r.on('end', function() {
      let data = Buffer.concat(chunks, totalLength).toString('base64');
      let datauri = 'data:image/' + format + ';base64,' + data;

      resolve(datauri);
    });
  });
};
