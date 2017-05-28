sharp = require('sharp');
function log2(i){
console.log('\x1b[31m%s\x1b[0m:',"This is the output of the module");
console.log(sequencer.steps[i].get());
}
require('./src/ImageSequencerNode');
sequencer = ImageSequencer();
sequencer.loadImage('examples/grid.png');
sequencer.addStep('do-nothing');
