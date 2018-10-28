/*
* Core modules and their info files
*/
module.exports = {
  'channel': require('./modules/Channel'),
  'brightness': require('./modules/Brightness'),
  'edge-detect': require('./modules/EdgeDetect'),
  'ndvi': require('./modules/Ndvi'),
  'crop': require('./modules/Crop'),
  'colormap': require('./modules/Colormap'),
  'decode-qr': require('./modules/DecodeQr'),
  'fisheye-gl': require('./modules/FisheyeGl'),
  'dynamic': require('./modules/Dynamic'),
  'blur': require('./modules/Blur'),
  'saturation': require('./modules/Saturation'),
  'average': require('./modules/Average'),
  'blend': require('./modules/Blend'),
  'import-image': require('./modules/ImportImage'),
  'overlay': require('./modules/Overlay'),
  'gradient': require('./modules/Gradient'),
  'invert': require('image-sequencer-invert'),
  'ndvi-colormap': require('./modules/NdviColormap'),
  'colorbar': require('./modules/Colorbar'),
  'histogram': require('./modules/Histogram'),
  'gamma-correction': require('./modules/GammaCorrection'),
  'convolution': require('./modules/Convolution'),
  'resize': require('./modules/Resize')
}