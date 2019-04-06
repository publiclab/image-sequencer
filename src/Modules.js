/*
* Core modules and their info files
*/
module.exports = {
  'add-qr': require('./modules/AddQR'),
  'average': require('./modules/Average'),
  'blend': require('./modules/Blend'),
  'blur': require('./modules/Blur'),
  'brightness': require('./modules/Brightness'),
  'channel': require('./modules/Channel'),
  'colorbar': require('./modules/Colorbar'),
  'color-temperature': require('./modules/ColorTemperature'),
  'colormap': require('./modules/Colormap'),
  'contrast': require('./modules/Contrast'),
  'convolution': require('./modules/Convolution'),
  'crop': require('./modules/Crop'),
  'decode-qr': require('./modules/DecodeQr'),
  'dither': require('./modules/Dither'),
  'draw-rectangle': require('./modules/DrawRectangle'),
  'dynamic': require('./modules/Dynamic'),
  'edge-detect': require('./modules/EdgeDetect'),
  'exposure': require('./modules/Exposure'),
  'flip-image': require('./modules/FlipImage'),
  'fisheye-gl': require('./modules/FisheyeGl'),
  'histogram': require('./modules/Histogram'),
  'gamma-correction': require('./modules/GammaCorrection'),
  'gradient': require('./modules/Gradient'),
  'grid-overlay': require('./modules/GridOverlay'),
  'import-image': require('./modules/ImportImage'),
  'invert': require('image-sequencer-invert'),
  'ndvi': require('./modules/Ndvi'),
  'ndvi-colormap': require('./modules/NdviColormap'),
  'paint-bucket': require('./modules/PaintBucket'),
  'overlay': require('./modules/Overlay'),
  'replace-color': require('./modules/ReplaceColor'),
  'resize': require('./modules/Resize'),
  'rotate': require('./modules/Rotate'),
  'saturation': require('./modules/Saturation'),
  'text-overlay': require('./modules/TextOverlay'),
  'threshold': require('./modules/Threshold'),
  'tint': require('./modules/Tint'),
  'canvas-resize': require('./modules/CanvasResize')
}
