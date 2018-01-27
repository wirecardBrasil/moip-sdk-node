'use strict';

var _auth = require('./config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _basicAuth = require('./config/basicAuth');

var _basicAuth2 = _interopRequireDefault(_basicAuth);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(require('chai-json-schema'));

describe('Moip Connect', function () {
    var scopes = ['TRANSFER_FUNDS', 'MANAGE_ACCOUNT_INFO', 'REFUND'];
    var clientId = 'APP-H33WKWDW97YL';
    var redirectUri = 'http://www.moip.com.br/redirect';
    var clientSecret = '41c7f270148447b1b57ab8a9afc1306d';

    it('Successfully redirect user to authorization page', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.connect.getAuthorizeUrl({
                client_id: clientId,
                redirect_uri: redirectUri,
                scopes: scopes
            }).then(function (url) {
                url.should.be.a('string');
                _chai2.default.assert.include(url, scopes.toString());
                _chai2.default.assert.include(url, clientId);
                _chai2.default.assert.include(url, redirectUri);
                done();
            });
        });
    });

    it('Return an error when missing redirect_uri', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.connect.getAuthorizeUrl({
                client_id: clientId,
                scopes: scopes
            }).catch(function () {
                return done();
            });
        });
    });

    it('Return an error when missing client_id', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.connect.getAuthorizeUrl({
                redirect_uri: redirectUri,
                scopes: scopes
            }).catch(function () {
                return done();
            });
        });
    });

    it('Return an error when missing scopes', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.connect.getAuthorizeUrl({
                client_id: clientId,
                redirect_uri: redirectUri
            }).catch(function () {
                return done();
            });
        });
    });

    it('Successfully generate an access token', function (done) {
        _index2.default.init(_basicAuth2.default).then(function (client) {
            client.connect.generateToken({
                client_id: clientId,
                redirect_uri: redirectUri,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                code: '229d6a6bd7afb35e6653d7f88c1c4de5bd0f69a2'
            }).then(function (body) {
                _chai2.default.assert.exists(body);
                done();
            });
        });
    });
});