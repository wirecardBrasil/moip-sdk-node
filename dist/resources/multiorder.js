'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _id) {
  return _api2.default.get(opts, '/multiorders', _id);
};

var create = function create(opts, multiorder) {
  return _api2.default.post(opts, '/multiorders', multiorder);
};

exports.default = {
  getOne: getOne,
  create: create
};