import auth from './config/auth';
import moip from '../index';
import chai from 'chai';
import customerModel from './schemas/subscriber';
import creditCardModel from './schemas/creditCard';
import shortid from 'shortid';

chai.should();
chai.use(require('chai-json-schema'));
moip.init(auth);

describe('Moip Subscribers', () => {
  /*before(function (done) {
    subscriber.code = shortid.generate()
    done()
  })
  it('Should successfully create a subscriber', function (done) {
    moip.subscriber.create(subscriber, { new_vault: false }, function (error, body, response) {
      response.statusCode.should.be.eql(201)
      done()
    })
  })
  it('Should successfully get a subscriber', function (done) {
    moip.subscriber.getOne(subscriber.code, function (error, body, response) {
      response.statusCode.should.be.eql(200)
      done()
    })
  })*/

  /*it('Successfully get a customer', (done) => {
    moip.customer.getOne(customerModel.id)
      .then((response) => {
        response.should.be.jsonSchema(customerModel);
        done();
      });
  })*/

  it('Should successfully get all subscribers', (done) => {
    moip.subscriber.getAll()
      .then((response) => {
        console.log(response)
        //response.statusCode.should.be.eql(200)
        done()
      })
  })
  /*it('Should successfully update a subscriber', function (done) {
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
    }, function (error, body, response) {
      response.statusCode.should.be.eql(200)
      done()
    })
  })
  it('Should successfully update subscriber billing info', function (done) {
    moip.subscriber.updateBilling(subscriber.code, {
      credit_card: {
        holder_name: 'Novo nome',
        number: '5555666677778884',
        expiration_month: '04',
        expiration_year: '18'
      }
    }, function (error, body, response) {
      response.statusCode.should.be.eql(200)
      done()
    })
  })*/
})
