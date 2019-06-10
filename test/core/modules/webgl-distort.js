const testModule = require('../templates/module-test'),
  options = {
    nw: '0,0',
    ne: '10,4',
    se: '10,5',
    sw: '0,4'
  },
  benchmark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAp0lEQVQ4T62SsQ3CMBBF3y/YgDUYAQE9IzACEvS0LAAZgRGoYQZGAXpzKFISWYmxzsCV1v/vnnTWCwy4CRaCO4WjBtDVBFvBwcsZAKJibTUXPHKwHMBl5QL0rGaCZ/tWCoitNoLj14CfDf4HqEkGS4Oz9/ZxTv1SgJNg5YUNAG3RYGpwAUbZj+TZFKASrFPZjwapsMHE4AqMuyt4DFKZAHvBrsggBXoDQmQp9u/Xo6IAAAAASUVORK5CYII=';

testModule('webgl-distort', options, benchmark);
