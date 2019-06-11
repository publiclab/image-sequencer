const testModule = require('../templates/module-test.1');
image = require('../images/IS-QR'),
options = {
  blur: 1.8,
  highThresholdRatio: 0.18,
  lowThresholdRatio: 0.16
};

testModule('edge-detect', options, image);