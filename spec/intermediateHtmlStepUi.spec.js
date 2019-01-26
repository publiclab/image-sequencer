describe('Default HTML sequencer step', function() {

  var DefaultHtmlSequencerUi = require('../examples/lib/defaultHtmlSequencerUi')
  var sequencer = require('../src/ImageSequencer')()
  var defaultHtmlSequencerUi;

  beforeEach(()=>{
    defaultHtmlSequencerUi = new DefaultHtmlSequencerUi(sequencer)

    spyOn(defaultHtmlSequencerUi,'onLoad')
    spyOn(defaultHtmlSequencerUi,'selectNewStepUi')
    spyOn(defaultHtmlSequencerUi,'removeStepUi')
    spyOn(defaultHtmlSequencerUi,'addStepUi')
    spyOn(defaultHtmlSequencerUi,'importStepsFromUrlHash')

    defaultHtmlSequencerUi.onLoad()
    defaultHtmlSequencerUi.selectNewStepUi()
    defaultHtmlSequencerUi.addStepUi()
    defaultHtmlSequencerUi.removeStepUi()
    defaultHtmlSequencerUi.importStepsFromUrlHash()
  })

  it('load ui method works', function() {
    expect(defaultHtmlSequencerUi.onLoad).toHaveBeenCalled()
  })

  it('select step ui method works', function() {
    expect(defaultHtmlSequencerUi.selectNewStepUi).toHaveBeenCalled()
  })

  it('add step ui method works', function() {
    expect(defaultHtmlSequencerUi.addStepUi).toHaveBeenCalled()
  })

  it('remove step ui method works', function() {
    expect(defaultHtmlSequencerUi.removeStepUi).toHaveBeenCalled()
  })

  it('importing from url works', function() {
    expect(defaultHtmlSequencerUi.importStepsFromUrlHash).toHaveBeenCalled()
  })
})