describe('Preview UI HTML', function() {

  var InsertPreview = require('../examples/lib/insertPreview')
  var sequencer = require('../src/ImageSequencer')()
  var insertPreview;

  beforeEach(()=>{
    insertPreview = InsertPreview

    spyOn(insertPreview,'generatePreview')
    spyOn(insertPreview,'updatePreviews')

    insertPreview.generatePreview()
    insertPreview.updatePreviews()
  })

  it('generate preview ui', function() {
    expect(insertPreview.generatePreview).toHaveBeenCalled()
  })

  it('update preview ui', function() {
    expect(insertPreview.updatePreviews).toHaveBeenCalled()
  })

})