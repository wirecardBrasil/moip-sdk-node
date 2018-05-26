const auth = require('./config/auth')
const moip = require('../index').default(auth)
const chai = require('chai')
const customerModel = require('./schemas/customer')
const creditCardModel = require('./schemas/creditCard')
const {customer: {limit, offset, filters}} = require('./queries')
const shortid = require('shortid')

chai.should()
chai.use(require('chai-json-schema'))

let creditCardID

describe('Moip Customers', () => {
  before((done) => {
    customerModel.ownId = shortid.generate()
    done()
  })

  it('Successfully create a customer', (done) => {
    moip.customer.create(customerModel)
      .then(({body}) => {
        body.should.have.property('id')
        customerModel.id = body.id
        body.should.be.jsonSchema(customerModel)
        done()
      })
      .catch((err) => done(err.statusCode))
  })

  it('Successfully get a customer', (done) => {
    moip.customer.getOne(customerModel.id)
      .then(({body}) => {
        body.should.be.jsonSchema(customerModel)
        done()
      })
  })

  it('Fail to get a customer with non-existent id', (done) => {
    moip.customer.getOne('non-existent-id')
      .catch(() => done())
  })

  it('Successfully add a credit card to a customer', (done) => {
    moip.customer.createCreditCard(customerModel.id, creditCardModel)
      .then(({body}) => {
        body.should.have.property('creditCard')
        creditCardID = body.creditCard.id
        done()
      })
      .catch(done)
  })

  it('Should successfully get a list of customers by empty query', (done) => {
    moip.customer.query()
      .then(({body}) => {
        body.should.have.property('customers')
        done()
      })
      .catch((err) => done(err))
  })

  it('Should successfully get a list of customers by query', (done) => {
    moip.customer.query({limit, offset, filters})
      .then(({body}) => {
        body.should.have.property('customers')
        body.customers.length.should.be.equal(limit)
        done()
      })
      .catch((err) => done(err))
  })

  it('Successfully remove a credit card from a customer', (done) => {
    moip.customer.removeCreditCard(creditCardID)
      .then(() => {
        done()
      })
      .catch(done)
  })
})
