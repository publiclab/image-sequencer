const testModule = require('../templates/module-test'),
  options = {
    'replaceMethod': 'greyscale',
    'color': 'rgba(255,0,0,255)',
    'tolerance': '50'
  },
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAArSURBVKXBAQEAMAyDMI7G+reyiyB5245AIokkkkgiiSSSSCKJJJJIIokk+ktEAhuHny9oAAAAAElFTkSuQmCC';

testModule('replace-color', options, benchmark);