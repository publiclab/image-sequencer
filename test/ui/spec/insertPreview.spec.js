describe('Preview UI HTML', function() {

  var InsertPreview = require('../../../examples/lib/insertPreview');
  var sequencer = require('../../../src/ImageSequencer')();
  var insertPreview;
  var options = { brightness: 50 };

  // TODO: Add rigorous tests with virtual DOM Nodes
  const DomNode = {};

  beforeEach(()=>{
    insertPreview = InsertPreview;

    spyOn(insertPreview, 'generatePreview');
    spyOn(insertPreview, 'updatePreviews');

    insertPreview.generatePreview('brightness', options, 'src', DomNode);
    insertPreview.updatePreviews('src',  DomNode);
  });

  it('generate preview ui', function() {
    expect(insertPreview.generatePreview).toHaveBeenCalledWith('brightness', options, 'src', DomNode);
  });

  it('update preview ui', function() {
    expect(insertPreview.updatePreviews).toHaveBeenCalledWith('src',  DomNode);
  });

});