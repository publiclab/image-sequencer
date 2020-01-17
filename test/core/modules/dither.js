const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAADSSURBVJ3BQWoEQQDEMLv//2dnCrYhDJtLJIH4p4rDo2IqpmIqpmIqpmJUBOKLCpW3CpWpODwqpuJSqZiKS2UqVA4PlVGpmIpLpWIqRmXsoVKh8lah8luFyhyVUZmKqRiVqbhUKuZUTMWojErFpVJxqcxRGZWKqRiVqRiViqkYe6i8VahUqPzlqFRMxaUyKlMxFVMxp0JlVCqmYipGZVQqVEYgHhUq31SoVKhcFYcPlYqpmIpRGZWKS+VUXCqjMioVUzEqFddRqZiKqbhURuVSqZgfDhnK7U8O3MsAAAAASUVORK5CYII=',
  _benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAB/SURBVKXBAQHAIAAEoXP9OzM/g9BlKlOZylSmMpWpzKn04OtCgwYNGjRo0KBT6cHXhQYNGjRo0KBBp9KDrwsNGjRo0KBBg06lB18XGjRo0KBBgwadSg++LjRo0KBBgwYNOpUefF1o0KBBgwYNGnQqPfi60KBBgwYNGjToVHrwA6E21z8iJpDFAAAAAElFTkSuQmCC',
  option = {dither: 'floydsteinberg'},
  _options = {dither: 'bayer'};
require('../templates/options-test')('dither', [option, _options], [benchmark, _benchmark]);

testModule('dither', {dither: 'floydsteinberg'}, benchmark);