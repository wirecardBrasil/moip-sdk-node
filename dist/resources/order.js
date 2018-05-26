'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _id) {
  return _api2.default.get(opts, '/orders', _id);
};

var getAll = function getAll(opts) {
  return _api2.default.get(opts, '/orders');
};

var query = function query(opts, _query) {
  return _api2.default.get(opts, '/orders', null, null, (0, _utils.getQuerystring)(_query));
};

var create = function create(opts, order) {
  return _api2.default.post(opts, '/orders', order);
};

var refund = function refund(opts, _id, method) {
  return _api2.default.post(opts, '/orders/' + _id + '/refunds', method || null);
};

var getRefunds = function getRefunds(opts, _id) {
  return _api2.default.get(opts, '/orders/' + _id + '/refunds');
};

exports.default = {
  getOne: getOne,
  getAll: getAll,
  create: create,
  query: query,
  refunds: {
    create: refund,
    get: getRefunds
  }
};