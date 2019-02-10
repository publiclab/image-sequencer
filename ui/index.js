var defaultHtmlSequencerUi = require('./sequencer/sequence/defaultHtmlSequencerUi'),
  defaultHtmlStepUi = require('./sequencer/step/defaultHtmlStepUi'),
  saveSequence = require('./sequencer/sequence/saveSequence'),
  setGifGenerator = require('./sequencer/sequence/gif'),
  setupCache = require('./sw/cache'),
  sw = require('./sw/sw'),
  urlHash = require('./sequencer/sequence/urlHash'),
  setDefaultSequencer = require('./sequencer/setDefaultSequencer');

module.exports = {
  generateSequencerUi: defaultHtmlSequencerUi,
  generateStepUi: defaultHtmlStepUi,
  setSequenceSave: saveSequence,
  setGifGenerator,
  setupCache,
  sw,
  urlHash,
  setDefaultSequencer
}