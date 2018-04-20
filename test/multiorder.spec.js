const auth = require('./config/auth')
const moip = require('../index').default(auth)
const chai = require('chai')
const multiorderModel = require('./schemas/multiorder')
const shortid = require('shortid')

chai.should()
chai.use(require('chai-json-schema'))

describe('Moip Multiorders', () => {
  before((done) => {
    multiorderModel.ownId = shortid.generate()
    multiorderModel.orders[0].ownId = shortid.generate()
    multiorderModel.orders[1].ownId = shortid.generate()
    multiorderModel.orders[0].customer.ownId = shortid.generate()
    multiorderModel.orders[1].customer.ownId = shortid.generate()
    done()
  })

  it('Should successfully create a multiorder', (done) => {
    moip.multiorder.create(multiorderModel)
      .then(({body}) => {
        // Verify and add to schema
        body.should.have.property('id')
        multiorderModel.id = body.id
        done()
      })
      .catch((err) => done(err))
  })

  it('Should successfully get a multiorder', (done) => {
    moip.multiorder.getOne(multiorderModel.id)
      .then(({body}) => {
        body.should.have.property('id')
        done()
      })
      .catch((err) => done(err))
  })

  it('Should fail to get a multiorder', (done) => {
    moip.multiorder.getOne('invalid-id')
      .catch(() => done())
  })
})
