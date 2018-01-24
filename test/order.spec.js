import auth from './config/auth'
import moip from '../dist/index'
import chai from 'chai'
import orderModel from './schemas/order'
import shortid from 'shortid'

chai.should()
chai.use(require('chai-json-schema'))

describe('Moip Orders', () => {
  before((done) => {
    orderModel.ownId = shortid.generate()
    orderModel.customer.ownId = shortid.generate()
    done()
  })

  it('Should successfully create an order', (done) => {
    moip.init(auth).then((client) => {
      client.order.create(orderModel)
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
  })

  it('Should successfully get an order', (done) => {
    moip.init(auth).then((client) => {
      client.order.getOne(orderModel.id)
        .then(({body}) => {
          body.should.be.jsonSchema(orderModel)
          done()
        })
        .catch((err) => done(err))
    })
  })

  it('Should fail to get an order', (done) => {
    moip.init(auth).then((client) => {
      client.order.getOne('invalid-id')
        .catch(() => done())
    })
  })

  it('Should successfully get all orders', (done) => {
    moip.init(auth).then((client) => {
      client.order.getAll()
        .then(() => {
          done()
        })
        .catch((err) => done(err))
    })
  })
})
