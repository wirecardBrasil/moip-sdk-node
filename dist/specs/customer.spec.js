'use strict';

var _auth = require('./config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _customer = require('./schemas/customer');

var _customer2 = _interopRequireDefault(_customer);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(require('chai-json-schema'));
_index2.default.init(_auth2.default);

describe('Moip Customers', function () {
    before(function (done) {
        _customer2.default.ownId = _shortid2.default.generate();
        done();
    });

    it('Successfully create a customer', function (done) {
        _index2.default.customer.create(_customer2.default).then(function (response, b) {

            // Check and add Id do schema
            response.should.have.property('id');
            _customer2.default.id = response.id;
            response.should.be.jsonSchema(_customer2.default);
            done();
        }).catch(function (err) {
            return done(err.statusCode);
        });
    });

    it('Successfully get a customer', function (done) {
        _index2.default.customer.getOne(_customer2.default.id).then(function (response) {
            response.should.be.jsonSchema(_customer2.default);
            done();
        });
    });

    it('Fail to get a customer with non-existent id', function (done) {
        _index2.default.customer.getOne('non-existent-id').catch(function () {
            return done();
        });
    });
});