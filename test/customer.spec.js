import auth from './config/auth'
import moip from '../dist/index'
import chai from 'chai'
import customerModel from './schemas/customer'
import creditCardModel from './schemas/creditCard'
import shortid from 'shortid'

chai.should()
chai.use(require('chai-json-schema'))

let creditCardID

describe('Moip Customers', () => {
  before((done) => {
    customerModel.ownId = shortid.generate()
    done()
  })

  it('Successfully create a customer', (done) => {
    moip.init(auth).then((client) => {
      client.customer.create(customerModel)
        .then(({body}) => {
          body.should.have.property('id')
          customerModel.id = body.id
          body.should.be.jsonSchema(customerModel)
          done()
        })
        .catch((err) => done(err.statusCode))
    })
  })

  it('Successfully get a customer', (done) => {
    moip.init(auth).then((client) => {
      client.customer.getOne(customerModel.id)
        .then(({body}) => {
          body.should.be.jsonSchema(customerModel)
          done()
        })
    })
  })

  it('Fail to get a customer with non-existent id', (done) => {
    moip.init(auth).then((client) => {
      client.customer.getOne('non-existent-id')
        .catch(() => done())
    })
  })

  it('Successfully add a credit card to a customer', (done) => {
    moip.init(auth).then((client) => {
      client.customer.createCreditCard(customerModel.id, creditCardModel)
        .then(({body}) => {
          body.should.have.property('creditCard')
          creditCardID = body.creditCard.id
          done()
        })
        .catch(done)
    })
  })

  it('Successfully remove a credit card from a customer', (done) => {
    moip.init(auth).then((client) => {
      client.customer.removeCreditCard(creditCardID)
        .then(() => {
          done()
        })
        .catch(done)
    })
  })
})
