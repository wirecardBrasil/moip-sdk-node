'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

var _endpoints = require('../client/endpoints');

var _endpoints2 = _interopRequireDefault(_endpoints);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _id) {
  return _api2.default.get(opts, null, null, { customUrl: _endpoints2.default[opts.env].v2.url + '/webhooks?resourceId=' + _id });
};

var query = function query(opts, _query) {
  return _api2.default.get(opts, '/webhooks', null, null, (0, _utils.getQuerystring)(_query));
};

var getAll = function getAll(opts) {
  return _api2.default.get(opts, '/webhooks');
};

exports.default = {
  getOne: getOne,
  query: query,
  getAll: getAll
};