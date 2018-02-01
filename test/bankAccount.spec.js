const auth = require('./config/auth')
const moip = require('../index').default(auth)
const chai = require('chai')
const bankAccountModel = require('./schemas/bankAccount')

chai.should()
chai.use(require('chai-json-schema'))

const moipAccount = 'MPA-CULBBYHD11'
let bankAccountID

describe('Bank Account', () => {
  it('Should successfully create a bank account', (done) => {
    moip.bankAccount.create(moipAccount, bankAccountModel)
      .then(({body}) => {
        body.should.have.property('id')
        bankAccountID = body.id
        done()
      }).catch(done)
  })

  it('Should successfully get one bank account', (done) => {
    moip.bankAccount.getOne(bankAccountID)
      .then(({body}) => {
        body.should.have.property('id')
        done()
      }).catch(done)
  })

  it('Should fail to get a bank account', (done) => {
    moip.bankAccount.getOne('non-existent-id')
      .catch(() => done())
  })

  it('Should successfully get all bank accounts', (done) => {
    moip.bankAccount.getAll(moipAccount)
      .then(() => {
        done()
      }).catch(done)
  })

  it('Should successfully delete a bank account', (done) => {
    moip.bankAccount.remove(bankAccountID)
      .then(() => {
        done()
      }).catch(done)
  })
})
