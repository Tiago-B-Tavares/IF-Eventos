/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/toggle-selection";
exports.ids = ["vendor-chunks/toggle-selection"];
exports.modules = {

/***/ "(ssr)/./node_modules/toggle-selection/index.js":
/*!************************************************!*\
  !*** ./node_modules/toggle-selection/index.js ***!
  \************************************************/
/***/ ((module) => {

eval("\r\nmodule.exports = function () {\r\n  var selection = document.getSelection();\r\n  if (!selection.rangeCount) {\r\n    return function () {};\r\n  }\r\n  var active = document.activeElement;\r\n\r\n  var ranges = [];\r\n  for (var i = 0; i < selection.rangeCount; i++) {\r\n    ranges.push(selection.getRangeAt(i));\r\n  }\r\n\r\n  switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML\r\n    case 'INPUT':\r\n    case 'TEXTAREA':\r\n      active.blur();\r\n      break;\r\n\r\n    default:\r\n      active = null;\r\n      break;\r\n  }\r\n\r\n  selection.removeAllRanges();\r\n  return function () {\r\n    selection.type === 'Caret' &&\r\n    selection.removeAllRanges();\r\n\r\n    if (!selection.rangeCount) {\r\n      ranges.forEach(function(range) {\r\n        selection.addRange(range);\r\n      });\r\n    }\r\n\r\n    active &&\r\n    active.focus();\r\n  };\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdG9nZ2xlLXNlbGVjdGlvbi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsMEJBQTBCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXV0aC8uL25vZGVfbW9kdWxlcy90b2dnbGUtc2VsZWN0aW9uL2luZGV4LmpzPzA5MzEiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhciBzZWxlY3Rpb24gPSBkb2N1bWVudC5nZXRTZWxlY3Rpb24oKTtcclxuICBpZiAoIXNlbGVjdGlvbi5yYW5nZUNvdW50KSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge307XHJcbiAgfVxyXG4gIHZhciBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG5cclxuICB2YXIgcmFuZ2VzID0gW107XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3Rpb24ucmFuZ2VDb3VudDsgaSsrKSB7XHJcbiAgICByYW5nZXMucHVzaChzZWxlY3Rpb24uZ2V0UmFuZ2VBdChpKSk7XHJcbiAgfVxyXG5cclxuICBzd2l0Y2ggKGFjdGl2ZS50YWdOYW1lLnRvVXBwZXJDYXNlKCkpIHsgLy8gLnRvVXBwZXJDYXNlIGhhbmRsZXMgWEhUTUxcclxuICAgIGNhc2UgJ0lOUFVUJzpcclxuICAgIGNhc2UgJ1RFWFRBUkVBJzpcclxuICAgICAgYWN0aXZlLmJsdXIoKTtcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYWN0aXZlID0gbnVsbDtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIHNlbGVjdGlvbi50eXBlID09PSAnQ2FyZXQnICYmXHJcbiAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblxyXG4gICAgaWYgKCFzZWxlY3Rpb24ucmFuZ2VDb3VudCkge1xyXG4gICAgICByYW5nZXMuZm9yRWFjaChmdW5jdGlvbihyYW5nZSkge1xyXG4gICAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFjdGl2ZSAmJlxyXG4gICAgYWN0aXZlLmZvY3VzKCk7XHJcbiAgfTtcclxufTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/toggle-selection/index.js\n");

/***/ })

};
;