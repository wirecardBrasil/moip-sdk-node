'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(account) {
    return _api2.default.post('/accounts', account);
};

var getOne = function getOne(_id) {
    return _api2.default.get('/accounts', _id);
};

exports.default = {
    create: create,
    getOne: getOne
};