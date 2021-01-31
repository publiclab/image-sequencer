const cliUtils = require('../../src/CliUtils');
const test = require('tape');
const ImageSequencer = require('../../src/ImageSequencer');
const { exec } = require('child_process');

test('Output directory is correctly generated', function(t){
  cliUtils.makedir('./output/', function(){
    require('fs').access('./output/.', function(err){
      t.true(!err, 'Access the created dir');
      t.end();
    });
  });
});

test('Tesing the list option in used in CLI', function(t){
  exec('./index.js -l', (err, stdout, stderr)=>{
    let result = `${stdout}`;
    let sequencer = ImageSequencer({ui: false});

    let benchmark = '';
    var infoList = sequencer.modulesInfo();
    for(var iL in infoList) {
      benchmark += '\x1b[36m' + infoList[iL]['name'] + '\x1b[0m : \x1b[33m' + infoList[iL]['description'] + '\x1b[0m' + '\n';
    }
    t.equal(result, benchmark, 'List Option Works Corectly');
    sequencer = null;
    t.end();
  });
});