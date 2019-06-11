const testModule = require('../templates/module-test.1'),
  options = {size:200, qrCodeString:'https://github.com/publiclab/image-sequencer'};
console.log('############ WASM Benchmarks ############');
testModule('add-qr', options);