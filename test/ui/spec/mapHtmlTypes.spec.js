describe('HTML Types Mapping Function', function() {

  var mapHtmlTypes = require('../../../examples/lib/mapHtmltypes');

  it('maps range and number types', function() {
    expect(mapHtmlTypes({type: 'percentage'})).toEqual({type: 'number'});

    expect(mapHtmlTypes({type: 'integer'})).toEqual({type: 'number'});
    expect(mapHtmlTypes({type: 'integer', min: 20, max: 100})).toEqual({type: 'range', min: 20, max: 100, step: 1});
    expect(mapHtmlTypes({type: 'float', min: 20, max: 100})).toEqual({type: 'range', min: 20, max: 100, step: 0.1}); // should default to step = 1

    expect(mapHtmlTypes({type: 'float'})).toEqual({type: 'text'});
    expect(mapHtmlTypes({type: 'float', min: 20, max: 100})).toEqual({type: 'range', min: 20, max: 100, step: 0.1});
    expect(mapHtmlTypes({type: 'float', min: 20, max: 100})).toEqual({type: 'range', min: 20, max: 100, step: 0.1}); // should default to step = 0.1
  });

  it('maps text type', function() {
    expect(mapHtmlTypes({type: 'string'})).toEqual({type: 'text'});
    expect(mapHtmlTypes({type: 'anything'})).toEqual({type: 'text'});
  });

  it('maps select type', function() {
    expect(mapHtmlTypes({type: 'select'})).toEqual({type: 'select'});
  });

});
