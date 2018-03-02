'use strict';

var _auth = require('./config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _bankAccount = require('./schemas/bankAccount');

var _bankAccount2 = _interopRequireDefault(_bankAccount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(require('chai-json-schema'));

var moipAccount = 'MPA-CULBBYHD11';
var bankAccountID = void 0;

describe('Bank Account', function () {

    it('Should successfully create a bank account', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.bankAccount.create(moipAccount, _bankAccount2.default).then(function (body) {
                body.should.have.property('id');
                bankAccountID = body.id;
                done();
            }).catch(done);
        });
    });

    it('Should successfully get one bank account', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.bankAccount.getOne(bankAccountID).then(function (body) {
                body.should.have.property('id');
                done();
            }).catch(done);
        });
    });

    it('Should fail to get a bank account', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.bankAccount.getOne('non-existent-id').catch(function () {
                return done();
            });
        });
    });

    it('Should successfully get all bank accounts', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.bankAccount.getAll(moipAccount).then(function () {
                done();
            }).catch(done);
        });
    });

    it('Should successfully delete a bank account', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.bankAccount.remove(bankAccountID).then(function () {
                done();
            }).catch(done);
        });
    });
});