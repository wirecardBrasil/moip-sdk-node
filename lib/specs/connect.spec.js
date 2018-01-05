import auth from './config/auth';
import moip from '../index';
import chai from 'chai';

chai.should();
chai.use(require('chai-json-schema'));
moip.init(auth);


describe('Moip Connect', function () {
    const scopes = ['TRANSFER_FUNDS', 'MANAGE_ACCOUNT_INFO', 'REFUND'];
    const clientId = 'APP-H33WKWDW97YL';
    const redirectUri = 'http://www.moip.com.br/redirect';
    const clientSecret = '41c7f270148447b1b57ab8a9afc1306d';
    it('Successfully redirect user to authorization page', (done) => {
        moip.connect.getAuthorizeUrl({
            client_id: clientId,
            redirect_uri: redirectUri,
            scopes: scopes
        }).then((url) => {
            url.should.be.a('string');
            chai.assert.include(url, scopes.toString());
            chai.assert.include(url, clientId);
            chai.assert.include(url, redirectUri);
            done()
        });
    });

    it('Return an error when missing redirect_uri', (done) => {
        moip.connect.getAuthorizeUrl({
            client_id: clientId,
            scopes: scopes
        }).then((url) => {
            error.should.equal('Please inform the config object passing your client_id, redirect_uri and the list of scopes')
            done()
        })
    });

    it('Return an error when missing client_id', (done) => {
        moip.connect.getAuthorizeUrl({
            redirect_uri: redirectUri,
            scopes: scopes
        }).then((url) => {
            error.should.equal('Please inform the config object passing your client_id, redirect_uri and the list of scopes')
            done()
        });
    });

    it('Return an error when missing scopes', (done) => {
        moip.connect.getAuthorizeUrl({
            client_id: clientId,
            redirect_uri: redirectUri
        }).then((url) => {
            error.should.equal('Please inform the config object passing your client_id, redirect_uri and the list of scopes')
            done()
        });
    });

    it('Successfully generate an access token', (done) => {
        moip.connect.generateToken({
            client_id: clientId,
            redirect_uri: redirectUri,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: '229d6a6bd7afb35e6653d7f88c1c4de5bd0f69a2'
        }).then((body) => {
            chai.assert.exists(body);
            done()
        });
    });
});
