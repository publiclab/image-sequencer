module.exports = function(url){
  if(url.match){
    const toMatch = url.match(/data:image\/(.*);/) || 'png';
    return toMatch[1] === 'gif';
  }else
    return false;
};
