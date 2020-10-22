const testModule = require('../templates/module-test'),
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAklEQVR4AewaftIAAAAzSURBVLXBAQEAMAiAME7/zN4Ssr2BzzEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhJYclMCJyy7k2QAAAAASUVORK5CYII=';

options1 = {
  resize: '70.85%'
},
options2 = {
  resize: '60 %'
};
options3 = {
  resize: '90'
};
testModule('resize', {resize: '129%'}, benchmark);

require('../templates/options-test')('resize', [option1, option2, option3], [benchmark, benchmark, benchmark]);