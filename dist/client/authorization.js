'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _safeBuffer = require('safe-buffer');

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = void 0;

var set = function set(credentials) {
    if (credentials.accessToken) key = 'OAuth ' + credentials.accessToken;else if (credentials.token && credentials.key) key = 'Basic ' + new _safeBuffer.Buffer(credentials.token + ':' + credentials.key).toString('base64');else throw Error('You must provide either an `accessToken` or your `token` with the corresponding `key`.');

    _environment2.default.set(credentials.production);
};

var get = function get() {
    return key;
};

exports.default = {
    set: set,
    get: get
};