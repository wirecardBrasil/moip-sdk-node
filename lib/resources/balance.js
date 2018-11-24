'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne (opts) {
  return _api2.default.get(opts, '/balances');
};

exports.default = {
  getOne: getOne
}
