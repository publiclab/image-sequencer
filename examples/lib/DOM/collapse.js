module.exports = function Collapse(elem, cmd, callback){
  switch (cmd){
    case 'show':
      $(elem).addClass('custom-show');
      break;
    case 'hide':
      $(elem).removeClass('custom-show');
      break;
    default:
      $(elem).toggleClass('custom-show');
      break;
  }
}