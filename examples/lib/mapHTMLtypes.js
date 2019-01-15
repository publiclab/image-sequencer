function mapHtmlTypes(inputInfo){
  console.log(inputInfo.type);
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
  return {
    ...inputInfo,
    type: htmlType
  }
}