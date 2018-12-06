'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _id) {
  return _api2.default.get(opts, '/transfers', _id);
};

var getAll = function getAll(opts) {
  return _api2.default.get(opts, '/transfers');
};

var reverse = function reverse(opts, _id) {
  return _api2.default.post(opts, '/transfers/' + _id + '/reverse');
};

var create = function create(opts, transfer) {
  return _api2.default.post(opts, '/transfers', transfer);
};

exports.default = {
  getOne: getOne,
  getAll: getAll,
  reverse: reverse,
  create: create
};