import auth from './config/auth';
import moip from '../index';
import chai from 'chai';
import customerModel from './schemas/customer';
import creditCardModel from './schemas/creditCard';
import shortid from 'shortid';

chai.should();
chai.use(require('chai-json-schema'));
moip.init(auth);

let creditCardID;

describe('Moip Customers', () => {
    before((done) => {
        customerModel.ownId = shortid.generate();
        done()
    });

    it('Successfully create a customer', (done) => {
        moip.customer.create(customerModel)
            .then((response, b) => {

                // Check and add Id do schema
                response.should.have.property('id');
                customerModel.id = response.id;
                response.should.be.jsonSchema(customerModel);
                done()
            })
            .catch((err) => done(err.statusCode));
    });

    it('Successfully get a customer', (done) => {
        moip.customer.getOne(customerModel.id)
            .then((response) => {
                response.should.be.jsonSchema(customerModel);
                done();
            });
    });

    it('Fail to get a customer with non-existent id', (done) => {
        moip.customer.getOne('non-existent-id')
            .catch(() => done());
    });

    it('Successfully add a credit card to a customer', (done) => {
        moip.customer.createCreditCard(customerModel.id, creditCardModel)
            .then((response) => {
                response.should.have.property('creditCard');
                creditCardID = response.creditCard.id;
                done();
            })
            .catch(done);
    });

    it('Successfully remove a credit card from a customer', (done) => {
        moip.customer.removeCreditCard(creditCardID)
            .then(() => {
                done();
            })
            .catch(done);
    });
});
