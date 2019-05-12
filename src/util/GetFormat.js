/*
* Determine format from a URL or data-url, return "jpg" "png" "gif" etc
* TODO: write a test for this using the examples
*/
module.exports = function GetFormat(src) {

  var format = undefined; // haha default

  // EXAMPLE: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z";
  // EXAMPLE: "http://example.com/example.png"
  // EXAMPLE: "/example.png"

  if (isDataUrl(src)) {
    format = src.split(';')[0].split('/').pop();
  } else {
    format = src.split('.').pop();
  }

  function isDataUrl(src) {
    return src.substr(0, 10) === 'data:image';
  }

  format = format.toLowerCase();

  if (format === 'jpeg') format = 'jpg';

  function validateFormat(data){
    let supportedFormats = [
      'jpg',
      'jpeg',
      'png',
      'gif',
      'canvas',
    ];
    return supportedFormats.includes(data);
  }

  return validateFormat(format)?format:'jpg';

};
