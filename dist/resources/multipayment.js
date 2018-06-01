'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _id) {
  return _api2.default.get(opts, '/multipayments', _id);
};

var create = function create(opts, multiorderId, multipayment) {
  return _api2.default.post(opts, '/multiorders/' + multiorderId + '/multipayments', multipayment);
};

var preAuthorizationCapture = function preAuthorizationCapture(opts, _id) {
  return _api2.default.post(opts, '/multipayments/' + _id + '/capture');
};

var preAuthorizationCancel = function preAuthorizationCancel(opts, _id) {
  return _api2.default.post(opts, '/multipayments/' + _id + '/void');
};

exports.default = {
  getOne: getOne,
  create: create,
  preAuthorizationCapture: preAuthorizationCapture,
  preAuthorizationCancel: preAuthorizationCancel
};