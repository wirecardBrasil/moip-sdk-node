var auth = require('specs/config/auth.js')
var moip = require('index.js')(auth)
var customer = require('specs/schemas/customer.js')
var shortid = require('shortid')
var chai = require('chai')
chai.should()
chai.use(require('chai-json-schema'))

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
