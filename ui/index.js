var defaultHtmlSequencerUi = require('./sequencer/sequence/defaultHtmlSequencerUi'),
  defaultHtmlStepUi = require('./sequencer/step/defaultHtmlStepUi'),
  saveSequence = require('./sequencer/sequence/saveSequence'),
  setGifGenerator = require('./sequencer/sequence/gif'),
  setupCache = require('./sw/cache'),
  sw = require('./sw/sw');

module.exports = {
  setSequencerUi: defaultHtmlSequencerUi,
  setStepUi: defaultHtmlStepUi,
  setSequenceSave: saveSequence,
  setGifGenerator,
  setupCache,
  sw
}