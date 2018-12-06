const auth = require('./config/auth')
const moip = require('../index').default(auth)
const chai = require('chai')

chai.should()
chai.use(require('chai-json-schema'))

describe('Balance', () => {
  it('should successfully get balance', (done) => {
    moip.balance.getOne()
      .then(({ body }) => {
        body[0].should.have.property('unavailable')
        body[0].should.have.property('future')
        body[0].should.have.property('current')
        done()
      }).catch(done)
  })
})
