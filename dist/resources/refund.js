'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

var _endpoints = require('../client/endpoints');

var _endpoints2 = _interopRequireDefault(_endpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = function get(opts, _id) {
  return _api2.default.get(opts, '/refunds', _id);
};

exports.default = {
  get: get
};