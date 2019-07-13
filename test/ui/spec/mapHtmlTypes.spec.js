describe('HTML Types Mapping Function', function() {

  var mapHtmlTypes = require('../../../examples/lib/mapHtmltypes');

  it('maps range and number types', function() {
    expect(mapHtmlTypes({type: 'percentage'})).toEqual({type: 'number'});

    expect(mapHtmlTypes({type: 'integer'})).toEqual({type: 'number'});
    expect(mapHtmlTypes({type: 'integer', min: 20, max: 100})).toEqual({type: 'range', min: 20, max: 100});

    expect(mapHtmlTypes({type: 'float'})).toEqual({type: 'text'});
    expect(mapHtmlTypes({type: 'float', min: 20, max: 100})).toEqual({type: 'range', min: 20, max: 100});
  });

  it('maps text type', function() {
    expect(mapHtmlTypes({type: 'string'})).toEqual({type: 'text'});
    expect(mapHtmlTypes({type: 'anything'})).toEqual({type: 'text'});
  });

  it('maps select type', function() {
    expect(mapHtmlTypes({type: 'select'})).toEqual({type: 'select'});
  });

});