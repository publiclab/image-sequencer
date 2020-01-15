module.exports = function(url){
    
  const toMatch = url.match('data:image/(.*);');

  return toMatch[1] === 'gif';
};