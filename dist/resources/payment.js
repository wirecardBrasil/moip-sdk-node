'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _endpoints = require('../client/endpoints');

var _endpoints2 = _interopRequireDefault(_endpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(_id) {
    return _api2.default.get('/payments', _id);
};

var create = function create(order_id, payment) {
    return _api2.default.post('/orders/' + order_id + '/payments', payment);
};

var refund = function refund(_id) {
    return _api2.default.post('/payments/' + _id + '/refunds');
};

var preAuthorizationCapture = function preAuthorizationCapture(_id) {
    return _api2.default.post('/payments/' + _id + '/capture');
};

var preAuthorizationCancel = function preAuthorizationCancel(_id) {
    return _api2.default.post('/payments/' + _id + '/void');
};

var _authorize = function _authorize(_id, amount) {
    return _api2.default.get(null, null, { customUrl: _endpoints2.default.sandbox.v2.authorizePaymentSimulationUrl + '?payment_id=' + _id + '&amount' + amount });
};

exports.default = {
    getOne: getOne,
    create: create,
    refund: refund,
    preAuthorizationCapture: preAuthorizationCapture,
    preAuthorizationCancel: preAuthorizationCancel,
    _authorize: _authorize
};