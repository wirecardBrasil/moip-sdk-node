'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api_assinaturas = require('../client/api_assinaturas');

var _api_assinaturas2 = _interopRequireDefault(_api_assinaturas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _code) {
  return _api_assinaturas2.default.get(opts, '/coupons/' + _code);
};

var getAll = function getAll(opts) {
  return _api_assinaturas2.default.get(opts, '/coupons');
};

var create = function create(opts, coupon) {
  return _api_assinaturas2.default.post(opts, '/coupons', coupon);
};

var associate = function associate(opts, _code, coupon) {
  return _api_assinaturas2.default.put(opts, '/subscriptions/' + _code, coupon);
};

var activate = function activate(opts, _code) {
  return _api_assinaturas2.default.put(opts, '/coupons/' + _code + '/active');
};

var inactivate = function inactivate(opts, _code) {
  return _api_assinaturas2.default.put(opts, '/coupons/' + _code + '/inactive');
};

exports.default = {
  getOne: getOne,
  getAll: getAll,
  create: create,
  associate: associate,
  activate: activate,
  inactivate: inactivate
};