const scopeQuery = require('../../../examples/lib/scopeQuery');

describe('scopeQuery Method', function() {

  beforeAll(() => {
    const { JSDOM } = require('jsdom');

    var { window } = new JSDOM(`
      <body>
        <div id="scope1">
          <div class="child" id="child1">Child1</div>
          <div class="child" id="child2">Child2</div>
          <div class="child" id="child3">Child3</div>
          <div class="child" id="child4">Child4</div>
          <div class="child" id="child5">Child5</div>
          <div class="child" id="child6">Child6</div>
        </div>

        <div id="scope2">
          <div class="child" id="child1">Child1Scope2</div>
          <div class="child" id="child2">Child2Scope2</div>
          <div class="child" id="child3">Child3Scope2</div>
          <div class="child" id="child4">Child4Scope2</div>
          <div class="child" id="child5">Child5Scope2</div>
        </div>
      </body>`);

    const { document } = window;
    global.window = window;
    global.document = document;
    const $ = global.jQuery = global.$ = require('jquery');
  });
  
  
  it('scope 1 querySelector', function() {

    const $scope1 = scopeQuery.scopeSelector(document.querySelector('#scope1'));
    const $scope1All = scopeQuery.scopeSelectorAll(document.querySelector('#scope1'));

    expect($scope1('.child').length).toBe(1);
    expect($scope1All('.child').length).toBe(6);

    expect($scope1('#child1').text()).toBe('Child1');
    expect($scope1('#child2').text()).toBe('Child2');

    expect($scope1All('#child1').text()).toBe('Child1');
    expect($scope1All('#child2').text()).toBe('Child2');

    expect($scope1().elem('.child').length).toBe(1);
    expect($scope1().elemAll('.child').length).toBe(6);

    expect($scope1All().elem('.child').length).toBe(1);
    expect($scope1All().elemAll('.child').length).toBe(6);
  });

  it('scope 2 querySelector', function() {

    const $scope2 = scopeQuery.scopeSelector(document.querySelector('#scope2'));
    const $scope2All = scopeQuery.scopeSelectorAll(document.querySelector('#scope2'));

    expect($scope2('.child').length).toBe(1);
    expect($scope2All('.child').length).toBe(5);

    expect($scope2('#child1').text()).toBe('Child1Scope2');
    expect($scope2('#child2').text()).toBe('Child2Scope2');

    expect($scope2All('#child1').text()).toBe('Child1Scope2');
    expect($scope2All('#child2').text()).toBe('Child2Scope2');

    expect($scope2().elem('.child').length).toBe(1);
    expect($scope2().elemAll('.child').length).toBe(5);

    expect($scope2All().elem('.child').length).toBe(1);
    expect($scope2All().elemAll('.child').length).toBe(5);
  });

});

global.document = null;
global.$ = null;
DOM = null;