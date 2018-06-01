const auth = require('./config/auth')
const moip = require('../index').default(auth)
const chai = require('chai')
const subscriber = require('./schemas/subscriber')
const shortid = require('shortid')

chai.should()
chai.use(require('chai-json-schema'))

describe('Moip Subscribers', () => {
  before((done) => {
    subscriber.code = shortid.generate()
    done()
  })

  it('Should successfully create a subscriber', (done) => {
    moip.subscriber.create(subscriber, {new_vault: false})
      .then((response) => {
        response.statusCode.should.be.eql(201)
        done()
      })
      .catch(done)
  })

  it('Should successfully get a subscriber', (done) => {
    moip.subscriber.getOne(subscriber.code)
      .then((response) => {
        response.statusCode.should.be.eql(200)
        done()
      })
      .catch(done)
  })

  it('Should successfully get all subscribers', (done) => {
    moip.subscriber.getAll()
      .then((response) => {
        response.statusCode.should.be.eql(200)
        done()
      })
      .catch(done)
  })

  it('Should successfully update a subscriber', (done) => {
    moip.subscriber.update(subscriber.code, {
      code: subscriber.code,
      email: 'novoemail@exemplo.com.br',
      fullname: 'Nome Sobrenome',
      cpf: '22222222222',
      phone_number: '934343434',
      phone_area_code: '11',
      birthdate_day: '26',
      birthdate_month: '04',
      birthdate_year: '1986',
      address: {
        street: 'Rua nova rua',
        number: '100',
        complement: 'Casa',
        district: 'Bairro',
        city: 'São Paulo',
        state: 'SP',
        country: 'BRA',
        zipcode: '00000-000'
      }
    })
      .then((response) => {
        response.statusCode.should.be.eql(200)
        done()
      })
      .catch(done)
  })

  it('Should successfully update subscriber billing info', (done) => {
    moip.subscriber.updateBilling(subscriber.code, {
      credit_card: {
        holder_name: 'Novo nome',
        number: '5555666677778884',
        expiration_month: '04',
        expiration_year: '25'
      }
    })
      .then((response) => {
        response.statusCode.should.be.eql(200)
        done()
      })
      .catch(done)
  })
})
