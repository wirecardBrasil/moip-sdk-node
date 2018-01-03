import auth from './config/auth';
import index from '../index';

let chai = require('chai');
chai.should();
chai.use(require('chai-json-schema'));

const moip = index(auth);


describe('Account', function () {
    it('Should successfully create an account', function (done) {
        moip.account.create({
            bankNumber: "237",
            agencyNumber: "12345",
            agencyCheckNumber: "0",
            accountNumber: "12345678",
            accountCheckNumber: "7",
            type: "CHECKING",
            holder: {
                taxDocument: {
                    type: "CPF",
                    number: "622.134.533-22"
                },
                fullname: "Demo Moip"
            }
        });
    });
});
