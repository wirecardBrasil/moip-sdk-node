'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatField = function formatField(field) {
  return '(' + field + ')';
};

var formatFilter = function formatFilter(filter) {
  return _lodash2.default.mapValues(filter, formatField);
};

var stringify = function stringify(queryObj) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '|';
  var eq = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '::';
  return _querystring2.default.unescape(_querystring2.default.stringify(queryObj, sep, eq));
};

var formatFilters = function formatFilters(filters) {
  return stringify(_lodash2.default.mapValues(filters, function (filter) {
    return stringify(formatFilter(filter));
  }));
};

exports.default = formatFilters;