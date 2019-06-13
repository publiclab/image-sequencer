describe('Intermediate step HTML', function() {

  var IntermediateHtmlStepUi = require('../examples/lib/intermediateHtmlStepUi');
  var sequencer = require('../src/ImageSequencer')({useWasm:true});
  var intermediateHtmlStepUi;

  beforeEach(()=>{
    intermediateHtmlStepUi = new IntermediateHtmlStepUi(sequencer);

    spyOn(intermediateHtmlStepUi,'insertStep');

    intermediateHtmlStepUi.insertStep();
  });

  it('insert step ui', function() {
    expect(intermediateHtmlStepUi.insertStep).toHaveBeenCalled();
  });

});