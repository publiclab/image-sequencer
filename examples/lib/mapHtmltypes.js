function mapHtmlTypes(inputInfo){
  var htmlType;
  switch(inputInfo.type.toLowerCase()){
    case 'integer':
      htmlType = inputInfo.min != undefined ? 'range' : 'number';
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
    case 'range':
      htmlType = 'range';
      break;
    case 'number':
      htmlType = 'number';
      break;
    default:
      htmlType = 'text';
      break;
  }
  return {
    ...inputInfo,
    type: htmlType
  }
}

module.exports = mapHtmlTypes;