const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAklEQVR4AewaftIAAAAzSURBVLXBAQEAMAiAME7/zN4Ssr2BzzEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhJYclMCJyy7k2QAAAAASUVORK5CYII=';

testModule('resize', {resize: '129%'}, benchmark);