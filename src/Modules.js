/*
* Core modules and their info files
*/
module.exports = {
  'average': require('./modules/Average'),
  'blend': require('./modules/Blend'),
  'blur': require('./modules/Blur'),
  'brightness': require('./modules/Brightness'),
  'channel': require('./modules/Channel'),
  'colorbar': require('./modules/Colorbar'),
  'colormap': require('./modules/Colormap'),
  'contrast': require('./modules/Contrast'),
  'convolution': require('./modules/Convolution'),
  'crop': require('./modules/Crop'),
  'decode-qr': require('./modules/DecodeQr'),
  'dither': require('./modules/Dither'),
  'draw-rectangle': require('./modules/DrawRectangle'),
  'dynamic': require('./modules/Dynamic'),
  'edge-detect': require('./modules/EdgeDetect'),
  'fisheye-gl': require('./modules/FisheyeGl'),
  'histogram': require('./modules/Histogram'),
  'gamma-correction': require('./modules/GammaCorrection'),
  'gradient': require('./modules/Gradient'),
  'import-image': require('./modules/ImportImage'),
  'invert': require('image-sequencer-invert'),
  'ndvi': require('./modules/Ndvi'),
  'ndvi-colormap': require('./modules/NdviColormap'),
  'overlay': require('./modules/Overlay'),
  'resize': require('./modules/Resize'),
  'rotate': require('./modules/Rotate'),
  'saturation': require('./modules/Saturation'),
  'white-balance': require('./modules/WhiteBalance')
}
