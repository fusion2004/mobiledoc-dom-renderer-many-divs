'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsDom = require('../utils/dom');

var _cardsImage = require('../cards/image');

var _utilsRenderType = require('../utils/render-type');

var _utilsSectionTypes = require('../utils/section-types');

var _utilsTagNames = require('../utils/tag-names');

var _utilsMarkerTypes = require('../utils/marker-types');

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
        case _utilsSectionTypes.MARKUP_SECTION_TYPE:
          return this.renderMarkupSection(section);
        case _utilsSectionTypes.IMAGE_SECTION_TYPE:
          return this.renderImageSection(section);
        case _utilsSectionTypes.LIST_SECTION_TYPE:
          return this.renderListSection(section);
        case _utilsSectionTypes.CARD_SECTION_TYPE:
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

          if ((0, _utilsTagNames.isValidMarkerType)(tagName)) {
            var openedElement = createElementFromMarkerType(this.dom, markerType);
            currentElement.appendChild(openedElement);
            elements.push(openedElement);
            currentElement = openedElement;
          } else {
            closeCount--;
          }
        }

        switch (type) {
          case _utilsMarkerTypes.MARKUP_MARKER_TYPE:
            currentElement.appendChild((0, _utilsDom.createTextNode)(this.dom, value));
            break;
          case _utilsMarkerTypes.ATOM_MARKER_TYPE:
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

      if (!(0, _utilsTagNames.isValidSectionTagName)(tagName, _utilsSectionTypes.LIST_SECTION_TYPE)) {
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
      if (name === _cardsImage['default'].name) {
        return _cardsImage['default'];
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
        type: _utilsRenderType['default'],
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
        throw new Error('Card "' + cardName + '" must render ' + _utilsRenderType['default'] + ', but result was "' + rendered + '"');
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
        type: _utilsRenderType['default'],
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
        throw new Error('Atom "' + atomName + '" must render ' + _utilsRenderType['default'] + ', but result was "' + rendered + '"');
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

      return rendered || (0, _utilsDom.createTextNode)(this.dom, '');
    }
  }, {
    key: 'renderMarkupSection',
    value: function renderMarkupSection(_ref6) {
      var _ref62 = _slicedToArray(_ref6, 3);

      var type = _ref62[0];
      var tagName = _ref62[1];
      var markers = _ref62[2];

      if (!(0, _utilsTagNames.isValidSectionTagName)(tagName, _utilsSectionTypes.MARKUP_SECTION_TYPE)) {
        return;
      }

      var element = undefined;
      var lowerCaseTagName = tagName.toLowerCase();
      if (this.sectionElementRenderer[lowerCaseTagName]) {
        element = this.sectionElementRenderer[lowerCaseTagName](tagName, this.dom);
      } else {
        if ((0, _utilsTagNames.isValidSectionElementName)(tagName, _utilsSectionTypes.MARKUP_SECTION_TYPE)) {
          element = this.dom.createElement(tagName);
        } else {
          element = this.dom.createElement('div');
          (0, _utilsDom.addClassName)(element, tagName);
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