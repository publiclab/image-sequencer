const benchmark =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAArSURBVKXBAQEAAAiAIPP/ti7VCGFm7wgkkkgiiSSSSCKJJJJIIokkkkiiB53vAu3tsMmFAAAAAElFTkSuQmCC',
  testModule = require('../templates/module-test');

testModule('colormap', { colormap: 'blutoredjet' }, benchmark);

const optionsTestModule = require('../templates/options-test');

const benchmarks = [
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAAtSURBVKXBAQEAIAyAME4I81nUbD4E25z7PoFEEkkkkUQSSSSRRBJJJJFEEkm0Ka4CUk/bqgMAAAAASUVORK5CYII=',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAArSURBVKXBAQEAMAyDMI7G+reyiyB5245AIokkkkgiiSSSSCKJJJJIIokk+ktEAhuHny9oAAAAAElFTkSuQmCC'
  ],
  options = [{ colormap: 'default' }, { colormap: 'greyscale' }];

optionsTestModule('colormap', options, benchmarks);
