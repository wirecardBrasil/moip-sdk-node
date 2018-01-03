'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initAuthorization = undefined;

var _safeBuffer = require('safe-buffer');

var authorization = void 0;

var initAuthorization = function initAuthorization(credentials) {
    if (credentials.accessToken) authorization = 'OAuth ' + credentials.accessToken;else if (credentials.token && credentials.key) authorization = 'Basic ' + new _safeBuffer.Buffer(credentials.token + ':' + credentials.key).toString('base64');else throw Error('You must provide either an `accessToken` or your `token` with the corresponding `key`.');

    console.log(authorization);
};

exports.initAuthorization = initAuthorization;
exports.default = authorization;