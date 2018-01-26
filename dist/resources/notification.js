'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _id) {
  return _api2.default.get(opts, '/preferences/notifications', _id);
};

var getAll = function getAll(opts) {
  return _api2.default.get(opts, '/preferences/notifications');
};

var create = function create(opts, preferences) {
  return _api2.default.post(opts, '/preferences/notifications', preferences);
};

var remove = function remove(opts, _id) {
  return _api2.default.remove(opts, '/preferences/notifications/' + _id);
};

exports.default = {
  getOne: getOne,
  getAll: getAll,
  create: create,
  remove: remove
};