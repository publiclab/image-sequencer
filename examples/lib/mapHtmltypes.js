/**
 * @description Maps module input types to their respective html <input> tag types.
 * @param {Object} inputInfo Object containing the type and optionally min/max for range type inputs.
 */
function mapHtmlTypes(inputInfo){
  var htmlType;
  switch(inputInfo.type.toLowerCase()){
  case 'integer':
    htmlType = inputInfo.min != undefined ? 'range' : 'number';
    break;
  case 'string':
    htmlType = 'text';
    break;
  case 'select':
    htmlType = 'select';
    break;
  case 'percentage':
    htmlType = 'number';
    break;
  case 'float':
    htmlType = inputInfo.min != undefined ? 'range' : 'text';
    break;
  default:
    htmlType = 'text';
    break;
  }
  var response = Object.assign({}, inputInfo);
  response.type = htmlType;
  return response;
}

module.exports = mapHtmlTypes;