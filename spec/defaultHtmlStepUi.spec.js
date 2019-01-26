var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;
var DOM = new JSDOM(`<body></body>`);

global.document = DOM.window.document;

describe('Sequencer step HTML', function() {

  var DefaultHtmlStepUi = require('../examples/lib/defaultHtmlStepUi')
  var sequencer = require('../src/ImageSequencer')()
  var defaultHtmlStepUi;

  beforeEach(()=>{
    defaultHtmlStepUi = new DefaultHtmlStepUi(sequencer)

    spyOn(defaultHtmlStepUi,'getPreview')
    spyOn(defaultHtmlStepUi,'onSetup')
    spyOn(defaultHtmlStepUi,'onComplete')
    spyOn(defaultHtmlStepUi,'onRemove')
    spyOn(defaultHtmlStepUi,'onDraw')
    spyOn(defaultHtmlStepUi,'notify')

    defaultHtmlStepUi.getPreview()
    defaultHtmlStepUi.onSetup()
    defaultHtmlStepUi.onComplete()
    defaultHtmlStepUi.onRemove()
    defaultHtmlStepUi.onDraw()
    defaultHtmlStepUi.notify()
  })

  it('load initial setup ui', function() {
    expect(defaultHtmlStepUi.onSetup).toHaveBeenCalled()
  })

  it('load completion ui', function() {
    expect(defaultHtmlStepUi.onComplete).toHaveBeenCalled()
  })

  it('remove step ui', function() {
    expect(defaultHtmlStepUi.onRemove).toHaveBeenCalled()
  })

  it('draw step ui', function() {
    expect(defaultHtmlStepUi.onDraw).toHaveBeenCalled()
  })

  it('notification ui', function() {
    expect(defaultHtmlStepUi.notify).toHaveBeenCalled()
  })

  it('result preview ui', function() {
    expect(defaultHtmlStepUi.getPreview).toHaveBeenCalled()
  })
})