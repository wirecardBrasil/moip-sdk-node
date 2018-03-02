'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

var _endpoints = require('../client/endpoints');

var _endpoints2 = _interopRequireDefault(_endpoints);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _snakecaseKeys = require('snakecase-keys');

var _snakecaseKeys2 = _interopRequireDefault(_snakecaseKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAuthorizeUrl = function getAuthorizeUrl(opts, _ref) {
  var clientId = _ref.clientId,
      redirectUri = _ref.redirectUri,
      scopes = _ref.scopes;

  return new _bluebird2.default(function (resolve, reject) {
    if (clientId && redirectUri && scopes) {
      var responseType = 'response_type=code';
      return resolve(_endpoints2.default[opts.env].v2.authorizeUrl + '?' + responseType + '&client_id=' + clientId + '&redirect_uri=' + redirectUri + '&scope=' + scopes);
    } else {
      return reject(new Error('Please inform the config object passing your client_id, redirect_uri and the list of scopes'));
    }
  });
};

var generateToken = function generateToken(opts, config) {
  return _api2.default.post(opts, null, (0, _snakecaseKeys2.default)(config), { customUrl: _endpoints2.default[opts.env].v2.generateTokenUrl, form: true });
};

exports.default = {
  getAuthorizeUrl: getAuthorizeUrl,
  generateToken: generateToken
};