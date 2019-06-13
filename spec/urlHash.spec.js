describe('URL manipulation methods', function() {

  var UrlHash = require('../examples/lib/urlHash');
  var urlHash;
  var params = {
    module: 'brightness',
    brightness: 50
  };

  beforeEach(()=>{
    urlHash = UrlHash;

    spyOn(urlHash, 'getUrlHashParameters');
    spyOn(urlHash, 'getUrlHashParameter');
    spyOn(urlHash, 'setUrlHashParameters');
    spyOn(urlHash, 'setUrlHashParameter');

    urlHash.getUrlHashParameters();
    urlHash.getUrlHashParameter('module');
    urlHash.setUrlHashParameters(params);
    urlHash.setUrlHashParameter('module', 'brightness');
  });

  it('gets url hash params from window hash', function() {
    expect(urlHash.getUrlHashParameters).toHaveBeenCalled();
  });

  it('gets url hash param from params object', function() {
    expect(urlHash.getUrlHashParameter).toHaveBeenCalledWith('module');
  });

  it('accepts param object and sets url hash params', function() {
    expect(urlHash.setUrlHashParameters).toHaveBeenCalledWith(params);
  });

  it('accepts param key-value pair and sets url hash params', function() {
    expect(urlHash.setUrlHashParameter).toHaveBeenCalledWith('module', 'brightness');
  });

});