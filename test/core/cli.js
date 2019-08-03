'use strict';

const cliUtils = require('../../src/CliUtils');
const test = require('tape');

test('Output directory is correctly generated', function(t){
  cliUtils.makedir('./output/', function(){
    require('fs').access('./output/.', function(err){
      t.true(!err, 'Access the created dir');
      t.end();
    });
  });
});
