'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(opts, _id, bankAccount) {
  return _api2.default.post(opts, '/accounts/' + _id + '/bankaccounts', bankAccount);
};

var getOne = function getOne(opts, _id) {
  return _api2.default.get(opts, '/bankaccounts', _id);
};

var getAll = function getAll(opts, _id) {
  return _api2.default.get(opts, '/accounts/' + _id + '/bankaccounts');
};

var remove = function remove(opts, _id) {
  return _api2.default.remove(opts, '/bankaccounts/' + _id);
};

exports.default = {
  create: create,
  getOne: getOne,
  getAll: getAll,
  remove: remove
};