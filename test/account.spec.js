const auth = require('./config/auth')
const moip = require('../index').default(auth)
const chai = require('chai')
const generateCPF = require('gerar-cpf')
const accountModel = require('./schemas/account')

chai.should()
chai.use(require('chai-json-schema'))

describe('Account', () => {
  before((done) => {
    accountModel.person.taxDocument.number = generateCPF()
    done()
  })

  it('Should successfully create an account', (done) => {
    moip.account.create(accountModel)
      .then((response) => {
        response.statusCode.should.be.eql(201)
        done()
      }).catch((err) => done(err.statusCode))
  })

  it('Should successfully verify that an account exists', (done) => {
    moip.account.exists({email: 'integracao@labs.moip.com.br'})
      .then((response) => {
        response.statusCode.should.be.eql(200)
        done()
      }).catch((err) => done(err.statusCode))
  })

  it('Should successfully verify that an account does not exists', (done) => {
    moip.account.exists({email: `integracao${Date.now()}@labs.moip.com.br`})
      .then(() => {
        done('API response did not error, should have returned 404')
      }).catch((response) => {
        response.statusCode.should.be.eql(404)
        done()
      })
  })
})
