const benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAApSURBVKXBAQEAAAiAIPP/5mqEMAtHIJFEEkkkkUQSSSSRRBJJJJFEEj1UXgIdx5M8pQAAAABJRU5ErkJggg==',
  moduleTest = require('../templates/module-test');

moduleTest('blur', {blur: 3.25}, benchmark);

