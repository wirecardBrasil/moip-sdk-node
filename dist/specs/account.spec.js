'use strict';

var _auth = require('./config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _gerarCpf = require('gerar-cpf');

var _gerarCpf2 = _interopRequireDefault(_gerarCpf);

var _account = require('./schemas/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(require('chai-json-schema'));

describe('Account', function () {
    before(function (done) {
        _account2.default.person.taxDocument.number = (0, _gerarCpf2.default)();
        done();
    });

    it('Should successfully create an account', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.account.create(_account2.default).then(function () {
                done();
            }).catch(function (err) {
                return done(err.statusCode);
            });
        });
    });
});