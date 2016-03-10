define('mobiledoc-dom-renderer/cards/image', ['exports', 'mobiledoc-dom-renderer/utils/render-type'], function (exports, _mobiledocDomRendererUtilsRenderType) {
  'use strict';

  exports['default'] = {
    name: 'image',
    type: _mobiledocDomRendererUtilsRenderType['default'],
    render: function render(_ref) {
      var payload = _ref.payload;
      var dom = _ref.env.dom;

      var img = dom.createElement('img');
      img.src = payload.src;
      return img;
    }
  };
});
define('mobiledoc-dom-renderer', ['exports', 'mobiledoc-dom-renderer/renderer-factory', 'mobiledoc-dom-renderer/utils/render-type'], function (exports, _mobiledocDomRendererRendererFactory, _mobiledocDomRendererUtilsRenderType) {
  'use strict';

  exports.registerGlobal = registerGlobal;
  exports.RENDER_TYPE = _mobiledocDomRendererUtilsRenderType['default'];

  function registerGlobal(window) {
    window.MobiledocDOMRenderer = _mobiledocDomRendererRendererFactory['default'];
  }

  exports['default'] = _mobiledocDomRendererRendererFactory['default'];
});
define('mobiledoc-dom-renderer/renderer-factory', ['exports', 'mobiledoc-dom-renderer/renderers/0-2', 'mobiledoc-dom-renderer/renderers/0-3', 'mobiledoc-dom-renderer/utils/render-type'], function (exports, _mobiledocDomRendererRenderers02, _mobiledocDomRendererRenderers03, _mobiledocDomRendererUtilsRenderType) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  /**
   * runtime DOM renderer
   * renders a mobiledoc to DOM
   *
   * input: mobiledoc
   * output: DOM
   */

  function validateCards(cards) {
    if (!Array.isArray(cards)) {
      throw new Error('`cards` must be passed as an array');
    }
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (card.type !== _mobiledocDomRendererUtilsRenderType['default']) {
        throw new Error('Card "' + card.name + '" must be of type "' + _mobiledocDomRendererUtilsRenderType['default'] + '", was "' + card.type + '"');
      }
      if (!card.render) {
        throw new Error('Card "' + card.name + '" must define `render`');
      }
    }
  }

  function validateAtoms(atoms) {
    if (!Array.isArray(atoms)) {
      throw new Error('`atoms` must be passed as an array');
    }
    for (var i = 0; i < atoms.length; i++) {
      var atom = atoms[i];
      if (atom.type !== _mobiledocDomRendererUtilsRenderType['default']) {
        throw new Error('Atom "' + atom.name + '" must be type "' + _mobiledocDomRendererUtilsRenderType['default'] + '", was "' + atom.type + '"');
      }
      if (!atom.render) {
        throw new Error('Atom "' + atom.name + '" must define `render`');
      }
    }
  }

  var RendererFactory = (function () {
    function RendererFactory() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var cards = _ref.cards;
      var atoms = _ref.atoms;
      var cardOptions = _ref.cardOptions;
      var unknownCardHandler = _ref.unknownCardHandler;
      var unknownAtomHandler = _ref.unknownAtomHandler;
      var sectionElementRenderer = _ref.sectionElementRenderer;
      var dom = _ref.dom;

      _classCallCheck(this, RendererFactory);

      cards = cards || [];
      validateCards(cards);
      atoms = atoms || [];
      validateAtoms(atoms);
      cardOptions = cardOptions || {};

      if (!dom) {
        if (typeof window === 'undefined') {
          throw new Error('A `dom` option must be provided to the renderer when running without window.document');
        }
        dom = window.document;
      }

      this.options = {
        cards: cards,
        atoms: atoms,
        cardOptions: cardOptions,
        unknownCardHandler: unknownCardHandler,
        unknownAtomHandler: unknownAtomHandler,
        sectionElementRenderer: sectionElementRenderer,
        dom: dom
      };
    }

    _createClass(RendererFactory, [{
      key: 'render',
      value: function render(mobiledoc) {
        var version = mobiledoc.version;

        switch (version) {
          case _mobiledocDomRendererRenderers02.MOBILEDOC_VERSION:
          case undefined:
          case null:
            return new _mobiledocDomRendererRenderers02['default'](mobiledoc, this.options).render();
          case _mobiledocDomRendererRenderers03.MOBILEDOC_VERSION:
            return new _mobiledocDomRendererRenderers03['default'](mobiledoc, this.options).render();
          default:
            throw new Error('Unexpected Mobiledoc version "' + version + '"');
        }
      }
    }]);

    return RendererFactory;
  })();

  exports['default'] = RendererFactory;
});
define('mobiledoc-dom-renderer/renderers/0-2', ['exports', 'mobiledoc-dom-renderer/utils/dom', 'mobiledoc-dom-renderer/cards/image', 'mobiledoc-dom-renderer/utils/render-type', 'mobiledoc-dom-renderer/utils/section-types', 'mobiledoc-dom-renderer/utils/tag-names'], function (exports, _mobiledocDomRendererUtilsDom, _mobiledocDomRendererCardsImage, _mobiledocDomRendererUtilsRenderType, _mobiledocDomRendererUtilsSectionTypes, _mobiledocDomRendererUtilsTagNames) {
  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var MOBILEDOC_VERSION = '0.2.0';

  exports.MOBILEDOC_VERSION = MOBILEDOC_VERSION;
  var IMAGE_SECTION_TAG_NAME = 'img';
  var CARD_ELEMENT_TAG_NAME = 'div';

  function createElementFromMarkerType(dom) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? ['', []] : arguments[1];

    var _ref2 = _slicedToArray(_ref, 2);

    var tagName = _ref2[0];
    var attributes = _ref2[1];

    var element = dom.createElement(tagName);
    attributes = attributes || [];

    for (var i = 0, l = attributes.length; i < l; i = i + 2) {
      var propName = attributes[i],
          propValue = attributes[i + 1];
      element.setAttribute(propName, propValue);
    }
    return element;
  }

  function validateVersion(version) {
    if (version !== MOBILEDOC_VERSION) {
      throw new Error('Unexpected Mobiledoc version "' + version + '"');
    }
  }

  var Renderer = (function () {
    function Renderer(mobiledoc, options) {
      _classCallCheck(this, Renderer);

      var cards = options.cards;
      var cardOptions = options.cardOptions;
      var unknownCardHandler = options.unknownCardHandler;
      var sectionElementRenderer = options.sectionElementRenderer;
      var dom = options.dom;
      var version = mobiledoc.version;
      var sectionData = mobiledoc.sections;

      validateVersion(version);

      var _sectionData = _slicedToArray(sectionData, 2);

      var markerTypes = _sectionData[0];
      var sections = _sectionData[1];

      this.dom = dom;
      this.root = dom.createDocumentFragment();
      this.markerTypes = markerTypes;
      this.sections = sections;
      this.cards = cards;
      this.cardOptions = cardOptions;
      this.unknownCardHandler = unknownCardHandler || this._defaultUnknownCardHandler;

      this.sectionElementRenderer = {};
      if (sectionElementRenderer) {
        for (var key in sectionElementRenderer) {
          if (sectionElementRenderer.hasOwnProperty(key)) {
            this.sectionElementRenderer[key.toLowerCase()] = sectionElementRenderer[key];
          }
        }
      }

      this._teardownCallbacks = [];
      this._renderedChildNodes = [];
    }

    _createClass(Renderer, [{
      key: 'render',
      value: function render() {
        var _this = this;

        this.sections.forEach(function (section) {
          var rendered = _this.renderSection(section);
          if (rendered) {
            _this.root.appendChild(rendered);
          }
        });
        // maintain a reference to child nodes so they can be cleaned up later by teardown
        this._renderedChildNodes = [];
        var node = this.root.firstChild;
        while (node) {
          this._renderedChildNodes.push(node);
          node = node.nextSibling;
        }
        return { result: this.root, teardown: function teardown() {
            return _this.teardown();
          } };
      }
    }, {
      key: 'teardown',
      value: function teardown() {
        for (var i = 0; i < this._teardownCallbacks.length; i++) {
          this._teardownCallbacks[i]();
        }
        for (var i = 0; i < this._renderedChildNodes.length; i++) {
          var node = this._renderedChildNodes[i];
          if (node.parentNode) {
            node.parentNode.removeChild(node);
          }
        }
      }
    }, {
      key: 'renderSection',
      value: function renderSection(section) {
        var _section = _slicedToArray(section, 1);

        var type = _section[0];

        switch (type) {
          case _mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE:
            return this.renderMarkupSection(section);
          case _mobiledocDomRendererUtilsSectionTypes.IMAGE_SECTION_TYPE:
            return this.renderImageSection(section);
          case _mobiledocDomRendererUtilsSectionTypes.LIST_SECTION_TYPE:
            return this.renderListSection(section);
          case _mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE:
            return this.renderCardSection(section);
          default:
            throw new Error('Cannot render mobiledoc section of type "' + type + '"');
        }
      }
    }, {
      key: 'renderMarkersOnElement',
      value: function renderMarkersOnElement(element, markers) {
        var elements = [element];
        var currentElement = element;

        for (var i = 0, l = markers.length; i < l; i++) {
          var marker = markers[i];

          var _marker = _slicedToArray(marker, 3);

          var openTypes = _marker[0];
          var closeCount = _marker[1];
          var text = _marker[2];

          for (var j = 0, m = openTypes.length; j < m; j++) {
            var markerType = this.markerTypes[openTypes[j]];

            var _markerType = _slicedToArray(markerType, 1);

            var tagName = _markerType[0];

            if ((0, _mobiledocDomRendererUtilsTagNames.isValidMarkerType)(tagName)) {
              var openedElement = createElementFromMarkerType(this.dom, markerType);
              currentElement.appendChild(openedElement);
              elements.push(openedElement);
              currentElement = openedElement;
            } else {
              closeCount--;
            }
          }

          currentElement.appendChild((0, _mobiledocDomRendererUtilsDom.createTextNode)(this.dom, text));

          for (var j = 0, m = closeCount; j < m; j++) {
            elements.pop();
            currentElement = elements[elements.length - 1];
          }
        }
      }
    }, {
      key: 'renderListItem',
      value: function renderListItem(markers) {
        var element = this.dom.createElement('li');
        this.renderMarkersOnElement(element, markers);
        return element;
      }
    }, {
      key: 'renderListSection',
      value: function renderListSection(_ref3) {
        var _this2 = this;

        var _ref32 = _slicedToArray(_ref3, 3);

        var type = _ref32[0];
        var tagName = _ref32[1];
        var listItems = _ref32[2];

        if (!(0, _mobiledocDomRendererUtilsTagNames.isValidSectionTagName)(tagName, _mobiledocDomRendererUtilsSectionTypes.LIST_SECTION_TYPE)) {
          return;
        }
        var element = this.dom.createElement(tagName);
        listItems.forEach(function (li) {
          element.appendChild(_this2.renderListItem(li));
        });
        return element;
      }
    }, {
      key: 'renderImageSection',
      value: function renderImageSection(_ref4) {
        var _ref42 = _slicedToArray(_ref4, 2);

        var type = _ref42[0];
        var src = _ref42[1];

        var element = this.dom.createElement(IMAGE_SECTION_TAG_NAME);
        element.src = src;
        return element;
      }
    }, {
      key: 'findCard',
      value: function findCard(name) {
        for (var i = 0; i < this.cards.length; i++) {
          if (this.cards[i].name === name) {
            return this.cards[i];
          }
        }
        if (name === _mobiledocDomRendererCardsImage['default'].name) {
          return _mobiledocDomRendererCardsImage['default'];
        }
        return this._createUnknownCard(name);
      }
    }, {
      key: '_createUnknownCard',
      value: function _createUnknownCard(name) {
        return {
          name: name,
          type: _mobiledocDomRendererUtilsRenderType['default'],
          render: this.unknownCardHandler
        };
      }
    }, {
      key: '_createCardArgument',
      value: function _createCardArgument(card) {
        var _this3 = this;

        var payload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var env = {
          name: card.name,
          isInEditor: false,
          dom: this.dom,
          onTeardown: function onTeardown(callback) {
            return _this3._registerTeardownCallback(callback);
          }
        };

        var options = this.cardOptions;

        return { env: env, options: options, payload: payload };
      }
    }, {
      key: '_registerTeardownCallback',
      value: function _registerTeardownCallback(callback) {
        this._teardownCallbacks.push(callback);
      }
    }, {
      key: 'renderCardSection',
      value: function renderCardSection(_ref5) {
        var _ref52 = _slicedToArray(_ref5, 3);

        var type = _ref52[0];
        var name = _ref52[1];
        var payload = _ref52[2];

        var card = this.findCard(name);

        var cardWrapper = this._createCardElement();
        var cardArg = this._createCardArgument(card, payload);
        var rendered = card.render(cardArg);

        this._validateCardRender(rendered, card.name);

        if (rendered) {
          cardWrapper.appendChild(rendered);
        }
        return cardWrapper;
      }
    }, {
      key: '_createCardElement',
      value: function _createCardElement() {
        return this.dom.createElement(CARD_ELEMENT_TAG_NAME);
      }
    }, {
      key: '_validateCardRender',
      value: function _validateCardRender(rendered, cardName) {
        if (!rendered) {
          return;
        }

        if (typeof rendered !== 'object') {
          throw new Error('Card "' + cardName + '" must render ' + _mobiledocDomRendererUtilsRenderType['default'] + ', but result was "' + rendered + '"');
        }
      }
    }, {
      key: 'renderMarkupSection',
      value: function renderMarkupSection(_ref6) {
        var _ref62 = _slicedToArray(_ref6, 3);

        var type = _ref62[0];
        var tagName = _ref62[1];
        var markers = _ref62[2];

        if (!(0, _mobiledocDomRendererUtilsTagNames.isValidSectionTagName)(tagName, _mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE)) {
          return;
        }

        var element = undefined;
        var lowerCaseTagName = tagName.toLowerCase();
        if (this.sectionElementRenderer[lowerCaseTagName]) {
          element = this.sectionElementRenderer[lowerCaseTagName](tagName, this.dom);
        } else {
          element = this.dom.createElement(tagName);
        }

        this.renderMarkersOnElement(element, markers);
        return element;
      }
    }, {
      key: '_defaultUnknownCardHandler',
      get: function get() {
        return function (_ref7) {
          var name = _ref7.env.name;

          throw new Error('Card "' + name + '" not found but no unknownCardHandler was registered');
        };
      }
    }]);

    return Renderer;
  })();

  exports['default'] = Renderer;
});
define('mobiledoc-dom-renderer/renderers/0-3', ['exports', 'mobiledoc-dom-renderer/utils/dom', 'mobiledoc-dom-renderer/cards/image', 'mobiledoc-dom-renderer/utils/render-type', 'mobiledoc-dom-renderer/utils/section-types', 'mobiledoc-dom-renderer/utils/tag-names', 'mobiledoc-dom-renderer/utils/marker-types'], function (exports, _mobiledocDomRendererUtilsDom, _mobiledocDomRendererCardsImage, _mobiledocDomRendererUtilsRenderType, _mobiledocDomRendererUtilsSectionTypes, _mobiledocDomRendererUtilsTagNames, _mobiledocDomRendererUtilsMarkerTypes) {
  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var MOBILEDOC_VERSION = '0.3.0';

  exports.MOBILEDOC_VERSION = MOBILEDOC_VERSION;
  var IMAGE_SECTION_TAG_NAME = 'img';
  var CARD_ELEMENT_TAG_NAME = 'div';

  function createElementFromMarkerType(dom) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? ['', []] : arguments[1];

    var _ref2 = _slicedToArray(_ref, 2);

    var tagName = _ref2[0];
    var attributes = _ref2[1];

    var element = dom.createElement(tagName);
    attributes = attributes || [];

    for (var i = 0, l = attributes.length; i < l; i = i + 2) {
      var propName = attributes[i],
          propValue = attributes[i + 1];
      element.setAttribute(propName, propValue);
    }
    return element;
  }

  function validateVersion(version) {
    if (version !== MOBILEDOC_VERSION) {
      throw new Error('Unexpected Mobiledoc version "' + version + '"');
    }
  }

  var Renderer = (function () {
    function Renderer(mobiledoc, state) {
      _classCallCheck(this, Renderer);

      var cards = state.cards;
      var cardOptions = state.cardOptions;
      var atoms = state.atoms;
      var unknownCardHandler = state.unknownCardHandler;
      var unknownAtomHandler = state.unknownAtomHandler;
      var sectionElementRenderer = state.sectionElementRenderer;
      var dom = state.dom;
      var version = mobiledoc.version;
      var sections = mobiledoc.sections;
      var atomTypes = mobiledoc.atoms;
      var cardTypes = mobiledoc.cards;
      var markerTypes = mobiledoc.markups;

      validateVersion(version);

      this.dom = dom;
      this.root = this.dom.createDocumentFragment();
      this.sections = sections;
      this.atomTypes = atomTypes;
      this.cardTypes = cardTypes;
      this.markerTypes = markerTypes;
      this.cards = cards;
      this.atoms = atoms;
      this.cardOptions = cardOptions;
      this.unknownCardHandler = unknownCardHandler || this._defaultUnknownCardHandler;
      this.unknownAtomHandler = unknownAtomHandler || this._defaultUnknownAtomHandler;

      this.sectionElementRenderer = {};
      if (sectionElementRenderer) {
        for (var key in sectionElementRenderer) {
          if (sectionElementRenderer.hasOwnProperty(key)) {
            this.sectionElementRenderer[key.toLowerCase()] = sectionElementRenderer[key];
          }
        }
      }

      this._teardownCallbacks = [];
    }

    _createClass(Renderer, [{
      key: 'render',
      value: function render() {
        var _this = this;

        this.sections.forEach(function (section) {
          var rendered = _this.renderSection(section);
          if (rendered) {
            _this.root.appendChild(rendered);
          }
        });
        // maintain a reference to child nodes so they can be cleaned up later by teardown
        this._renderedChildNodes = Array.prototype.slice.call(this.root.childNodes);
        return { result: this.root, teardown: function teardown() {
            return _this.teardown();
          } };
      }
    }, {
      key: 'teardown',
      value: function teardown() {
        for (var i = 0; i < this._teardownCallbacks.length; i++) {
          this._teardownCallbacks[i]();
        }
        for (var i = 0; i < this._renderedChildNodes.length; i++) {
          var node = this._renderedChildNodes[i];
          if (node.parentNode) {
            node.parentNode.removeChild(node);
          }
        }
      }
    }, {
      key: 'renderSection',
      value: function renderSection(section) {
        var _section = _slicedToArray(section, 1);

        var type = _section[0];

        switch (type) {
          case _mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE:
            return this.renderMarkupSection(section);
          case _mobiledocDomRendererUtilsSectionTypes.IMAGE_SECTION_TYPE:
            return this.renderImageSection(section);
          case _mobiledocDomRendererUtilsSectionTypes.LIST_SECTION_TYPE:
            return this.renderListSection(section);
          case _mobiledocDomRendererUtilsSectionTypes.CARD_SECTION_TYPE:
            return this.renderCardSection(section);
          default:
            throw new Error('Cannot render mobiledoc section of type "' + type + '"');
        }
      }
    }, {
      key: 'renderMarkersOnElement',
      value: function renderMarkersOnElement(element, markers) {
        var elements = [element];
        var currentElement = element;

        for (var i = 0, l = markers.length; i < l; i++) {
          var marker = markers[i];

          var _marker = _slicedToArray(marker, 4);

          var type = _marker[0];
          var openTypes = _marker[1];
          var closeCount = _marker[2];
          var value = _marker[3];

          for (var j = 0, m = openTypes.length; j < m; j++) {
            var markerType = this.markerTypes[openTypes[j]];

            var _markerType = _slicedToArray(markerType, 1);

            var tagName = _markerType[0];

            if ((0, _mobiledocDomRendererUtilsTagNames.isValidMarkerType)(tagName)) {
              var openedElement = createElementFromMarkerType(this.dom, markerType);
              currentElement.appendChild(openedElement);
              elements.push(openedElement);
              currentElement = openedElement;
            } else {
              closeCount--;
            }
          }

          switch (type) {
            case _mobiledocDomRendererUtilsMarkerTypes.MARKUP_MARKER_TYPE:
              currentElement.appendChild((0, _mobiledocDomRendererUtilsDom.createTextNode)(this.dom, value));
              break;
            case _mobiledocDomRendererUtilsMarkerTypes.ATOM_MARKER_TYPE:
              currentElement.appendChild(this._renderAtom(value));
              break;
            default:
              throw new Error('Unknown markup type (' + type + ')');
          }

          for (var j = 0, m = closeCount; j < m; j++) {
            elements.pop();
            currentElement = elements[elements.length - 1];
          }
        }
      }
    }, {
      key: 'renderListItem',
      value: function renderListItem(markers) {
        var element = this.dom.createElement('li');
        this.renderMarkersOnElement(element, markers);
        return element;
      }
    }, {
      key: 'renderListSection',
      value: function renderListSection(_ref3) {
        var _this2 = this;

        var _ref32 = _slicedToArray(_ref3, 3);

        var type = _ref32[0];
        var tagName = _ref32[1];
        var listItems = _ref32[2];

        if (!(0, _mobiledocDomRendererUtilsTagNames.isValidSectionTagName)(tagName, _mobiledocDomRendererUtilsSectionTypes.LIST_SECTION_TYPE)) {
          return;
        }
        var element = this.dom.createElement(tagName);
        listItems.forEach(function (li) {
          element.appendChild(_this2.renderListItem(li));
        });
        return element;
      }
    }, {
      key: 'renderImageSection',
      value: function renderImageSection(_ref4) {
        var _ref42 = _slicedToArray(_ref4, 2);

        var type = _ref42[0];
        var src = _ref42[1];

        var element = this.dom.createElement(IMAGE_SECTION_TAG_NAME);
        element.src = src;
        return element;
      }
    }, {
      key: 'findCard',
      value: function findCard(name) {
        for (var i = 0; i < this.cards.length; i++) {
          if (this.cards[i].name === name) {
            return this.cards[i];
          }
        }
        if (name === _mobiledocDomRendererCardsImage['default'].name) {
          return _mobiledocDomRendererCardsImage['default'];
        }
        return this._createUnknownCard(name);
      }
    }, {
      key: '_findCardByIndex',
      value: function _findCardByIndex(index) {
        var cardType = this.cardTypes[index];
        if (!cardType) {
          throw new Error('No card definition found at index ' + index);
        }

        var _cardType = _slicedToArray(cardType, 2);

        var name = _cardType[0];
        var payload = _cardType[1];

        var card = this.findCard(name);

        return {
          card: card,
          payload: payload
        };
      }
    }, {
      key: '_createUnknownCard',
      value: function _createUnknownCard(name) {
        return {
          name: name,
          type: _mobiledocDomRendererUtilsRenderType['default'],
          render: this.unknownCardHandler
        };
      }
    }, {
      key: '_createCardArgument',
      value: function _createCardArgument(card) {
        var _this3 = this;

        var payload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var env = {
          name: card.name,
          isInEditor: false,
          dom: this.dom,
          onTeardown: function onTeardown(callback) {
            return _this3._registerTeardownCallback(callback);
          }
        };

        var options = this.cardOptions;

        return { env: env, options: options, payload: payload };
      }
    }, {
      key: '_registerTeardownCallback',
      value: function _registerTeardownCallback(callback) {
        this._teardownCallbacks.push(callback);
      }
    }, {
      key: 'renderCardSection',
      value: function renderCardSection(_ref5) {
        var _ref52 = _slicedToArray(_ref5, 2);

        var type = _ref52[0];
        var index = _ref52[1];

        var _findCardByIndex2 = this._findCardByIndex(index);

        var card = _findCardByIndex2.card;
        var payload = _findCardByIndex2.payload;

        var cardWrapper = this._createCardElement();
        var cardArg = this._createCardArgument(card, payload);
        var rendered = card.render(cardArg);

        this._validateCardRender(rendered, card.name);

        if (rendered) {
          cardWrapper.appendChild(rendered);
        }
        return cardWrapper;
      }
    }, {
      key: '_createCardElement',
      value: function _createCardElement() {
        return this.dom.createElement(CARD_ELEMENT_TAG_NAME);
      }
    }, {
      key: '_validateCardRender',
      value: function _validateCardRender(rendered, cardName) {
        if (!rendered) {
          return;
        }

        if (typeof rendered !== 'object') {
          throw new Error('Card "' + cardName + '" must render ' + _mobiledocDomRendererUtilsRenderType['default'] + ', but result was "' + rendered + '"');
        }
      }
    }, {
      key: 'findAtom',
      value: function findAtom(name) {
        for (var i = 0; i < this.atoms.length; i++) {
          if (this.atoms[i].name === name) {
            return this.atoms[i];
          }
        }
        return this._createUnknownAtom(name);
      }
    }, {
      key: '_createUnknownAtom',
      value: function _createUnknownAtom(name) {
        return {
          name: name,
          type: _mobiledocDomRendererUtilsRenderType['default'],
          render: this.unknownAtomHandler
        };
      }
    }, {
      key: '_createAtomArgument',
      value: function _createAtomArgument(atom, value, payload) {
        var _this4 = this;

        var env = {
          name: atom.name,
          onTeardown: function onTeardown(callback) {
            return _this4._registerTeardownCallback(callback);
          }
        };

        var options = this.cardOptions;

        return { env: env, options: options, value: value, payload: payload };
      }
    }, {
      key: '_validateAtomRender',
      value: function _validateAtomRender(rendered, atomName) {
        if (!rendered) {
          return;
        }

        if (typeof rendered !== 'object') {
          throw new Error('Atom "' + atomName + '" must render ' + _mobiledocDomRendererUtilsRenderType['default'] + ', but result was "' + rendered + '"');
        }
      }
    }, {
      key: '_findAtomByIndex',
      value: function _findAtomByIndex(index) {
        var atomType = this.atomTypes[index];
        if (!atomType) {
          throw new Error('No atom definition found at index ' + index);
        }

        var _atomType = _slicedToArray(atomType, 3);

        var name = _atomType[0];
        var value = _atomType[1];
        var payload = _atomType[2];

        var atom = this.findAtom(name);

        return {
          atom: atom,
          value: value,
          payload: payload
        };
      }
    }, {
      key: '_renderAtom',
      value: function _renderAtom(index) {
        var _findAtomByIndex2 = this._findAtomByIndex(index);

        var atom = _findAtomByIndex2.atom;
        var value = _findAtomByIndex2.value;
        var payload = _findAtomByIndex2.payload;

        var atomArg = this._createAtomArgument(atom, value, payload);
        var rendered = atom.render(atomArg);

        this._validateAtomRender(rendered, atom.name);

        return rendered || (0, _mobiledocDomRendererUtilsDom.createTextNode)(this.dom, '');
      }
    }, {
      key: 'renderMarkupSection',
      value: function renderMarkupSection(_ref6) {
        var _ref62 = _slicedToArray(_ref6, 3);

        var type = _ref62[0];
        var tagName = _ref62[1];
        var markers = _ref62[2];

        if (!(0, _mobiledocDomRendererUtilsTagNames.isValidSectionTagName)(tagName, _mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE)) {
          return;
        }

        var element = undefined;
        var lowerCaseTagName = tagName.toLowerCase();
        if (this.sectionElementRenderer[lowerCaseTagName]) {
          element = this.sectionElementRenderer[lowerCaseTagName](tagName, this.dom);
        } else {
          if ((0, _mobiledocDomRendererUtilsTagNames.isValidSectionElementName)(tagName, _mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE)) {
            element = this.dom.createElement(tagName);
          } else {
            element = this.dom.createElement('div');
            (0, _mobiledocDomRendererUtilsDom.addClassName)(element, tagName);
          }
        }

        this.renderMarkersOnElement(element, markers);
        return element;
      }
    }, {
      key: '_defaultUnknownCardHandler',
      get: function get() {
        return function (_ref7) {
          var name = _ref7.env.name;

          throw new Error('Card "' + name + '" not found but no unknownCardHandler was registered');
        };
      }
    }, {
      key: '_defaultUnknownAtomHandler',
      get: function get() {
        return function (_ref8) {
          var name = _ref8.env.name;

          throw new Error('Atom "' + name + '" not found but no unknownAtomHandler was registered');
        };
      }
    }]);

    return Renderer;
  })();

  exports['default'] = Renderer;
});
define('mobiledoc-dom-renderer/utils/dom', ['exports'], function (exports) {
  'use strict';

  exports.createTextNode = createTextNode;
  exports.normalizeTagName = normalizeTagName;
  exports.addClassName = addClassName;
  function addHTMLSpaces(text) {
    var nbsp = ' ';
    return text.replace(/  /g, ' ' + nbsp);
  }

  function createTextNode(dom, text) {
    return dom.createTextNode(addHTMLSpaces(text));
  }

  function normalizeTagName(tagName) {
    return tagName.toLowerCase();
  }

  function addClassName(element, className) {
    // FIXME-IE IE10+
    element.classList.add(className);
  }
});
define("mobiledoc-dom-renderer/utils/marker-types", ["exports"], function (exports) {
  "use strict";

  var MARKUP_MARKER_TYPE = 0;
  exports.MARKUP_MARKER_TYPE = MARKUP_MARKER_TYPE;
  var ATOM_MARKER_TYPE = 1;
  exports.ATOM_MARKER_TYPE = ATOM_MARKER_TYPE;
});
define('mobiledoc-dom-renderer/utils/render-type', ['exports'], function (exports) {
  'use strict';

  exports['default'] = 'dom';
});
define("mobiledoc-dom-renderer/utils/section-types", ["exports"], function (exports) {
  "use strict";

  var MARKUP_SECTION_TYPE = 1;
  exports.MARKUP_SECTION_TYPE = MARKUP_SECTION_TYPE;
  var IMAGE_SECTION_TYPE = 2;
  exports.IMAGE_SECTION_TYPE = IMAGE_SECTION_TYPE;
  var LIST_SECTION_TYPE = 3;
  exports.LIST_SECTION_TYPE = LIST_SECTION_TYPE;
  var CARD_SECTION_TYPE = 10;
  exports.CARD_SECTION_TYPE = CARD_SECTION_TYPE;
});
define('mobiledoc-dom-renderer/utils/tag-names', ['exports', 'mobiledoc-dom-renderer/utils/section-types', 'mobiledoc-dom-renderer/utils/dom'], function (exports, _mobiledocDomRendererUtilsSectionTypes, _mobiledocDomRendererUtilsDom) {
  'use strict';

  exports.isValidSectionTagName = isValidSectionTagName;
  exports.isValidSectionElementName = isValidSectionElementName;
  exports.isValidMarkerType = isValidMarkerType;

  var MARKUP_SECTION_TAG_NAMES = ['p', 'h1', 'h2', 'h3', 'blockquote', 'pull-quote', 'left-align', 'center-align', 'right-align'].map(_mobiledocDomRendererUtilsDom.normalizeTagName);

  var MARKUP_SECTION_ELEMENT_NAMES = ['p', 'h3', 'h2', 'h1', 'blockquote'].map(_mobiledocDomRendererUtilsDom.normalizeTagName);

  var LIST_SECTION_TAG_NAMES = ['ul', 'ol'].map(_mobiledocDomRendererUtilsDom.normalizeTagName);

  var MARKUP_TYPES = ['b', 'i', 'strong', 'em', 'a', 'u', 'sub', 'sup', 's'].map(_mobiledocDomRendererUtilsDom.normalizeTagName);

  function contains(array, item) {
    return array.indexOf(item) !== -1;
  }

  function isValidSectionTagName(tagName, sectionType) {
    tagName = (0, _mobiledocDomRendererUtilsDom.normalizeTagName)(tagName);

    switch (sectionType) {
      case _mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE:
        return contains(MARKUP_SECTION_TAG_NAMES, tagName);
      case _mobiledocDomRendererUtilsSectionTypes.LIST_SECTION_TYPE:
        return contains(LIST_SECTION_TAG_NAMES, tagName);
      default:
        throw new Error('Cannot validate tagName for unknown section type "' + sectionType + '"');
    }
  }

  function isValidSectionElementName(tagName, sectionType) {
    tagName = (0, _mobiledocDomRendererUtilsDom.normalizeTagName)(tagName);

    switch (sectionType) {
      case _mobiledocDomRendererUtilsSectionTypes.MARKUP_SECTION_TYPE:
        return contains(MARKUP_SECTION_ELEMENT_NAMES, tagName);
      case _mobiledocDomRendererUtilsSectionTypes.LIST_SECTION_TYPE:
        return contains(LIST_SECTION_TAG_NAMES, tagName);
      default:
        throw new Error('Cannot validate elementName for unknown section type "' + sectionType + '"');
    }
  }

  function isValidMarkerType(type) {
    type = (0, _mobiledocDomRendererUtilsDom.normalizeTagName)(type);
    return contains(MARKUP_TYPES, type);
  }
});//# sourceMappingURL=mobiledoc-dom-renderer.map