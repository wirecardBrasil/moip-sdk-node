'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _authorization = require('./client/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _endpoints = require('./client/endpoints');

var _endpoints2 = _interopRequireDefault(_endpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = function get(endpoint, id, opts) {
    var options = {
        url: opts && opts.customUrl ? opts.customUrl : '' + _endpoints2.default['sandbox'].v2.url + endpoint + '/' + (id || ''),
        headers: {
            'Authorization': _authorization2.default.get()
        },
        method: 'GET',
        json: true
    };

    return (0, _requestPromise2.default)(options);
};

var post = function post(endpoint, payload) {
    var options = {
        url: '' + _endpoints2.default['sandbox'].v2.url + endpoint,
        headers: {
            'Authorization': _authorization2.default.get()
        },
        method: 'POST',
        body: payload,
        json: true
    };
    return (0, _requestPromise2.default)(options);
};

var remove = function remove(endpoint) {
    var options = {
        url: '' + _endpoints2.default['sandbox'].v2.url + endpoint,
        headers: {
            'Authorization': _authorization2.default.get()
        },
        method: 'DELETE',
        json: true
    };
};

exports.default = {
    get: get,
    post: post
};