var chai = require('chai')
chai.use(require('chai-json-schema'))
var should = chai.should()
var shortid = require('shortid')

var moip = require('../index.js')({
  token: '01010101010101010101010101010101',
  key: 'ABABABABABABABABABABABABABABABABABABABAB'
})

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
}

describe('Moip Customers', function () {
  before(function (done) {
    customer.ownId = shortid.generate()
    done()
  })
  it('Successfully create a customer', function (done) {
    moip.customer.create(customer, function (error, body, response) {
      response.statusCode.should.be.eql(201)
      // Check and add Id do schema
      body.should.have.property('id')
      customer.id = body.id
      body.should.be.jsonSchema(customer)
      done()
    })
  })
  it('Successfully get a customer', function (done) {
    moip.customer.getOne(customer.id, function (error, body, response) {
      response.statusCode.should.be.eql(200)
      body.should.be.jsonSchema(customer)
      done()
    })
  })
  it('Fail to get a customer with non-existent id', function (done) {
    moip.customer.getOne('non-existent-id', function (error, body, response) {
      response.statusCode.should.be.eql(404)
      done()
    })
  })
})
