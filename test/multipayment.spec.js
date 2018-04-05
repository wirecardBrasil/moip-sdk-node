const auth = require('./config/auth')
const moip = require('../index').default(auth)
const chai = require('chai')
const multiorderModel = require('./schemas/multiorder')
const multipaymentModel = require('./schemas/payment')
const shortid = require('shortid')

chai.should()
chai.use(require('chai-json-schema'))

describe('Moip Multipayments', () => {
  before((done) => {
    multiorderModel.ownId = shortid.generate()
    multiorderModel.orders[0].ownId = shortid.generate()
    multiorderModel.orders[1].ownId = shortid.generate()
    multiorderModel.orders[0].customer.ownId = shortid.generate()
    multiorderModel.orders[1].customer.ownId = shortid.generate()
    done()
  })

  let multiorderId

  it('Should successfully create a multiorder', (done) => {
    moip.multiorder.create(multiorderModel)
      .then(({body}) => {
        body.should.have.property('id')
        multiorderId = body.id
        done()
      })
      .catch(done)
  })

  it('Should successfully create a multipayment for a multiorder', (done) => {
    moip.multipayment.create(multiorderId, multipaymentModel)
      .then(({body}) => {
        body.should.have.property('id')
        multipaymentModel.id = body.id
        done()
      })
      .catch(done)
  })

  it('Should successfully get a multipayment', (done) => {
    moip.multipayment.getOne(multipaymentModel.id)
      .then(({body}) => {
        body.should.have.property('id')
        done()
      })
      .catch(done)
  })

  it('Should fail to get a multipayment', (done) => {
    moip.multipayment.getOne('invalid-id')
      .catch(() => done())
  })
})

describe('Moip Multipayment Pre-Authorization Capture', () => {
  /*
   Create delay between requests
  */
  beforeEach((done) => {
    setTimeout(done, 4000)
  })

  before((done) => {
    multiorderModel.ownId = shortid.generate()
    multiorderModel.orders[0].ownId = shortid.generate()
    multiorderModel.orders[1].ownId = shortid.generate()
    multiorderModel.orders[0].customer.ownId = shortid.generate()
    multiorderModel.orders[1].customer.ownId = shortid.generate()
    done()
  })

  let multiorderId

  it('Should successfully create a multiorder', (done) => {
    moip.multiorder.create(multiorderModel)
      .then(({body}) => {
        body.should.have.property('id')
        multiorderId = body.id
        done()
      })
      .catch(done)
  })

  it('Should create multipayment with pre authorization', (done) => {
    multipaymentModel.delayCapture = true
    moip.multipayment.create(multiorderId, multipaymentModel)
      .then(({body}) => {
        body.should.have.property('id')
        multipaymentModel.id = body.id
        done()
      })
      .catch(done)
  })

  it('Should capture multipayment pre authorized', (done) => {
    moip.multipayment.preAuthorizationCapture(multipaymentModel.id)
      .then(({body}) => {
        body.status.should.be.eql('AUTHORIZED')
        done()
      })
      .catch(done)
  })
})

describe('Moip Multipayment Pre-Authorization Cancel', () => {
  /*
       Create delay between requests
   */
  beforeEach((done) => {
    setTimeout(done, 4000)
  })

  before((done) => {
    multiorderModel.ownId = shortid.generate()
    multiorderModel.orders[0].ownId = shortid.generate()
    multiorderModel.orders[1].ownId = shortid.generate()
    multiorderModel.orders[0].customer.ownId = shortid.generate()
    multiorderModel.orders[1].customer.ownId = shortid.generate()
    done()
  })

  let multiorderId

  it('Should successfully create a multiorder', (done) => {
    moip.multiorder.create(multiorderModel)
      .then(({body}) => {
        body.should.have.property('id')
        multiorderId = body.id
        done()
      })
      .catch(done)
  })

  it('Should create multipayment with pre authorization', (done) => {
    multipaymentModel.delayCapture = true
    moip.multipayment.create(multiorderId, multipaymentModel)
      .then(({body}) => {
        body.should.have.property('id')
        multipaymentModel.id = body.id
        done()
      })
      .catch(done)
  })

  it('Should cancel multipayment pre authorized', (done) => {
    moip.multipayment.preAuthorizationCancel(multipaymentModel.id)
      .then(({body}) => {
        body.status.should.be.eql('CANCELLED')
        done()
      })
      .catch(done)
  })
})
