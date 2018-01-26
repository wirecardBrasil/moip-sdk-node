'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

var _endpoints = require('../client/endpoints');

var _endpoints2 = _interopRequireDefault(_endpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _id) {
  return _api2.default.get(opts, null, null, { customUrl: _endpoints2.default[opts.env].v2.url + '/webhooks?resourceId=' + _id });
};

var getAll = function getAll(opts) {
  return _api2.default.get(opts, '/webhooks');
};

exports.default = {
  getOne: getOne,
  getAll: getAll
};