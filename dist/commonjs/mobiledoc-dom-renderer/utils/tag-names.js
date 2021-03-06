'use strict';

exports.isValidSectionTagName = isValidSectionTagName;
exports.isValidSectionElementName = isValidSectionElementName;
exports.isValidMarkerType = isValidMarkerType;

var _sectionTypes = require('./section-types');

var _dom = require('./dom');

var MARKUP_SECTION_TAG_NAMES = ['p', 'h1', 'h2', 'h3', 'blockquote', 'pull-quote', 'left-align', 'center-align', 'right-align'].map(_dom.normalizeTagName);

var MARKUP_SECTION_ELEMENT_NAMES = ['p', 'h3', 'h2', 'h1', 'blockquote'].map(_dom.normalizeTagName);

var LIST_SECTION_TAG_NAMES = ['ul', 'ol'].map(_dom.normalizeTagName);

var MARKUP_TYPES = ['b', 'i', 'strong', 'em', 'a', 'u', 'sub', 'sup', 's'].map(_dom.normalizeTagName);

function contains(array, item) {
  return array.indexOf(item) !== -1;
}

function isValidSectionTagName(tagName, sectionType) {
  tagName = (0, _dom.normalizeTagName)(tagName);

  switch (sectionType) {
    case _sectionTypes.MARKUP_SECTION_TYPE:
      return contains(MARKUP_SECTION_TAG_NAMES, tagName);
    case _sectionTypes.LIST_SECTION_TYPE:
      return contains(LIST_SECTION_TAG_NAMES, tagName);
    default:
      throw new Error('Cannot validate tagName for unknown section type "' + sectionType + '"');
  }
}

function isValidSectionElementName(tagName, sectionType) {
  tagName = (0, _dom.normalizeTagName)(tagName);

  switch (sectionType) {
    case _sectionTypes.MARKUP_SECTION_TYPE:
      return contains(MARKUP_SECTION_ELEMENT_NAMES, tagName);
    case _sectionTypes.LIST_SECTION_TYPE:
      return contains(LIST_SECTION_TAG_NAMES, tagName);
    default:
      throw new Error('Cannot validate elementName for unknown section type "' + sectionType + '"');
  }
}

function isValidMarkerType(type) {
  type = (0, _dom.normalizeTagName)(type);
  return contains(MARKUP_TYPES, type);
}