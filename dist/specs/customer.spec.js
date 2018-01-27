'use strict';

var _auth = require('./config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _customer = require('./schemas/customer');

var _customer2 = _interopRequireDefault(_customer);

var _creditCard = require('./schemas/creditCard');

var _creditCard2 = _interopRequireDefault(_creditCard);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(require('chai-json-schema'));

var creditCardID = void 0;

describe('Moip Customers', function () {
    before(function (done) {
        _customer2.default.ownId = _shortid2.default.generate();
        done();
    });

    it('Successfully create a customer', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.customer.create(_customer2.default).then(function (response) {
                response.should.have.property('id');
                _customer2.default.id = response.id;
                response.should.be.jsonSchema(_customer2.default);
                done();
            }).catch(function (err) {
                return done(err.statusCode);
            });
        });
    });

    it('Successfully get a customer', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.customer.getOne(_customer2.default.id).then(function (response) {
                response.should.be.jsonSchema(_customer2.default);
                done();
            });
        });
    });

    it('Fail to get a customer with non-existent id', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.customer.getOne('non-existent-id').catch(function () {
                return done();
            });
        });
    });

    it('Successfully add a credit card to a customer', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.customer.createCreditCard(_customer2.default.id, _creditCard2.default).then(function (response) {
                response.should.have.property('creditCard');
                creditCardID = response.creditCard.id;
                done();
            }).catch(done);
        });
    });

    it('Successfully remove a credit card from a customer', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.customer.removeCreditCard(creditCardID).then(function () {
                done();
            }).catch(done);
        });
    });
});