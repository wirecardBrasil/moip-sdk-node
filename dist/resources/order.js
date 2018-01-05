'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(_id) {
    return _api2.default.get('/orders', _id);
};

var getAll = function getAll() {
    return _api2.default.get('/orders');
};

var create = function create(order) {
    return _api2.default.post('/orders', order);
};

exports.default = {
    getOne: getOne,
    getAll: getAll,
    create: create
};