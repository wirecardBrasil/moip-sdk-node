'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api_assinaturas = require('../client/api_assinaturas');

var _api_assinaturas2 = _interopRequireDefault(_api_assinaturas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _code) {
  return _api_assinaturas2.default.get(opts, '/subscriptions/' + _code);
};

var getAll = function getAll(opts) {
  return _api_assinaturas2.default.get(opts, '/subscriptions');
};

var create = function create(opts, subscription, config) {
  return _api_assinaturas2.default.post(opts, '/subscriptions', subscription, config);
};

var update = function update(opts, _code, subscription) {
  return _api_assinaturas2.default.put(opts, '/subscriptions/' + _code, subscription);
};

var updatePaymentMethod = function updatePaymentMethod(opts, _code, paymentMethod) {
  return _api_assinaturas2.default.put(opts, '/subscriptions/' + _code + '/change_payment_method', paymentMethod);
};

var suspend = function suspend(opts, _code) {
  return _api_assinaturas2.default.put(opts, '/subscriptions/' + _code + '/suspend');
};

var activate = function activate(opts, _code) {
  return _api_assinaturas2.default.put(opts, '/subscriptions/' + _code + '/activate');
};

var cancel = function cancel(opts, _code) {
  return _api_assinaturas2.default.put(opts, '/subscriptions/' + _code + '/cancel');
};

var getOneInvoice = function getOneInvoice(opts, _id) {
  return _api_assinaturas2.default.get(opts, '/invoices/' + _id);
};

var getAllInvoices = function getAllInvoices(opts, _code) {
  return _api_assinaturas2.default.get(opts, '/subscriptions/' + _code + '/invoices');
};

var getOnePayment = function getOnePayment(opts, _id) {
  return _api_assinaturas2.default.get(opts, '/payments/' + _id);
};

var getAllPayments = function getAllPayments(opts, _id) {
  return _api_assinaturas2.default.get(opts, '/invoices/' + _id + '/payments');
};

var createNotification = function createNotification(opts, notification) {
  return _api_assinaturas2.default.post(opts, '/users/preferences', notification);
};

exports.default = {
  getOne: getOne,
  getAll: getAll,
  create: create,
  update: update,
  updatePaymentMethod: updatePaymentMethod,
  suspend: suspend,
  activate: activate,
  cancel: cancel,
  getOneInvoice: getOneInvoice,
  getAllInvoices: getAllInvoices,
  getOnePayment: getOnePayment,
  getAllPayments: getAllPayments,
  createNotification: createNotification
};