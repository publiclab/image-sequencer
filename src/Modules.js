/*
* Core modules and their info files
*/
module.exports = {
  'channel': [
    require('./modules/Channel/Module'), require('./modules/Channel/info')
  ],
  'brightness': [
    require('./modules/Brightness/Module'), require('./modules/Brightness/info')
  ],
  'edge-detect': [
    require('./modules/EdgeDetect/Module'), require('./modules/EdgeDetect/info')
  ],
  'ndvi': [
    require('./modules/Ndvi/Module'), require('./modules/Ndvi/info')
  ],
  'invert': [
    require('./modules/Invert/Module'), require('./modules/Invert/info')
  ],
  'crop': [
    require('./modules/Crop/Module'), require('./modules/Crop/info')
  ],
  'colormap': [
    require('./modules/Colormap/Module'), require('./modules/Colormap/info')
  ],
  'decode-qr': [
    require('./modules/DecodeQr/Module'), require('./modules/DecodeQr/info')
  ],
  'fisheye-gl': [
    require('./modules/FisheyeGl/Module'), require('./modules/FisheyeGl/info')
  ],
  'dynamic': [
    require('./modules/Dynamic/Module'), require('./modules/Dynamic/info')
  ],
  'blur': [
    require('./modules/Blur/Module'), require('./modules/Blur/info')
  ],
  'saturation': [
    require('./modules/Saturation/Module'), require('./modules/Saturation/info')
  ],
  'average': [
    require('./modules/Average/Module'), require('./modules/Average/info')
  ],
  'blend': [
    require('./modules/Blend/Module'), require('./modules/Blend/info')
  ],
  'import-image': [
    require('./modules/ImportImage/Module'), require('./modules/ImportImage/info')
  ]
}
