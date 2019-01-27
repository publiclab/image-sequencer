describe('URL manipulation methods', function() {

  var UrlHash = require('../examples/lib/urlHash')
  var urlHash;
  var params = { who: 'me' }

  beforeEach(()=>{
    urlHash = UrlHash

    spyOn(urlHash,'getUrlHashParameters')
    spyOn(urlHash,'getUrlHashParameter')
    spyOn(urlHash,'setUrlHashParameters')

    urlHash.getUrlHashParameters()
    urlHash.getUrlHashParameter('value')
    urlHash.setUrlHashParameters(params)
  })

  it('gets url hash params from window hash', function() {
    expect(urlHash.getUrlHashParameters).toHaveBeenCalled()
  })

  it('gets url hash param from params object', function() {
    expect(urlHash.getUrlHashParameter).toHaveBeenCalledWith('value')
  })

  it('accepts param object and sets url hash params', function() {
    expect(urlHash.setUrlHashParameters).toHaveBeenCalledWith(params)
  })

})