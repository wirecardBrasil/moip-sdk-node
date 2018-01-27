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

describe('Moip Payments', function () {
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
                body.should.have.property('status');
                body.should.have.property('delayCapture');
                body.should.have.property('amount');
                body.should.have.property('events');
                body.should.have.property('receivers');
                body.should.have.property('_links');
                body.should.have.property('createdAt');
                body.should.have.property('updatedAt');
                _payment2.default.id = body.id;
                _payment2.default.status = body.status;
                _payment2.default.delayCapture = body.delayCapture;
                _payment2.default.amount = body.amount;
                _payment2.default.events = body.events;
                _payment2.default.receivers = body.receivers;
                _payment2.default._links = body._links;
                _payment2.default.createdAt = body.createdAt;
                _payment2.default.updatedAt = body.updatedAt;
                body.should.be.jsonSchema(_payment2.default);
                done();
            }).catch(done);
        });
    });

    it('Should successfully get a payment', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment.getOne(_payment2.default.id).then(function (body) {
                body.should.be.jsonSchema(_payment2.default);
                done();
            }).catch(done);
        });
    });

    it('Should fail to get a payment', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment.getOne('invalid-id').catch(function () {
                return done();
            });
        });
    });
});

describe('Moip Payment Pre-Authorization Capture', function () {
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

    it('Should successfully create an order', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.order.create(_order2.default).then(function (body) {
                order_id = body.id;
                done();
            }).catch(done);
        });
    });

    it('Should create payment with pre authorization', function (done) {
        _payment2.default.delayCapture = true;
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment.create(order_id, _payment2.default).then(function (body) {
                body.should.have.property('id');
                body.delayCapture.should.be.eql(true);
                _payment2.default.id = body.id;
                done();
            }).catch(done);
        });
    });

    it('Should capture payment pre authorized', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment.preAuthorizationCapture(_payment2.default.id).then(function (body) {
                body.status.should.be.eql('AUTHORIZED');
                done();
            }).catch(done);
        });
    });
});

describe('Moip Payment Pre-Authorization Cancel', function () {
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

    it('Should successfully create an order', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.order.create(_order2.default).then(function (body) {
                order_id = body.id;
                done();
            }).catch(done);
        });
    });

    it('Should create payment with pre authorization', function (done) {
        _payment2.default.delayCapture = true;
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment.create(order_id, _payment2.default).then(function (body) {
                body.should.have.property('id');
                body.delayCapture.should.be.eql(true);
                _payment2.default.id = body.id;
                done();
            }).catch(done);
        });
    });

    it('Should cancel payment pre authorized', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment.preAuthorizationCancel(_payment2.default.id).then(function (body) {
                body.status.should.be.eql('CANCELLED');
                done();
            }).catch(done);
        });
    });
});

describe('Moip Payment Simulate Authorization', function () {
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

    it('Should successfully create an order', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.order.create(_order2.default).then(function (body) {
                order_id = body.id;
                done();
            }).catch(done);
        });
    });

    it('Should create payment', function (done) {
        _payment2.default.delayCapture = false;
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment.create(order_id, _payment2.default).then(function (body) {
                body.should.have.property('id');
                _payment2.default.id = body.id;
                done();
            }).catch(function (err) {
                return done(err);
            });
        });
    });

    it('Should authorize payment in sandbox', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment._authorize(_payment2.default.id, _payment2.default.amount.total).then(function (body) {
                return done();
            }).catch(done);
        });
    });

    it('Should get an authorized payment in sandbox', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.payment.getOne(_payment2.default.id).then(function (body) {
                body.status.should.be.eql('AUTHORIZED');
                done();
            }).catch(done);
        });
    });
});