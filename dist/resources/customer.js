'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _id) {
  return _api2.default.get(opts, '/customers', _id);
};

var getAll = function getAll(opts) {
  return _api2.default.get(opts, '/customers');
};

var create = function create(opts, customer) {
  return _api2.default.post(opts, '/customers', customer);
};

var createCreditCard = function createCreditCard(opts, _id, creditCard) {
  return _api2.default.post(opts, '/customers/' + _id + '/fundinginstruments', creditCard);
};

var removeCreditCard = function removeCreditCard(opts, _id) {
  return _api2.default.remove(opts, '/fundinginstruments/' + _id);
};

exports.default = {
  getOne: getOne,
  getAll: getAll,
  create: create,
  createCreditCard: createCreditCard,
  removeCreditCard: removeCreditCard
};