'use strict';

var _auth = require('./config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _order = require('./schemas/order');

var _order2 = _interopRequireDefault(_order);

var _paymentWithEscrow = require('./schemas/paymentWithEscrow');

var _paymentWithEscrow2 = _interopRequireDefault(_paymentWithEscrow);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(require('chai-json-schema'));

describe('Moip Escrow', function () {
    /*
         Create delay between requests
     */
    beforeEach(function (done) {
        setTimeout(done, 500);
    });

    before(function (done) {
        _order2.default.ownId = _shortid2.default.generate();
        _order2.default.customer.ownId = _shortid2.default.generate();
        done();
    });

    var order_id = void 0;
    var escrow_id = void 0;

    it('Should successfully create an order', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.order.create(_order2.default).then(function (body) {
                order_id = body.id;
                done();
            }).catch(done);
        });
    });

    it('Should create payment with escrow', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment.create(order_id, _paymentWithEscrow2.default).then(function (body) {
                body.should.have.property('id');
                body.should.have.property('escrows');
                _chai2.default.expect(body.escrows).to.be.an('array').that.is.not.empty();
                escrow_id = body.escrows[0].id;
                done();
            }).catch(done);
        });
    });

    it('Should release escrow', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.escrow.release(escrow_id).then(function (body) {
                body.should.have.property('id');
                body.status.should.be.eql('RELEASED');
                done();
            }).catch(done);
        });
    });
});