const benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAArSURBVKXBAQEAAAiAIPP/ti7VCGFm7wgkkkgiiSSSSCKJJJJIIokkkkiiB53vAu3tsMmFAAAAAElFTkSuQmCC',
  testModule = require('../templates/module-test');

testModule('colormap', {colormap: 'blutoredjet'}, benchmark);


