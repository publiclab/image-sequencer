describe('Preview UI HTML', function() {

  var InsertPreview = require('../../../examples/lib/insertPreview');
  var sequencer = require('../../../src/ImageSequencer')();
  var insertPreview;
  var options = { brightness: 50 };

  beforeEach(()=>{
    insertPreview = InsertPreview;

    spyOn(insertPreview, 'generatePreview');
    spyOn(insertPreview, 'updatePreviews');

    insertPreview.generatePreview('brightness', options, 'src', 'selector');
    insertPreview.updatePreviews('src', 'selector');
  });

  it('generate preview ui', function() {
    expect(insertPreview.generatePreview).toHaveBeenCalledWith('brightness', options, 'src', 'selector');
  });

  it('update preview ui', function() {
    expect(insertPreview.updatePreviews).toHaveBeenCalledWith('src', 'selector');
  });

});