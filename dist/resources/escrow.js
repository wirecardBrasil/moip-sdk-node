'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var release = function release(opts, _id) {
  return _api2.default.post(opts, '/escrows/' + _id + '/release', null);
};

exports.default = {
  release: release
};