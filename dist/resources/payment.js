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
  return _api2.default.get(opts, '/payments', _id);
};

var create = function create(opts, orderId, payment) {
  return _api2.default.post(opts, '/orders/' + orderId + '/payments', payment);
};

var preAuthorizationCapture = function preAuthorizationCapture(opts, _id) {
  return _api2.default.post(opts, '/payments/' + _id + '/capture');
};

var preAuthorizationCancel = function preAuthorizationCancel(opts, _id) {
  return _api2.default.post(opts, '/payments/' + _id + '/void');
};

var _authorize = function _authorize(opts, _id, amount) {
  return _api2.default.get(opts, null, null, { customUrl: _endpoints2.default.sandbox.v2.authorizePaymentSimulationUrl + '?payment_id=' + _id + '&amount' + amount });
};

var refund = function refund(opts, _id, _refund) {
  return _api2.default.post(opts, '/payments/' + _id + '/refunds', _refund);
};

var getRefunds = function getRefunds(opts, _id) {
  return _api2.default.get(opts, '/payments/' + _id + '/refunds');
};

exports.default = {
  getOne: getOne,
  create: create,
  preAuthorizationCapture: preAuthorizationCapture,
  preAuthorizationCancel: preAuthorizationCancel,
  _authorize: _authorize,
  refunds: {
    create: refund,
    get: getRefunds
  }
};