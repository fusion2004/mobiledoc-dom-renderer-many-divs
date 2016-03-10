function addHTMLSpaces(text) {
  let nbsp = '\u00A0';
  return text.replace(/  /g, ' ' + nbsp);
}

export function createTextNode(dom, text) {
  return dom.createTextNode(addHTMLSpaces(text));
}

export function normalizeTagName(tagName) {
  return tagName.toLowerCase();
}

export function addClassName(element, className) {
  // FIXME-IE IE10+
  element.classList.add(className);
}
