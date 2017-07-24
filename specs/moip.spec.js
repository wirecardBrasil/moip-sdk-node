var chai = require('chai');
var should = chai.should();
var shortid = require('shortid');

var moip = require('../index.js')({
    token: '01010101010101010101010101010101',
    key: 'ABABABABABABABABABABABABABABABABABABABAB'
});

var customer = {
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
        city: 'Sao Paulo',
        complement: '8',
        district: 'Itaim',
        street: 'Avenida Faria Lima',
        streetNumber: '2927',
        zipCode: '01234000',
        state: 'SP',
        country: 'BRA'
    }
};

describe('Moip Customers', function() {
    before(function(done) {
        customer.ownId = shortid.generate();
        done();
    });
    it('Successfully create a customer', function(done) {
        moip.customer.create(customer, function(error, body, response) {
            response.statusCode.should.be.eql(201);
            body.should.have.property('id');
            body.should.have.property('ownId');
            body.ownId.should.be.eql(customer.ownId);
            body.should.have.property('fullname');
            body.fullname.should.be.eql(customer.fullname);
            body.should.have.property('email');
            body.email.should.be.eql(customer.email);
            body.should.have.property('phone');
            body.phone.should.be.a('object');
            body.phone.countryCode.should.be.eql(customer.phone.countryCode);
            body.phone.areaCode.should.be.eql(customer.phone.areaCode);
            body.phone.number.should.be.eql(customer.phone.number);
            body.should.have.property('shippingAddress');
            body.shippingAddress.should.be.a('object');
            body.shippingAddress.city.should.be.eql(customer.shippingAddress.city);
            body.shippingAddress.complement.should.be.eql(customer.shippingAddress.complement);
            body.shippingAddress.district.should.be.eql(customer.shippingAddress.district);
            body.shippingAddress.street.should.be.eql(customer.shippingAddress.street);
            body.shippingAddress.streetNumber.should.be.eql(customer.shippingAddress.streetNumber);
            body.shippingAddress.zipCode.should.be.eql(customer.shippingAddress.zipCode);
            body.shippingAddress.state.should.be.eql(customer.shippingAddress.state);
            body.shippingAddress.country.should.be.eql(customer.shippingAddress.country);
            //Set ID
            customer.id = body.id;
            done();
        });
    });
    it('Successfully get a customer', function(done) {
        moip.customer.get(customer.id, function(error, body, response) {
            response.statusCode.should.be.eql(200);
            done();
        });
    });
    it('Fail to get a customer', function(done) {
        moip.customer.get('non-existent-idc', function(error, body, response) {
            response.statusCode.should.be.eql(404);
            done();
        });
    });
});
