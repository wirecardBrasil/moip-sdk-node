'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api_assinaturas = require('../client/api_assinaturas');

var _api_assinaturas2 = _interopRequireDefault(_api_assinaturas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _code) {
  return _api_assinaturas2.default.get(opts, '/plans/' + _code);
};

var getAll = function getAll(opts) {
  return _api_assinaturas2.default.get(opts, '/plans');
};

var create = function create(opts, plan) {
  return _api_assinaturas2.default.post(opts, '/plans', plan);
};

var activate = function activate(opts, _code) {
  return _api_assinaturas2.default.put(opts, '/plans/' + _code + '/activate');
};

var inactivate = function inactivate(opts, _code) {
  return _api_assinaturas2.default.put(opts, '/plans/' + _code + '/inactivate');
};

var update = function update(opts, _code, plan) {
  return _api_assinaturas2.default.put(opts, '/plans/' + _code, plan);
};

exports.default = {
  getOne: getOne,
  getAll: getAll,
  create: create,
  activate: activate,
  inactivate: inactivate,
  update: update
};