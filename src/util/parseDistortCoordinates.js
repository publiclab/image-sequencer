module.exports = function parseDistortCoordinates(options) {

  let coord = [];
  coord.push(options.nw.split(','));
  coord.push(options.ne.split(','));
  coord.push(options.se.split(','));
  coord.push(options.sw.split(','));

  let parsedCoord = coord.reduce((acc, val) => {
    acc.push(parseInt(val[0]));
    acc.push(parseInt(val[1]));
    return acc;
  }, []);

  return parsedCoord;
};