'use strict';

var _auth = require('./config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _order = require('./schemas/order');

var _order2 = _interopRequireDefault(_order);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(require('chai-json-schema'));

describe('Moip Orders', function () {
    before(function (done) {
        _order2.default.ownId = _shortid2.default.generate();
        _order2.default.customer.ownId = _shortid2.default.generate();
        done();
    });

    it('Should successfully create an order', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.order.create(_order2.default).then(function (body) {
                // Verify and add to schema
                body.should.have.property('id');
                body.should.have.property('status');
                body.should.have.property('createdAt');
                body.should.have.property('updatedAt');
                body.should.have.property('customer');
                body.should.have.property('_links');
                _order2.default.id = body.id;
                _order2.default.status = body.status;
                _order2.default.createdAt = body.createdAt;
                _order2.default.updatedAt = body.updatedAt;
                _order2.default.customer = body.customer;
                _order2.default._links = body._links;
                body.should.be.jsonSchema(_order2.default);
                done();
            }).catch(function (err) {
                return done(err);
            });
        });
    });

    it('Should successfully get an order', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.order.getOne(_order2.default.id).then(function (body) {
                body.should.be.jsonSchema(_order2.default);
                done();
            }).catch(function (err) {
                return done(err);
            });
        });
    });

    it('Should fail to get an order', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.order.getOne('invalid-id').catch(function () {
                return done();
            });
        });
    });

    it('Should successfully get all orders', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.order.getAll().then(function (body) {
                done();
            }).catch(function (err) {
                return done(err);
            });
        });
    });
});