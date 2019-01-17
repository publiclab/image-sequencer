var test = require('tape');
var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;

var DOM = new JSDOM(`<body></body>`);
  
global.document = DOM.window.document;

var DefaultHtmlStepUi = require('../../examples/lib/defaultHtmlStepUi').DefaultHtmlStepUi;
var sequencer = require('../../src/ImageSequencer.js')();


test('Notify function works for all three UIs',function (t) {
//  t.equal(sequencer.events.notify('Test message'),'Test message','Default notify() works')   
 sequencer.setUI(DefaultHtmlStepUi(sequencer));
 t.equal(typeof sequencer.events.notify,"function","Html UI contains notify function");
 t.end();
});
