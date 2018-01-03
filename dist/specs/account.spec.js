'use strict';

var _auth = require('./config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(require('chai-json-schema'));
_index2.default.initAuthorization(_auth2.default);

describe('Account', function () {
    it('Should successfully create an account', function (done) {
        _index2.default.account.create({
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
        }).then(function (response) {
            console.log('success');
            // console.log(response)
        }).catch(function (err) {
            console.log('err');
        });
    });
});