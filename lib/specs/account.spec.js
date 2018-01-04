import auth from './config/auth';
import moip from '../index';
import chai from 'chai';
import generateCPF from 'gerar-cpf';
import accountModel from './schemas/account';

chai.should();
chai.use(require('chai-json-schema'));
moip.init(auth);

describe('Account', () => {
    before((done) => {
        accountModel.person.taxDocument.number = generateCPF();
        done()
    });

    it('Should successfully create an account', (done) => {
        moip.account.create(accountModel)
        .then(() => {
            done();
        }).catch((err) => done(err.statusCode));
    });
});
