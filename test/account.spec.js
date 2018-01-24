import auth from './config/auth';
import moip from '../dist/index';
import chai from 'chai';
import generateCPF from 'gerar-cpf';
import accountModel from './schemas/account';

chai.should();
chai.use(require('chai-json-schema'));

describe('Account', () => {
    before((done) => {
        accountModel.person.taxDocument.number = generateCPF();
        done()
    });

    it('Should successfully create an account', (done) => {
        moip.init(auth).then((client) => {
            client.account.create(accountModel)
            .then((response) => {
                response.statusCode.should.be.eql(201);
                done();
            }).catch((err) => done(err.statusCode));
        });
    });
});
