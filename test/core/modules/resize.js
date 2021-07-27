const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAklEQVR4AewaftIAAAAzSURBVLXBAQEAMAiAME7/zN4Ssr2BzzEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhJYclMCJyy7k2QAAAAASUVORK5CYII=',

  benchmark1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAklEQVR4AewaftIAAAAkSURBVJXBAQEAMAiAME7/zN4Ksr2Bz5EEEkgggQQSSCCBBBIs6poCE8Zr7KAAAAAASUVORK5CYII=',

  benchmark2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAklEQVR4AewaftIAAAAiSURBVI3BAQEAAAiAIPP/5uqCMAtHIJFEEkkkkUQSSSTRAzwDAhGkYPRhAAAAAElFTkSuQmCC',

  benchmark3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAklEQVR4AewaftIAAAAdSURBVHXBAQEAMAiAME7/zN4Csr2Bz0GCBAkSJCwpbQIJAvmJUgAAAABJRU5ErkJggg==',

  options1 = {
    resize: '70.85%'
  },
  options2 = {
    resize: '60 %'
  },
  options3 = {
    resize: '40'
  };

testModule('resize', {resize: '129%'}, benchmark);
require('../templates/options-test')('resize', [options1, options2, options3], [benchmark1, benchmark2, benchmark3]);