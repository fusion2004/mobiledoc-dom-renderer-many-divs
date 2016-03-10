define('tests/helpers/dom', ['exports'], function (exports) {
  /* global SimpleDOM */

  'use strict';

  exports.childNodesLength = childNodesLength;
  exports.outerHTML = outerHTML;
  exports.innerHTML = innerHTML;

  function childNodesLength(element) {
    var length = 0;
    var node = element.firstChild;
    while (node) {
      length++;
      node = node.nextSibling;
    }
    return length;
  }

  function outerHTML(node) {
    if (node.outerHTML) {
      return node.outerHTML;
    } else {
      var serializer = new SimpleDOM.HTMLSerializer([]);
      return serializer.serialize(node);
    }
  }

  function innerHTML(parentNode) {
    var content = [];
    var node = parentNode.firstChild;
    while (node) {
      content.push(outerHTML(node));
      node = node.nextSibling;
    }
    return content.join('');
  }
});
QUnit.module('JSHint - tests/jshint/cards');
QUnit.test('tests/jshint/cards/image.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/cards/image.js should pass jshint.'); 
});

QUnit.module('JSHint - tests/jshint/helpers');
QUnit.test('tests/jshint/helpers/dom.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/helpers/dom.js should pass jshint.'); 
});

QUnit.module('JSHint - tests/jshint');
QUnit.test('tests/jshint/index.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/index.js should pass jshint.'); 
});

QUnit.module('JSHint - tests/jshint');
QUnit.test('tests/jshint/renderer-factory.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/renderer-factory.js should pass jshint.'); 
});

QUnit.module('JSHint - tests/jshint/renderers');
QUnit.test('tests/jshint/renderers/0-2.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/renderers/0-2.js should pass jshint.'); 
});

QUnit.module('JSHint - tests/jshint/renderers');
QUnit.test('tests/jshint/renderers/0-3.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/renderers/0-3.js should pass jshint.'); 
});

QUnit.module('JSHint - tests/jshint/unit/renderers');
QUnit.test('tests/jshint/unit/renderers/0-2-test.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/unit/renderers/0-2-test.js should pass jshint.'); 
});

QUnit.module('JSHint - tests/jshint/unit/renderers');
QUnit.test('tests/jshint/unit/renderers/0-3-test.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/unit/renderers/0-3-test.js should pass jshint.'); 
});

QUnit.module('JSHint - tests/jshint/utils');
QUnit.test('tests/jshint/utils/dom.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/utils/dom.js should pass jshint.'); 
});

QUnit.module('JSHint - tests/jshint/utils');
QUnit.test('tests/jshint/utils/marker-types.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/utils/marker-types.js should pass jshint.'); 
});

QUnit.module('JSHint - tests/jshint/utils');
QUnit.test('tests/jshint/utils/render-type.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/utils/render-type.js should pass jshint.'); 
});

QUnit.module('JSHint - tests/jshint/utils');
QUnit.test('tests/jshint/utils/section-types.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/utils/section-types.js should pass jshint.'); 
});

QUnit.module('JSHint - tests/jshint/utils');
QUnit.test('tests/jshint/utils/tag-names.js should pass jshint', function(assert) { 
  assert.ok(true, 'tests/jshint/utils/tag-names.js should pass jshint.'); 
});

define('tests/unit/renderers/0-2-test', ['exports', 'mobiledoc-dom-renderer', 'mobiledoc-dom-renderer/utils/section-types', '../../helpers/dom'], function (exports, _mobiledocDomRenderer, _mobiledocDomRendererUtilsSectionTypes, _helpersDom) {
  /* global QUnit, SimpleDOM */

  'use strict';

  var _QUnit = QUnit;
  var test = _QUnit.test;
  var _module = _QUnit.module;

  var MOBILEDOC_VERSION = '0.2.0';
  var dataUri = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=";

  var renderer = undefined;

  // Add tests that should run with both simple-dom and
  // the window.document in this function.
  function generateTests() {

    test('renders an empty mobiledoc', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], // markers
        [] // sections
        ]
      };

      var _renderer$render = renderer.render(mobiledoc);

      var rendered = _renderer$render.result;

      assert.ok(!!rendered, 'renders result');
      assert.ok(!rendered.firstChild, 'has no sections');
    });

    test('renders a mobiledoc without markups', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], // markers
        [// sections
        [_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[[], 0, 'hello world']]]]]
      };
      var renderResult = renderer.render(mobiledoc);
      var rendered = renderResult.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      assert.equal(rendered.firstChild.tagName, 'P', 'renders a P');
      assert.equal(rendered.firstChild.firstChild.nodeValue, 'hello world', 'renders the text');
    });

    test('renders a mobiledoc with simple (no attributes) markup', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[// markers
        ['B']], [// sections
        [_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[[0], 1, 'hello world']]]]]
      };

      var _renderer$render2 = renderer.render(mobiledoc);

      var rendered = _renderer$render2.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var sectionEl = rendered.firstChild;

      assert.equal(sectionEl.firstChild.tagName, 'B');
      assert.equal(sectionEl.firstChild.firstChild.nodeValue, 'hello world');
    });

    test('renders a mobiledoc with complex (has attributes) markup', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[// markers
        ['A', ['href', 'http://google.com']]], [// sections
        [_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[[0], 1, 'hello world']]]]]
      };

      var _renderer$render3 = renderer.render(mobiledoc);

      var rendered = _renderer$render3.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var sectionEl = rendered.firstChild;

      assert.equal((0, _helpersDom.innerHTML)(sectionEl), '<a href="http://google.com">hello world</a>');
      assert.equal((0, _helpersDom.innerHTML)(sectionEl), '<a href="http://google.com">hello world</a>');
    });

    test('renders a mobiledoc with multiple markups in a section', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[// markers
        ['B'], ['I']], [// sections
        [_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[[0], 0, 'hello '], // b
        [[1], 0, 'brave '], // b+i
        [[], 1, 'new '], // close i
        [[], 1, 'world'] // close b
        ]]]]
      };

      var _renderer$render4 = renderer.render(mobiledoc);

      var rendered = _renderer$render4.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var sectionEl = rendered.childNodes.item(0);

      assert.equal((0, _helpersDom.innerHTML)(sectionEl), '<b>hello <i>brave new </i>world</b>');
    });

    test('renders a mobiledoc with image section', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], // markers
        [// sections
        [_mobiledocDomRendererUtilsSectionTypes.IMAGE_SECTION_TYPE, dataUri]]]
      };

      var _renderer$render5 = renderer.render(mobiledoc);

      var rendered = _renderer$render5.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var sectionEl = rendered.childNodes.item(0);

      assert.equal(sectionEl.src, dataUri);
    });

    test('renders a mobiledoc with built-in image card', function (assert) {
      assert.expect(3);
      var cardName = 'image';
      var payload = {
        src: dataUri
      };
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], // markers
        [// sections
        [_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, cardName, payload]]]
      };

      var _renderer$render6 = renderer.render(mobiledoc);

      var rendered = _renderer$render6.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var sectionEl = rendered.childNodes.item(0);

      assert.equal(sectionEl.firstChild.tagName, 'IMG');
      assert.equal(sectionEl.firstChild.src, dataUri);
    });

    test('render mobiledoc with list section and list items', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], [[_mobiledocDomRendererUtilsSectionTypes.LIST_SECTION_TYPE, 'ul', [[[[], 0, 'first item']], [[[], 0, 'second item']]]]]]
      };

      var _renderer$render7 = renderer.render(mobiledoc, document.createElement('div'));

      var rendered = _renderer$render7.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');

      var section = rendered.firstChild;
      assert.equal(section.tagName, 'UL');

      assert.equal((0, _helpersDom.childNodesLength)(section), 2, '2 list items');

      assert.equal(section.firstChild.tagName, 'LI', 'correct tagName for item 1');
      assert.equal(section.firstChild.firstChild.nodeValue, 'first item', 'correct text node for item 1');

      assert.equal(section.lastChild.tagName, 'LI', 'correct tagName for item 2');
      assert.equal(section.lastChild.firstChild.nodeValue, 'second item', 'correct text node for item 2');
    });

    test('renders a mobiledoc with card section', function (assert) {
      assert.expect(7);
      var cardName = 'title-card';
      var expectedPayload = { name: 'bob' };
      var expectedOptions = { foo: 'bar' };
      var TitleCard = {
        name: cardName,
        type: 'dom',
        render: function render(_ref) {
          var env = _ref.env;
          var options = _ref.options;
          var payload = _ref.payload;
          var name = env.name;
          var isInEditor = env.isInEditor;
          var onTeardown = env.onTeardown;

          assert.equal(name, cardName, 'has name');
          assert.ok(!isInEditor, 'not isInEditor');
          assert.ok(!!onTeardown, 'has onTeardown');

          assert.deepEqual(options, expectedOptions);
          assert.deepEqual(payload, expectedPayload);

          return document.createTextNode(payload.name);
        }
      };
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], // markers
        [// sections
        [_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, cardName, expectedPayload]]]
      };
      renderer = new _mobiledocDomRenderer['default']({ cards: [TitleCard], cardOptions: expectedOptions });

      var _renderer$render8 = renderer.render(mobiledoc);

      var rendered = _renderer$render8.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var sectionEl = rendered.firstChild;

      assert.equal((0, _helpersDom.innerHTML)(sectionEl), expectedPayload.name);
    });

    test('throws when given invalid card type', function (assert) {
      var cardName = 'bad';
      var card = {
        name: cardName,
        type: 'text',
        render: function render() {}
      };
      var cards = [card];
      assert.throws(function () {
        new _mobiledocDomRenderer['default']({ cards: cards });
      }, // jshint ignore: line
      new RegExp('Card "' + cardName + '" must be of type "' + _mobiledocDomRenderer.RENDER_TYPE + '"'));
    });

    test('throws when given card without `render`', function (assert) {
      var cardName = 'bad';
      var card = {
        name: cardName,
        type: _mobiledocDomRenderer.RENDER_TYPE,
        render: undefined
      };
      var cards = [card];
      assert.throws(function () {
        new _mobiledocDomRenderer['default']({ cards: cards });
      }, // jshint ignore: line
      new RegExp('Card "' + cardName + '" must define `render`'));
    });

    test('throws if card render returns invalid result', function (assert) {
      var card = {
        name: 'bad',
        type: 'dom',
        render: function render() {
          return 'string';
        }
      };
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, card.name]]]
      };

      renderer = new _mobiledocDomRenderer['default']({ cards: [card] });
      assert.throws(function () {
        return renderer.render(mobiledoc);
      }, /Card "bad" must render dom/);
    });

    test('card may render nothing', function (assert) {
      var card = {
        name: 'ok',
        type: 'dom',
        render: function render() {}
      };
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, card.name]]]
      };

      renderer = new _mobiledocDomRenderer['default']({ cards: [card] });
      renderer.render(mobiledoc);

      assert.ok(true, 'No error thrown');
    });

    test('rendering nested mobiledocs in cards', function (assert) {
      var renderer = undefined;
      var cards = [{
        name: 'nested-card',
        type: 'dom',
        render: function render(_ref2) {
          var payload = _ref2.payload;

          var _renderer$render9 = renderer.render(payload.mobiledoc);

          var rendered = _renderer$render9.result;

          return rendered;
        }
      }];

      var innerMobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], // markers
        [// sections
        [_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[[], 0, 'hello world']]]]]
      };

      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], // markers
        [// sections
        [_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, 'nested-card', { mobiledoc: innerMobiledoc }]]]
      };

      renderer = new _mobiledocDomRenderer['default']({ cards: cards });

      var _renderer$render10 = renderer.render(mobiledoc);

      var rendered = _renderer$render10.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var card = rendered.firstChild;
      assert.equal((0, _helpersDom.childNodesLength)(card), 1, 'card has 1 child');
      assert.equal(card.firstChild.tagName, 'P', 'card has P child');
      assert.equal(card.firstChild.innerText, 'hello world');
    });

    test('rendering unknown card without unknownCardHandler throws', function (assert) {
      var cardName = 'not-known';
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, cardName]]]
      };
      renderer = new _mobiledocDomRenderer['default']({ cards: [], unknownCardHandler: undefined });
      assert.throws(function () {
        return renderer.render(mobiledoc);
      }, new RegExp('Card "' + cardName + '" not found.*no unknownCardHandler'));
    });

    test('rendering unknown card uses unknownCardHandler', function (assert) {
      assert.expect(5);

      var cardName = 'my-card';
      var expectedOptions = {};
      var expectedPayload = {};

      var unknownCardHandler = function unknownCardHandler(_ref3) {
        var env = _ref3.env;
        var options = _ref3.options;
        var payload = _ref3.payload;

        assert.equal(env.name, cardName, 'name is correct');
        assert.ok(!env.isInEditor, 'not in editor');
        assert.ok(!!env.onTeardown, 'has onTeardown');

        assert.deepEqual(options, expectedOptions, 'correct options');
        assert.deepEqual(payload, expectedPayload, 'correct payload');
      };

      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, cardName, expectedPayload]]]
      };
      renderer = new _mobiledocDomRenderer['default']({
        cards: [], cardOptions: expectedOptions, unknownCardHandler: unknownCardHandler
      });
      renderer.render(mobiledoc);
    });

    test('throws if given an object of cards', function (assert) {
      var cards = {};
      assert.throws(function () {
        new _mobiledocDomRenderer['default']({ cards: cards });
      }, // jshint ignore: line
      new RegExp('`cards` must be passed as an array'));
    });

    test('multiple spaces should preserve whitespace with nbsps', function (assert) {
      var space = ' ';
      var repeat = function repeat(str, count) {
        var result = '';
        while (count--) {
          result += str;
        }
        return result;
      };
      var text = [repeat(space, 4), 'some', repeat(space, 5), 'text', repeat(space, 6)].join('');
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], // markers
        [// sections
        [_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[[], 0, text]]]]]
      };

      var nbsp = ' ';
      var sn = space + nbsp;
      var expectedText = [repeat(sn, 2), 'some', repeat(sn, 2), space, 'text', repeat(sn, 3)].join('');

      var _renderer$render11 = renderer.render(mobiledoc);

      var rendered = _renderer$render11.result;

      var textNode = rendered.firstChild.firstChild;
      assert.equal(textNode.nodeValue, expectedText, 'renders the text');
    });

    test('throws when given unexpected mobiledoc version', function (assert) {
      var mobiledoc = {
        version: '0.1.0',
        sections: [[], []]
      };

      assert.throws(function () {
        return renderer.render(mobiledoc);
      }, /Unexpected Mobiledoc version.*0.1.0/);

      mobiledoc.version = '0.2.1';
      assert.throws(function () {
        return renderer.render(mobiledoc);
      }, /Unexpected Mobiledoc version.*0.2.1/);
    });

    test('XSS: unexpected markup and list section tag names are not renderered', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'script', [[[], 0, 'alert("markup section XSS")']]], [_mobiledocDomRendererUtilsSectionTypes.LIST_SECTION_TYPE, 'script', [[[[], 0, 'alert("list section XSS")']]]]]]
      };

      var _renderer$render12 = renderer.render(mobiledoc);

      var result = _renderer$render12.result;

      var content = (0, _helpersDom.outerHTML)(result);
      assert.ok(content.indexOf('script') === -1, 'no script tag rendered');
    });

    test('XSS: unexpected markup types are not rendered', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[['b'], // valid
        ['em'], // valid
        ['script'] // invalid
        ], [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'p', [[[0], 0, 'bold text'], [[1, 2], 3, 'alert("markup XSS")'], [[], 0, 'plain text']]]]]
      };

      var _renderer$render13 = renderer.render(mobiledoc);

      var result = _renderer$render13.result;

      var content = (0, _helpersDom.outerHTML)(result);
      assert.ok(content.indexOf('script') === -1, 'no script tag rendered');
    });

    test('renders a mobiledoc with sectionElementRenderer', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        sections: [[], // markers
        [// sections
        [_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[[], 0, 'hello world']]], [_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'p', [[[], 0, 'hello world']]], [_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'h1', [[[], 0, 'hello world']]]]]
      };
      renderer = new _mobiledocDomRenderer['default']({
        sectionElementRenderer: {
          p: function p() {
            return document.createElement('pre');
          },
          H1: function H1(tagName, dom) {
            return dom.createElement('h2');
          }
        }
      });
      var renderResult = renderer.render(mobiledoc);
      var rendered = renderResult.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 3, 'renders three sections');
      assert.equal(rendered.firstChild.tagName, 'PRE', 'renders a pre');
      assert.equal(rendered.firstChild.textContent, 'hello world', 'renders the text');
      assert.equal(rendered.childNodes.item(1).tagName, 'PRE', 'renders a pre');
      assert.equal(rendered.lastChild.tagName, 'H2', 'renders an h2');
    });
  }

  _module('Unit: Mobiledoc DOM Renderer - 0.2', {
    beforeEach: function beforeEach() {
      renderer = new _mobiledocDomRenderer['default']();
    }
  });

  generateTests();

  test('teardown removes rendered sections from dom', function (assert) {
    var mobiledoc = {
      version: MOBILEDOC_VERSION,
      sections: [[], [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'p', [[[], 0, 'Hello world']]]]]
    };

    var _renderer$render14 = renderer.render(mobiledoc);

    var rendered = _renderer$render14.result;
    var teardown = _renderer$render14.teardown;

    assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');

    var fixture = document.getElementById('qunit-fixture');
    fixture.appendChild(rendered);

    assert.ok((0, _helpersDom.childNodesLength)(fixture) === 1, 'precond - result is appended');

    teardown();

    assert.ok((0, _helpersDom.childNodesLength)(fixture) === 0, 'rendered result removed after teardown');
  });

  test('teardown hook calls registered teardown methods', function (assert) {
    var cardName = 'title-card';
    var didTeardown = false;

    var card = {
      name: cardName,
      type: 'dom',
      render: function render(_ref4) {
        var env = _ref4.env;

        env.onTeardown(function () {
          return didTeardown = true;
        });
      }
    };

    var mobiledoc = {
      version: MOBILEDOC_VERSION,
      sections: [[], [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, cardName]]]
    };

    renderer = new _mobiledocDomRenderer['default']({ cards: [card] });

    var _renderer$render15 = renderer.render(mobiledoc);

    var teardown = _renderer$render15.teardown;

    assert.ok(!didTeardown, 'teardown not called');

    teardown();

    assert.ok(didTeardown, 'teardown called');
  });

  _module('Unit: Mobiledoc DOM Renderer w/ SimpleDOM - 0.2', {
    beforeEach: function beforeEach() {
      renderer = new _mobiledocDomRenderer['default']({ dom: new SimpleDOM.Document() });
    }
  });

  generateTests();
});
define('tests/unit/renderers/0-3-test', ['exports', 'mobiledoc-dom-renderer', 'mobiledoc-dom-renderer/cards/image', 'mobiledoc-dom-renderer/utils/section-types', '../../helpers/dom', 'mobiledoc-dom-renderer/utils/marker-types'], function (exports, _mobiledocDomRenderer, _mobiledocDomRendererCardsImage, _mobiledocDomRendererUtilsSectionTypes, _helpersDom, _mobiledocDomRendererUtilsMarkerTypes) {
  /* global QUnit, SimpleDOM */

  'use strict';

  var _QUnit = QUnit;
  var test = _QUnit.test;
  var _module = _QUnit.module;

  var MOBILEDOC_VERSION = '0.3.0';
  var dataUri = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=";

  var renderer = undefined;

  // Add tests that should run with both simple-dom and
  // the window.document in this function.
  function generateTests() {

    test('renders an empty mobiledoc', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [],
        markups: [],
        sections: []
      };

      var _renderer$render = renderer.render(mobiledoc);

      var rendered = _renderer$render.result;

      assert.ok(!!rendered, 'renders result');
      assert.equal((0, _helpersDom.childNodesLength)(rendered), 0, 'has no sections');
    });

    test('renders a mobiledoc without markups', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 0, 'hello world']]]]
      };
      var renderResult = renderer.render(mobiledoc);
      var rendered = renderResult.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      assert.equal(rendered.firstChild.tagName, 'P', 'renders a P');
      assert.equal(rendered.firstChild.firstChild.nodeValue, 'hello world', 'renders the text');
    });

    test('renders a mobiledoc with simple (no attributes) markup', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [],
        markups: [['B']],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [0], 1, 'hello world']]]]
      };

      var _renderer$render2 = renderer.render(mobiledoc);

      var rendered = _renderer$render2.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var sectionEl = rendered.firstChild;

      assert.equal((0, _helpersDom.innerHTML)(sectionEl), '<b>hello world</b>');
    });

    test('renders a mobiledoc with complex (has attributes) markup', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [],
        markups: [['A', ['href', 'http://google.com']]],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [0], 1, 'hello world']]]]
      };

      var _renderer$render3 = renderer.render(mobiledoc);

      var rendered = _renderer$render3.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var sectionEl = rendered.firstChild;

      assert.equal((0, _helpersDom.innerHTML)(sectionEl), '<a href="http://google.com">hello world</a>');
    });

    test('renders a mobiledoc with multiple markups in a section', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [],
        markups: [['B'], ['I']],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [0], 0, 'hello '], // b
        [_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [1], 0, 'brave '], // b+i
        [_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 1, 'new '], // close i
        [_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 1, 'world'] // close b
        ]]]
      };

      var _renderer$render4 = renderer.render(mobiledoc);

      var rendered = _renderer$render4.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var sectionEl = rendered.firstChild;

      assert.equal((0, _helpersDom.innerHTML)(sectionEl), '<b>hello <i>brave new </i>world</b>');
    });

    test('renders a mobiledoc with image section', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.IMAGE_SECTION_TYPE, dataUri]]
      };

      var _renderer$render5 = renderer.render(mobiledoc);

      var rendered = _renderer$render5.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var sectionEl = rendered.firstChild;

      assert.equal(sectionEl.src, dataUri);
    });

    test('renders a mobiledoc with built-in image card', function (assert) {
      assert.expect(3);
      var cardName = _mobiledocDomRendererCardsImage['default'].name;
      var payload = { src: dataUri };
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [[cardName, payload]],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, 0]]
      };

      var _renderer$render6 = renderer.render(mobiledoc);

      var rendered = _renderer$render6.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var sectionEl = rendered.firstChild;

      assert.equal(sectionEl.firstChild.tagName, 'IMG');
      assert.equal(sectionEl.firstChild.src, dataUri);
    });

    test('render mobiledoc with list section and list items', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.LIST_SECTION_TYPE, 'ul', [[[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 0, 'first item']], [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 0, 'second item']]]]]
      };

      var _renderer$render7 = renderer.render(mobiledoc, document.createElement('div'));

      var rendered = _renderer$render7.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');

      var section = rendered.firstChild;
      assert.equal(section.tagName, 'UL');

      assert.equal((0, _helpersDom.childNodesLength)(section), 2, '2 list items');

      var items = section.childNodes;
      assert.equal(items.item(0).tagName, 'LI', 'correct tagName for item 1');
      assert.equal(items.item(0).firstChild.nodeValue, 'first item', 'correct text node for item 1');

      assert.equal(items.item(1).tagName, 'LI', 'correct tagName for item 2');
      assert.equal(items.item(1).firstChild.nodeValue, 'second item', 'correct text node for item 2');
    });

    test('renders a mobiledoc with card section', function (assert) {
      assert.expect(7);
      var cardName = 'title-card';
      var expectedPayload = { name: 'bob' };
      var expectedOptions = { foo: 'bar' };
      var TitleCard = {
        name: cardName,
        type: 'dom',
        render: function render(_ref) {
          var env = _ref.env;
          var payload = _ref.payload;
          var options = _ref.options;

          assert.deepEqual(payload, expectedPayload, 'correct payload');
          assert.deepEqual(options, expectedOptions, 'correct options');
          assert.equal(env.name, cardName, 'correct name');
          assert.ok(!env.isInEditor, 'isInEditor correct');
          assert.ok(!!env.onTeardown, 'has onTeardown hook');

          return document.createTextNode(payload.name);
        }
      };
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [[cardName, expectedPayload]],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, 0]]
      };

      renderer = new _mobiledocDomRenderer['default']({ cards: [TitleCard], cardOptions: expectedOptions });

      var _renderer$render8 = renderer.render(mobiledoc);

      var rendered = _renderer$render8.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var sectionEl = rendered.firstChild;

      assert.equal((0, _helpersDom.innerHTML)(sectionEl), expectedPayload.name);
    });

    test('throws when given invalid card type', function (assert) {
      var cardName = 'bad';
      var card = {
        name: cardName,
        type: 'text',
        render: function render() {}
      };
      var cards = [card];
      assert.throws(function () {
        new _mobiledocDomRenderer['default']({ cards: cards });
      }, // jshint ignore: line
      new RegExp('Card "' + cardName + '" must be of type "' + _mobiledocDomRenderer.RENDER_TYPE + '"'));
    });

    test('throws when given card without `render`', function (assert) {
      var cardName = 'bad';
      var card = {
        name: cardName,
        type: _mobiledocDomRenderer.RENDER_TYPE,
        render: undefined
      };
      var cards = [card];
      assert.throws(function () {
        new _mobiledocDomRenderer['default']({ cards: cards });
      }, // jshint ignore: line
      new RegExp('Card "' + cardName + '" must define `render`'));
    });

    test('throws if card render returns invalid result', function (assert) {
      var card = {
        name: 'bad',
        type: 'dom',
        render: function render() {
          return 'string';
        }
      };
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [[card.name]],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, 0]]
      };

      renderer = new _mobiledocDomRenderer['default']({ cards: [card] });
      assert.throws(function () {
        return renderer.render(mobiledoc);
      }, /Card "bad" must render dom/);
    });

    test('card may render nothing', function (assert) {
      var card = {
        name: 'ok',
        type: 'dom',
        render: function render() {}
      };
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [[card.name]],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, 0]]
      };

      renderer = new _mobiledocDomRenderer['default']({ cards: [card] });
      renderer.render(mobiledoc);

      assert.ok(true, 'No error thrown');
    });

    test('rendering nested mobiledocs in cards', function (assert) {
      var renderer = undefined;
      var cards = [{
        name: 'nested-card',
        type: 'dom',
        render: function render(_ref2) {
          var payload = _ref2.payload;

          var _renderer$render9 = renderer.render(payload.mobiledoc);

          var rendered = _renderer$render9.result;

          return rendered;
        }
      }];

      var innerMobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 0, 'hello world']]]]
      };

      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [['nested-card', { mobiledoc: innerMobiledoc }]],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, 0]]
      };

      renderer = new _mobiledocDomRenderer['default']({ cards: cards });

      var _renderer$render10 = renderer.render(mobiledoc);

      var rendered = _renderer$render10.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');
      var card = rendered.firstChild;
      assert.equal((0, _helpersDom.childNodesLength)(card), 1, 'card has 1 child');
      assert.equal(card.firstChild.tagName, 'P', 'card has P child');
      assert.equal(card.firstChild.innerText, 'hello world');
    });

    test('rendering unknown card without unknownCardHandler throws', function (assert) {
      var cardName = 'not-known';
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [[cardName]],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, 0]]
      };
      renderer = new _mobiledocDomRenderer['default']({ cards: [], unknownCardHandler: undefined });
      assert.throws(function () {
        return renderer.render(mobiledoc);
      }, new RegExp('Card "' + cardName + '" not found.*no unknownCardHandler'));
    });

    test('rendering unknown card uses unknownCardHandler', function (assert) {
      assert.expect(5);

      var cardName = 'my-card';
      var expectedOptions = {};
      var expectedPayload = {};

      var unknownCardHandler = function unknownCardHandler(_ref3) {
        var env = _ref3.env;
        var options = _ref3.options;
        var payload = _ref3.payload;

        assert.equal(env.name, cardName, 'name is correct');
        assert.ok(!env.isInEditor, 'not in editor');
        assert.ok(!!env.onTeardown, 'has onTeardown');

        assert.deepEqual(options, expectedOptions, 'correct options');
        assert.deepEqual(payload, expectedPayload, 'correct payload');
      };

      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [[cardName, expectedPayload]],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, 0]]
      };
      renderer = new _mobiledocDomRenderer['default']({
        cards: [], cardOptions: expectedOptions, unknownCardHandler: unknownCardHandler
      });
      renderer.render(mobiledoc);
    });

    test('throws if given an object of cards', function (assert) {
      var cards = {};
      assert.throws(function () {
        new _mobiledocDomRenderer['default']({ cards: cards });
      }, // jshint ignore: line
      new RegExp('`cards` must be passed as an array'));
    });

    test('multiple spaces should preserve whitespace with nbsps', function (assert) {
      var space = ' ';
      var repeat = function repeat(str, count) {
        var result = '';
        while (count--) {
          result += str;
        }
        return result;
      };
      var text = [repeat(space, 4), 'some', repeat(space, 5), 'text', repeat(space, 6)].join('');
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 0, text]]]]
      };

      var nbsp = ' ';
      var sn = space + nbsp;
      var expectedText = [repeat(sn, 2), 'some', repeat(sn, 2), space, 'text', repeat(sn, 3)].join('');

      var _renderer$render11 = renderer.render(mobiledoc);

      var rendered = _renderer$render11.result;

      var textNode = rendered.firstChild.firstChild;
      assert.equal(textNode.nodeValue, expectedText, 'renders the text');
    });

    test('throws when given unexpected mobiledoc version', function (assert) {
      var mobiledoc = {
        version: '0.1.0',
        atoms: [],
        cards: [],
        markups: [],
        sections: []
      };

      assert.throws(function () {
        return renderer.render(mobiledoc);
      }, /Unexpected Mobiledoc version.*0.1.0/);

      mobiledoc.version = '0.2.1';
      assert.throws(function () {
        return renderer.render(mobiledoc);
      }, /Unexpected Mobiledoc version.*0.2.1/);
    });

    test('XSS: unexpected markup and list section tag names are not renderered', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'script', [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 0, 'alert("markup section XSS")']]], [_mobiledocDomRendererUtilsSectionTypes.LIST_SECTION_TYPE, 'script', [[[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 0, 'alert("list section XSS")']]]]]
      };

      var _renderer$render12 = renderer.render(mobiledoc);

      var result = _renderer$render12.result;

      var content = (0, _helpersDom.outerHTML)(result);
      assert.ok(content.indexOf('script') === -1, 'no script tag rendered');
    });

    test('XSS: unexpected markup types are not rendered', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [],
        markups: [['b'], // valid
        ['em'], // valid
        ['script'] // invalid
        ],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'p', [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [0], 0, 'bold text'], [_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [1, 2], 3, 'alert("markup XSS")'], [_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 0, 'plain text']]]]
      };

      var _renderer$render13 = renderer.render(mobiledoc);

      var result = _renderer$render13.result;

      var content = (0, _helpersDom.outerHTML)(result);
      assert.ok(content.indexOf('script') === -1, 'no script tag rendered');
    });

    test('renders a mobiledoc with atom', function (assert) {
      var atomName = 'hello-atom';
      var atom = {
        name: atomName,
        type: 'dom',
        render: function render(_ref4) {
          var value = _ref4.value;

          return document.createTextNode('Hello ' + value);
        }
      };
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [['hello-atom', 'Bob', { id: 42 }]],
        cards: [],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[_mobiledocDomRendererUtilsMarkerTypes.ATOM_MARKER_TYPE, [], 0, 0]]]]
      };
      renderer = new _mobiledocDomRenderer['default']({ atoms: [atom] });

      var _renderer$render14 = renderer.render(mobiledoc);

      var rendered = _renderer$render14.result;

      var sectionEl = rendered.firstChild;
      assert.equal(sectionEl.textContent, 'Hello Bob');
    });

    test('throws when given atom with invalid type', function (assert) {
      var atom = {
        name: 'bad',
        type: 'other',
        render: function render() {}
      };
      assert.throws(function () {
        new _mobiledocDomRenderer['default']({ atoms: [atom] });
      }, // jshint ignore:line
      /Atom "bad" must be type "dom"/);
    });

    test('throws when given atom without `render`', function (assert) {
      var atom = {
        name: 'bad',
        type: 'dom',
        render: undefined
      };
      assert.throws(function () {
        new _mobiledocDomRenderer['default']({ atoms: [atom] });
      }, // jshint ignore:line
      /Atom "bad" must define.*render/);
    });

    test('throws if atom render returns invalid result', function (assert) {
      var atom = {
        name: 'bad',
        type: 'dom',
        render: function render() {
          return 'string';
        }
      };
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [['bad', 'Bob', { id: 42 }]],
        cards: [],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[_mobiledocDomRendererUtilsMarkerTypes.ATOM_MARKER_TYPE, [], 0, 0]]]]
      };
      renderer = new _mobiledocDomRenderer['default']({ atoms: [atom] });
      assert.throws(function () {
        return renderer.render(mobiledoc);
      }, /Atom "bad" must render dom/);
    });

    test('atom may render nothing', function (assert) {
      var atom = {
        name: 'ok',
        type: 'dom',
        render: function render() {}
      };
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [['ok', 'Bob', { id: 42 }]],
        cards: [],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[_mobiledocDomRendererUtilsMarkerTypes.ATOM_MARKER_TYPE, [], 0, 0]]]]
      };

      renderer = new _mobiledocDomRenderer['default']({ atoms: [atom] });
      renderer.render(mobiledoc);

      assert.ok(true, 'No error thrown');
    });

    test('throws when rendering unknown atom without unknownAtomHandler', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [['missing-atom', 'Bob', { id: 42 }]],
        cards: [],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[_mobiledocDomRendererUtilsMarkerTypes.ATOM_MARKER_TYPE, [], 0, 0]]]]
      };
      renderer = new _mobiledocDomRenderer['default']({ atoms: [], unknownAtomHandler: undefined });
      assert.throws(function () {
        return renderer.render(mobiledoc);
      }, /Atom "missing-atom" not found.*no unknownAtomHandler/);
    });

    test('rendering unknown atom uses unknownAtomHandler', function (assert) {
      assert.expect(4);

      var atomName = 'missing-atom';
      var expectedPayload = { id: 42 };
      var cardOptions = {};
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [['missing-atom', 'Bob', { id: 42 }]],
        cards: [],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[_mobiledocDomRendererUtilsMarkerTypes.ATOM_MARKER_TYPE, [], 0, 0]]]]
      };
      var unknownAtomHandler = function unknownAtomHandler(_ref5) {
        var env = _ref5.env;
        var payload = _ref5.payload;
        var options = _ref5.options;

        assert.equal(env.name, atomName, 'correct name');
        assert.ok(!!env.onTeardown, 'onTeardown hook exists');

        assert.deepEqual(payload, expectedPayload, 'correct payload');
        assert.deepEqual(options, cardOptions, 'correct options');
      };
      renderer = new _mobiledocDomRenderer['default']({ atoms: [], unknownAtomHandler: unknownAtomHandler, cardOptions: cardOptions });
      renderer.render(mobiledoc);
    });

    test('renders a mobiledoc with sectionElementRenderer', function (assert) {
      var mobiledoc = {
        version: MOBILEDOC_VERSION,
        atoms: [],
        cards: [],
        markups: [],
        sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'P', [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 0, 'hello world']]], [_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'p', [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 0, 'hello world']]], [_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'h1', [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 0, 'hello world']]]]
      };
      renderer = new _mobiledocDomRenderer['default']({
        sectionElementRenderer: {
          p: function p() {
            return document.createElement('pre');
          },
          H1: function H1(tagName, dom) {
            return dom.createElement('h2');
          }
        }
      });
      var renderResult = renderer.render(mobiledoc);
      var rendered = renderResult.result;

      assert.equal((0, _helpersDom.childNodesLength)(rendered), 3, 'renders three sections');
      assert.equal(rendered.firstChild.tagName, 'PRE', 'renders a pre');
      assert.equal(rendered.firstChild.textContent, 'hello world', 'renders the text');
      assert.equal(rendered.childNodes.item(1).tagName, 'PRE', 'renders a pre');
      assert.equal(rendered.childNodes.item(2).tagName, 'H2', 'renders an h2');
    });
  }

  _module('Unit: Mobiledoc DOM Renderer - 0.3', {
    beforeEach: function beforeEach() {
      renderer = new _mobiledocDomRenderer['default']();
    }
  });

  generateTests();

  test('teardown removes rendered sections from dom', function (assert) {
    var mobiledoc = {
      version: MOBILEDOC_VERSION,
      atoms: [],
      cards: [],
      markups: [],
      sections: [[_mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE, 'p', [[_mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE, [], 0, 'Hello world']]]]
    };

    var _renderer$render15 = renderer.render(mobiledoc);

    var rendered = _renderer$render15.result;
    var teardown = _renderer$render15.teardown;

    assert.equal((0, _helpersDom.childNodesLength)(rendered), 1, 'renders 1 section');

    var fixture = document.getElementById('qunit-fixture');
    fixture.appendChild(rendered);

    assert.ok((0, _helpersDom.childNodesLength)(fixture) === 1, 'precond - result is appended');

    teardown();

    assert.ok((0, _helpersDom.childNodesLength)(fixture) === 0, 'rendered result removed after teardown');
  });

  test('teardown hook calls registered teardown methods', function (assert) {
    var cardName = 'title-card';
    var didTeardown = false;

    var card = {
      name: cardName,
      type: 'dom',
      render: function render(_ref6) {
        var env = _ref6.env;

        env.onTeardown(function () {
          return didTeardown = true;
        });
      }
    };

    var mobiledoc = {
      version: MOBILEDOC_VERSION,
      atoms: [],
      cards: [[cardName]],
      markups: [],
      sections: [[_mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE, 0]]
    };

    renderer = new _mobiledocDomRenderer['default']({ cards: [card] });

    var _renderer$render16 = renderer.render(mobiledoc);

    var teardown = _renderer$render16.teardown;

    assert.ok(!didTeardown, 'teardown not called');

    teardown();

    assert.ok(didTeardown, 'teardown called');
  });

  _module('Unit: Mobiledoc DOM Renderer w/ SimpleDOM - 0.3', {
    beforeEach: function beforeEach() {
      renderer = new _mobiledocDomRenderer['default']({ dom: new SimpleDOM.Document() });
    }
  });

  generateTests();
});