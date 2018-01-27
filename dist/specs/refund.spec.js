'use strict';

var _auth = require('./config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _order = require('./schemas/order');

var _order2 = _interopRequireDefault(_order);

var _payment = require('./schemas/payment');

var _payment2 = _interopRequireDefault(_payment);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(require('chai-json-schema'));

describe('Moip Payment Refunds', function () {
    before(function (done) {
        _order2.default.ownId = _shortid2.default.generate();
        _order2.default.customer.ownId = _shortid2.default.generate();
        done();
    });

    var order_id = void 0;

    it('Should successfully create an order', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.order.create(_order2.default).then(function (body) {
                order_id = body.id;
                done();
            }).catch(done);
        });
    });

    it('Should successfully create a payment for an order', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment.create(order_id, _payment2.default).then(function (body) {
                // Verify and add to schema
                body.should.have.property('id');
                _payment2.default.id = body.id;
                done();
            }).catch(done);
        });
    });

    it('Should successfully refund the payment', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment.refund(_payment2.default.id).then(function (body) {
                body.should.have.property('id');
                body.should.have.property('status');
                body.status.should.be.eql('COMPLETED');
                done();
            }).catch(done);
        });
    });
});

describe('Moip Order Refunds', function () {
    before(function (done) {
        _order2.default.ownId = _shortid2.default.generate();
        _order2.default.customer.ownId = _shortid2.default.generate();
        done();
    });

    var order_id = void 0;

    it('Should successfully create an order', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.order.create(_order2.default).then(function (body) {
                order_id = body.id;
                done();
            }).catch(done);
        });
    });

    it('Should successfully create a payment for an order', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment.create(order_id, _payment2.default).then(function (body) {
                // Verify and add to schema
                body.should.have.property('id');
                _payment2.default.id = body.id;
                done();
            }).catch(done);
        });
    });

    it('Should successfully refund the payment', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.order.refund(order_id).then(function (body) {
                body.should.have.property('id');
                body.should.have.property('status');
                body.status.should.be.eql('COMPLETED');
                done();
            }).catch(done);
        });
    });
});