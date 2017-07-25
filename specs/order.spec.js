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

describe('Moip Orders', function() {
    before(function(done) {
        order.ownId = shortid.generate();
        order.customer.ownId = shortid.generate();
        done();
    });
    it('Should successfully create an order', function(done) {
        moip.order.create(order, function(error, body, response) {
            response.statusCode.should.be.eql(201);
            //Verify and add to schema
            body.should.have.property('id');
            body.should.have.property('status');
            body.should.have.property('createdAt');
            body.should.have.property('updatedAt');
            body.should.have.property('customer');
            body.should.have.property('_links');
            order.id = body.id;
            order.status = body.status;
            order.createdAt = body.createdAt;
            order.updatedAt = body.updatedAt;
            order.customer = body.customer;
            order._links = body._links;
            body.should.be.jsonSchema(order);
            done();
        });
    });
    it('Should successfully get an order', function(done) {
        moip.order.getOne(order.id, function(error, body, response) {
            response.statusCode.should.be.eql(200);
            body.should.be.jsonSchema(order);
            done();
        });
    });
    it('Should fail to get an order', function(done) {
        moip.order.getOne('invalid-id', function(error, body, response) {
            response.statusCode.should.be.eql(404);
            done();
        });
    });
    it('Should successfully get all orders', function(done) {
        moip.order.getAll(function(error, body, response) {
            response.statusCode.should.be.eql(200);
            done();
        });
    });
});
