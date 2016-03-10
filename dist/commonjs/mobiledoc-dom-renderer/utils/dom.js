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