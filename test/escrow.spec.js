const auth = require('./config/auth')
const moip = require('../index').default(auth)
const chai = require('chai')
const orderModel = require('./schemas/order')
const paymentWithEscrowModel = require('./schemas/paymentWithEscrow')
const shortid = require('shortid')

chai.should()
chai.use(require('chai-json-schema'))

describe('Moip Escrow', () => {
  /*
       Create delay between requests
   */
  beforeEach((done) => {
    setTimeout(done, 500)
  })

  before((done) => {
    orderModel.ownId = shortid.generate()
    orderModel.customer.ownId = shortid.generate()
    done()
  })

  let orderId
  let escrowId

  it('Should successfully create an order', (done) => {
    moip.order.create(orderModel)
      .then(({body}) => {
        orderId = body.id
        done()
      })
      .catch(done)
  })

  it('Should create payment with escrow', (done) => {
    moip.payment.create(orderId, paymentWithEscrowModel)
      .then(({body}) => {
        body.should.have.property('id')
        body.should.have.property('escrows')
        chai.expect(body.escrows).to.be.an('array').that.is.not.empty
        escrowId = body.escrows[0].id
        done()
      })
      .catch(done)
  })

  it('Should release escrow', (done) => {
    moip.escrow.release(escrowId)
      .then(({body}) => {
        body.should.have.property('id')
        body.status.should.be.eql('RELEASED')
        done()
      })
      .catch(done)
  })
})
