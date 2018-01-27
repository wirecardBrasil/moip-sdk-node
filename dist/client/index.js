'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _safeBuffer = require('safe-buffer');

var _resources = require('./resources');

var _resources2 = _interopRequireDefault(_resources);

var _lodash = require('lodash');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var environment = function environment(isProduction) {
  return isProduction ? 'production' : 'sandbox';
};

var authorization = function authorization(opts) {
  var auth = void 0;
  if (opts.accessToken) {
    auth = 'OAuth ' + opts.accessToken;
  } else if (opts.token && opts.key) {
    auth = 'Basic ' + new _safeBuffer.Buffer(opts.token + ':' + opts.key).toString('base64');
  } else {
    throw Error('You must provide either an `accessToken` or your `token` with the corresponding `key`.');
  }

  return auth;
};

var connect = function connect(opts) {
  var auth = authorization(opts);
  var env = environment(opts.production);

  return _bluebird2.default.resolve((0, _lodash.reduce)(_resources2.default, function (result, resource, key) {
    result[key] = (0, _lodash.reduce)(resource, function (result, func, key) {
      result[key] = (0, _lodash.bind)(func, null, { auth: auth, env: env });
      return result;
    }, {});

    return result;
  }, {}));
};

exports.default = {
  connect: connect
};