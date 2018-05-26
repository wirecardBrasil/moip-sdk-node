const auth = require('./config/auth')
const moip = require('../index').default(auth)
const chai = require('chai')
const orderModel = require('./schemas/order')
const {order: {limit, offset, filters}} = require('./queries')
const shortid = require('shortid')

chai.should()
chai.use(require('chai-json-schema'))

describe('Moip Orders', () => {
  before((done) => {
    orderModel.ownId = shortid.generate()
    orderModel.customer.ownId = shortid.generate()
    done()
  })

  it('Should successfully create an order', (done) => {
    moip.order.create(orderModel)
      .then(({body}) => {
        // Verify and add to schema
        body.should.have.property('id')
        body.should.have.property('status')
        body.should.have.property('createdAt')
        body.should.have.property('updatedAt')
        body.should.have.property('customer')
        body.should.have.property('_links')
        orderModel.id = body.id
        orderModel.status = body.status
        orderModel.createdAt = body.createdAt
        orderModel.updatedAt = body.updatedAt
        orderModel.customer = body.customer
        orderModel._links = body._links
        body.should.be.jsonSchema(orderModel)
        done()
      })
      .catch((err) => done(err))
  })

  it('Should successfully get an order', (done) => {
    moip.order.getOne(orderModel.id)
      .then(({body}) => {
        body.should.be.jsonSchema(orderModel)
        done()
      })
      .catch((err) => done(err))
  })

  it('Should fail to get an order', (done) => {
    moip.order.getOne('invalid-id')
      .catch(() => done())
  })

  it('Should successfully get a list of orders by empty query', (done) => {
    moip.order.query()
      .then(({body}) => {
        body.should.have.property('orders')
        done()
      })
      .catch((err) => done(err))
  })

  it('Should successfully get a list of orders by query', (done) => {
    moip.order.query({limit, offset, filters})
      .then(({body}) => {
        body.should.have.property('orders')
        body.orders.length.should.be.equal(limit)
        body.orders.filter(o => o.status !== 'PAID' && o.status !== 'WAITING')
          .length.should.be.equal(0)
        done()
      })
      .catch((err) => done(err))
  })

  it('Should successfully get all orders', (done) => {
    moip.order.getAll()
      .then(() => {
        done()
      })
      .catch((err) => done(err))
  })
})
