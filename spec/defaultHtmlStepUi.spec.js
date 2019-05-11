var { JSDOM } = require('jsdom');
var DOM = new JSDOM('<body></body>');

global.document = DOM.window.document;

describe('Sequencer step HTML', function() {

  var DefaultHtmlStepUi = require('../examples/lib/defaultHtmlStepUi');
  var sequencer = require('../src/ImageSequencer')();
  var defaultHtmlStepUi;
  var step = 'brightness';
  var options = {
    name: 'Brightness',
    description: 'Change the brightness of the image by given percent value'
  };
  // options = JSON.parse(options)

  beforeEach(()=>{
    defaultHtmlStepUi = new DefaultHtmlStepUi(sequencer);

    spyOn(defaultHtmlStepUi,'getPreview');
    spyOn(defaultHtmlStepUi,'onSetup');
    spyOn(defaultHtmlStepUi,'onComplete');
    spyOn(defaultHtmlStepUi,'onDraw');
    spyOn(defaultHtmlStepUi,'onRemove');
    spyOn(defaultHtmlStepUi,'notify');

    defaultHtmlStepUi.getPreview();
    defaultHtmlStepUi.onSetup(step,options);
    defaultHtmlStepUi.onComplete(step);
    defaultHtmlStepUi.onDraw(step);
    defaultHtmlStepUi.onRemove(step);
    defaultHtmlStepUi.notify('Step removed','remove-notification');
  });


  it('result preview ui', function() {
    expect(defaultHtmlStepUi.getPreview).toHaveBeenCalled();
  });

  it('load initial setup ui', function() {
    expect(defaultHtmlStepUi.onSetup).toHaveBeenCalledWith(step,options);
  });

  it('load completion ui', function() {
    expect(defaultHtmlStepUi.onComplete).toHaveBeenCalledWith(step);
  });

  it('draw step ui', function() {
    expect(defaultHtmlStepUi.onDraw).toHaveBeenCalledWith(step);
  });

  it('remove step ui', function() {
    expect(defaultHtmlStepUi.onRemove).toHaveBeenCalledWith(step);
  });

  it('notification ui', function() {
    expect(defaultHtmlStepUi.notify).toHaveBeenCalledWith('Step removed','remove-notification');
  });

});