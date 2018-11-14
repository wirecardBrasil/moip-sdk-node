'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(opts, account) {
  return _api2.default.post(opts, '/accounts', account);
};

var getOne = function getOne(opts, _id) {
  return _api2.default.get(opts, '/accounts', _id);
};

var exists = function exists(opts, _query) {
  return _api2.default.get(opts, '/accounts/exists', null, null, (0, _utils.getQuerystring)(_query));
};

exports.default = {
  create: create,
  getOne: getOne,
  exists: exists
};