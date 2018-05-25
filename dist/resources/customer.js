'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOne = function getOne(opts, _id) {
  return _api2.default.get(opts, '/customers', _id);
};

var getAll = function getAll(opts) {
  return _api2.default.get(opts, '/customers');
};

var getByQuery = function getByQuery(opts, _query) {
  return _api2.default.get(opts, '/customers', null, null, Object.assign(_query, { filters: (0, _utils.formatFilters)(_query.filters) }));
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
  getByQuery: getByQuery,
  createCreditCard: createCreditCard,
  removeCreditCard: removeCreditCard
};