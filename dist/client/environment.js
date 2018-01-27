'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var env = void 0;

var set = function set(isProduction) {
    if (isProduction) env = 'production';else env = 'sandbox';
};

var get = function get() {
    return env;
};

exports.default = {
    set: set,
    get: get
};