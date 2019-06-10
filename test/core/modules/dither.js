const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAklEQVR4AewaftIAAAB/SURBVKXBAQHAIAAEoXP9OzM/g9BlKlOZylSmMpWpzKn04OtCgwYNGjRo0KBT6cHXhQYNGjRo0KBBp9KDrwsNGjRo0KBBg06lB18XGjRo0KBBgwadSg++LjRo0KBBgwYNOpUefF1o0KBBgwYNGnQqPfi60KBBgwYNGjToVHrwA6E21z8iJpDFAAAAAElFTkSuQmCC';

testModule('dither', {dither: 'bayer'}, benchmark);