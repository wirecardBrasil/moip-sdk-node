'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(_id) {
    return _api2.default.get('/customers', _id);
};

var getAll = function getAll() {
    return _api2.default.get('/customers');
};

var create = function create(customer) {
    return _api2.default.post('/customers', customer);
};

var createCreditCard = function createCreditCard(_id, credit_card) {
    return _api2.default.post('/customers/' + _id + '/fundinginstruments', credit_card);
};

var deleteCreditCard = function deleteCreditCard(_id) {
    return _api2.default.remove('/fundinginstruments/' + _id);
};

exports.default = {
    getOne: getOne,
    getAll: getAll,
    create: create,
    createCreditCard: createCreditCard,
    deleteCreditCard: deleteCreditCard
};