const benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4T2Pc4u39n4ECwDhqAMNoGDCMhgHDsAgDALGCJKF4bsMPAAAAAElFTkSuQmCC',
  testModule = require('../templates/module-test');

testModule('contrast', {contrast: -40}, benchmark);