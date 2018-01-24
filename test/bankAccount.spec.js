import auth from './config/auth';
import moip from '../dist/index';
import chai from 'chai';
import bankAccountModel from './schemas/bankAccount';

chai.should();
chai.use(require('chai-json-schema'));

const moipAccount = 'MPA-CULBBYHD11';
let bankAccountID;

describe('Bank Account', () => {

        it('Should successfully create a bank account', (done) => {
            moip.init(auth).then((client) => {
                client.bankAccount.create(moipAccount, bankAccountModel)
                    .then(({body}) => {
                        body.should.have.property('id');
                        bankAccountID = body.id;
                        done();
                    }).catch(done);
            });
        });

        it('Should successfully get one bank account', (done) => {
            moip.init(auth).then((client) => {
                client.bankAccount.getOne(bankAccountID)
                    .then(({body}) => {
                        body.should.have.property('id');
                        done();
                    }).catch(done);
            });
        });

        it('Should fail to get a bank account', (done) => {
            moip.init(auth).then((client) => {
                client.bankAccount.getOne('non-existent-id')
                    .catch(() => done());
            });
        });

        it('Should successfully get all bank accounts', (done) => {
            moip.init(auth).then((client) => {
                client.bankAccount.getAll(moipAccount)
                    .then(() => {
                        done();
                    }).catch(done);
            });
        });

        it('Should successfully delete a bank account', (done) => {
            moip.init(auth).then((client) => {
                client.bankAccount.remove(bankAccountID)
                    .then(() => {
                        done();
                    }).catch(done);
            });
        });

});
