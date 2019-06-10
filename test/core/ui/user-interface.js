var test = require('tape');
var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;

var DOM = new JSDOM('<body></body>');

global.document = DOM.window.document;

var DefaultHtmlStepUi = require('../../../examples/lib/defaultHtmlStepUi');
var sequencer = require('../../../src/ImageSequencer.js')();
var UserInterface = require('../../../src/ui/UserInterface');

test('Notify function works for all three UIs', function (t) {
  //Mocking console.log for testing default notify()
  function doesLogMessage(f, message) {
    var oldLog = console.log,
      result = false;
    console.log = function (s) {
      if (s == message) {
        result = true;
      }
    };
    f('Test Message');
    console.log = oldLog;
    return result;
  }
  t.equal(doesLogMessage(UserInterface().notify, 'Test Message'),true,'Default notify() produces correct output');
  sequencer.setUI(DefaultHtmlStepUi(sequencer));
  t.equal(typeof sequencer.events.notify, 'function', 'Html UI contains notify function');
  t.end();
});
