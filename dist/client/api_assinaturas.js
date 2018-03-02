'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _endpoints = require('./endpoints');

var _endpoints2 = _interopRequireDefault(_endpoints);

var _package = require('../../package');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = function get(opts, endpoint, id, config) {
  var options = {
    url: config && config.customUrl ? config.customUrl : '' + _endpoints2.default[opts.env].assinaturas.url + endpoint + '/' + (id || ''),
    headers: {
      'Authorization': opts.auth,
      'User-Agent': 'MoipNodeSDK/' + _package2.default.version + ' (+https://github.com/moip/moip-sdk-node/)'
    },
    method: 'GET',
    json: true,
    resolveWithFullResponse: true
  };

  return (0, _requestPromise2.default)(options);
};

var post = function post(opts, endpoint, payload, config) {
  var options = {
    url: config && config.customUrl ? config.customUrl : '' + _endpoints2.default[opts.env].assinaturas.url + endpoint,
    headers: {
      'Authorization': opts.auth,
      'User-Agent': 'MoipNodeSDK/' + _package2.default.version + ' (+https://github.com/moip/moip-sdk-node/)'
    },
    method: 'POST',
    body: payload,
    form: config && config.form,
    json: !config || !config.form,
    resolveWithFullResponse: true
  };

  return (0, _requestPromise2.default)(options);
};

var put = function put(opts, endpoint, payload, id, config) {
  var options = {
    url: config && config.customUrl ? config.customUrl : '' + _endpoints2.default[opts.env].assinaturas.url + endpoint + '/' + (id || ''),
    headers: {
      'Authorization': opts.auth,
      'content-type': 'application/json',
      'User-Agent': 'MoipNodeSDK/' + _package2.default.version + ' (+https://github.com/moip/moip-sdk-node/)'
    },
    method: 'PUT',
    body: payload,
    form: config && config.form,
    json: !config || !config.form,
    resolveWithFullResponse: true
  };

  return (0, _requestPromise2.default)(options);
};

var remove = function remove(opts, endpoint) {
  var options = {
    url: '' + _endpoints2.default[opts.env].assinaturas.url + endpoint,
    headers: {
      'Authorization': opts.auth,
      'User-Agent': 'MoipNodeSDK/' + _package2.default.version + ' (+https://github.com/moip/moip-sdk-node/)'
    },
    method: 'DELETE',
    json: true,
    resolveWithFullResponse: true
  };

  return (0, _requestPromise2.default)(options);
};

exports.default = {
  get: get,
  post: post,
  remove: remove,
  put: put
};