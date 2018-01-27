'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api_assinaturas = require('../client/api_assinaturas');

var _api_assinaturas2 = _interopRequireDefault(_api_assinaturas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _code) {
  return _api_assinaturas2.default.get(opts, '/customers/' + _code);
};

var getAll = function getAll(opts) {
  return _api_assinaturas2.default.get(opts, '/customers');
};

var create = function create(opts, subscriber, config) {
  return _api_assinaturas2.default.post(opts, '/customers', subscriber, config);
};

var update = function update(opts, _code, subscriber) {
  return _api_assinaturas2.default.put(opts, '/customers/' + _code, subscriber);
};

var updateBilling = function updateBilling(opts, _code, billingInfo) {
  return _api_assinaturas2.default.put(opts, '/customers/' + _code + '/billing_infos', billingInfo);
};

exports.default = {
  getOne: getOne,
  getAll: getAll,
  create: create,
  update: update,
  updateBilling: updateBilling
};