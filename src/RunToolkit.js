const getPixels = require('get-pixels');
const pixelManipulation = require('./modules/_nomodule/PixelManipulation');
const lodash = require('lodash');
const dataUriToBuffer = require('data-uri-to-buffer');
const savePixels = require('save-pixels');

module.exports = function(input) {
  input.getPixels = getPixels;
  input.pixelManipulation = pixelManipulation;
  input.lodash = lodash;
  input.dataUriToBuffer = dataUriToBuffer;
  input.savePixels = savePixels;
  return input;
};