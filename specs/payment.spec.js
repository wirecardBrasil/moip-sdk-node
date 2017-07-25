var chai = require('chai');
var should = chai.should();
chai.use(require('chai-json-schema'));
var shortid = require('shortid');

var moip = require('../index.js')({
    token: '01010101010101010101010101010101',
    key: 'ABABABABABABABABABABABABABABABABABABABAB'
});

var order = {
    amount: {
        currency: 'BRL',
        subtotals: {
            shipping: 1000
        }
    },
    items: [{
        product: 'Descrição do pedido',
        quantity: 1,
        detail: 'Mais info...',
        price: 1000
    }],
    customer: {
        fullname: 'Jose Silva',
        email: 'jose_silva0@email.com',
        birthDate: '1988-12-30',
        taxDocument: {
            type: 'CPF',
            number: '22222222222'
        },
        phone: {
            countryCode: '55',
            areaCode: '11',
            number: '66778899'
        },
        shippingAddress: {
            street: 'Avenida Faria Lima',
            streetNumber: 2927,
            complement: 8,
            district: 'Itaim',
            city: 'Sao Paulo',
            state: 'SP',
            country: 'BRA',
            zipCode: '01234000'
        }
    }
};

var payment = {
    installmentCount: 1,
    fundingInstrument: {
        method: "CREDIT_CARD",
        creditCard: {
            hash: "HhL0kbhfid+jwgj5l6Kt9EPdetDxQN8s7uKUHDYxDC/XoULjzik44rSda3EcWuOcL17Eb8JjWc1JI7gsuwg9P0rJv1mJQx+d3Dv1puQYz1iRjEWWhnB1bw0gTvnnC/05KbWN5M8oTiugmhVK02Rt2gpbcTtpS7VWyacfgesBJFavYYMljYg8p2YGHXkXrMuQiOCeemKLk420d0OTMBba27jDVVJ663HZDrObnjFXJH/4B5irkj+HO5genV+V4PYoLcOESG4nrI3oFAsMGsLLcdJo0NNvkEmJpn0e9GzureKKFYisYU+BEd9EMr/odS0VMvOYRV65HbPTspIkjl2+3Q==",
            holder: {
                fullname: "Jose Santos",
                birthdate: "1980-01-02",
                taxDocument: {
                    type: "CPF",
                    number: "12345679891"
                },
                phone: {
                    countryCode: "55",
                    areaCode: "11",
                    number: "25112511"
                }
            }
        }
    }
};

describe('Moip Payments', function() {
    before(function(done) {
        // Create an order
        order.ownId = shortid.generate();
        order.customer.ownId = shortid.generate();
        moip.order.create(order, function(error, body, response) {
            order.id = body.id;
            done();
        });
    });
    it('Should successfully create a payment for an order', function(done) {
        moip.payment.create(order.id, payment, function(error, body, response) {
            response.statusCode.should.be.eql(201);
            //Verify and add to schema
            body.should.have.property('id');
            body.should.have.property('status');
            body.should.have.property('delayCapture');
            body.should.have.property('amount');
            body.should.have.property('events');
            body.should.have.property('receivers');
            body.should.have.property('_links');
            body.should.have.property('createdAt');
            body.should.have.property('updatedAt');
            payment.id = body.id;
            payment.status = body.status;
            payment.delayCapture = body.delayCapture;
            payment.amount = body.amount;
            payment.events = body.events;
            payment.receivers = body.receivers;
            payment._links = body._links;
            payment.createdAt = body.createdAt;
            payment.updatedAt = body.updatedAt;
            body.should.be.jsonSchema(payment);
            done();
        });
    });
    it('Should successfully get a payment', function(done) {
        moip.payment.getOne(payment.id, function(error, body, response) {
            response.statusCode.should.be.eql(200);
            body.should.be.jsonSchema(payment);
            done();
        });
    });
    it('Should fail to get a payment', function(done) {
        moip.payment.getOne('invalid-id', function(error, body, response) {
            response.statusCode.should.be.eql(404);
            done();
        });
    });
});

describe('Moip Payment Authorization', function() {
    /*
      Create delay between requests
    */
    beforeEach(function(done) {
        setTimeout(function() {
            done();
        }, 2000);
    });
    it('Should authorize payment in sandbox', function(done) {
        moip.payment.authorize(payment.id, payment.amount.total, function(error, response) {
            response.statusCode.should.be.eql(200);
            done();
        });
    });
    it('Should get an authorized payment in sandbox', function(done) {
        moip.payment.getOne(payment.id, function(error, body, response) {
            response.statusCode.should.be.eql(200);
            body.status.should.be.eql('AUTHORIZED');
            done();
        });
    });
});
