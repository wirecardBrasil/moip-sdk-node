'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _api = require('../client/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = function create(opts, transfer) {
	return _api2.default.post(opts, '/transfers', transfer);
};

var reverse = function reverse(opts, _id) {
	return _api2.default.post(opts, '/transfers' + _id + '/reverse');
};

var getOne = function getOne(opts, _id) {
	return _api2.default.get(opts, '/transfers', _id);
};

var getAll = function () {
	return _api2.default.get(opts, '/transfers');
};

exports.default = {
	create: create,
	reverse: reverse,
	getOne: getOne,
	getAll: getAll
};