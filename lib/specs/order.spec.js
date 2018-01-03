var auth = require('specs/config/auth.js')
var moip = require('index.js')(auth)
var order = require('specs/schemas/order.js')
var shortid = require('shortid')
var chai = require('chai')
chai.should()
chai.use(require('chai-json-schema'))

describe('Moip Orders', function () {
  before(function (done) {
    order.ownId = shortid.generate()
    order.customer.ownId = shortid.generate()
    done()
  })
  it('Should successfully create an order', function (done) {
    moip.order.create(order, function (error, body, response) {
      response.statusCode.should.be.eql(201)
      // Verify and add to schema
      body.should.have.property('id')
      body.should.have.property('status')
      body.should.have.property('createdAt')
      body.should.have.property('updatedAt')
      body.should.have.property('customer')
      body.should.have.property('_links')
      order.id = body.id
      order.status = body.status
      order.createdAt = body.createdAt
      order.updatedAt = body.updatedAt
      order.customer = body.customer
      order._links = body._links
      body.should.be.jsonSchema(order)
      done()
    })
  })
  it('Should successfully get an order', function (done) {
    moip.order.getOne(order.id, function (error, body, response) {
      response.statusCode.should.be.eql(200)
      body.should.be.jsonSchema(order)
      done()
    })
  })
  it('Should fail to get an order', function (done) {
    moip.order.getOne('invalid-id', function (error, body, response) {
      response.statusCode.should.be.eql(404)
      done()
    })
  })
  it('Should successfully get all orders', function (done) {
    moip.order.getAll(function (error, body, response) {
      response.statusCode.should.be.eql(200)
      done()
    })
  })
})
