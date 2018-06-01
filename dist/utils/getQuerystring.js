'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var formatField = function formatField(field, key) {
  return key + '(' + field + ')';
};

var formatFilter = function formatFilter(filter) {
  return _lodash2.default.map(filter, formatField);
};

var stringify = function stringify(queryObj) {
  var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '|';
  var eq = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '::';
  return _querystring2.default.unescape(_queryString2.default.stringify(queryObj)).replace(/&/g, sep).replace(/=/g, eq);
};

var getFiltersQuerystring = function getFiltersQuerystring(filters) {
  return _lodash2.default.mapValues(filters, function (filter, key) {
    return stringify(_defineProperty({}, key, formatFilter(filter)));
  });
};

var formatQueryStringFilters = function formatQueryStringFilters(filters) {
  return _lodash2.default.toArray(getFiltersQuerystring(filters)).join('&');
};

var getQuerystring = function getQuerystring(_query) {
  return _query && stringify(Object.assign(_query, _query.filters && { filters: formatQueryStringFilters(_query.filters) }), '&', '=');
};

exports.default = getQuerystring;