'use strict';

var auth = require('specs/config/auth.js');
var moip = require('index.js')(auth);
var chai = require('chai');
chai.should();
chai.use(require('chai-json-schema'));

describe('Moip Connect', function () {
  var scopes = ['TRANSFER_FUNDS', 'MANAGE_ACCOUNT_INFO', 'REFUND'];
  var clientId = 'APP-H33WKWDW97YL';
  var redirectUri = 'http://www.moip.com.br/redirect';
  var clientSecret = '41c7f270148447b1b57ab8a9afc1306d';
  it('Successfully redirect user to authorization page', function (done) {
    moip.connect.getAuthorizeUrl({
      client_id: clientId,
      redirect_uri: redirectUri,
      scopes: scopes
    }, function (error, url) {
      url.should.be.a('string');
      chai.assert.include(url, scopes.toString());
      chai.assert.include(url, clientId);
      chai.assert.include(url, redirectUri);
      done();
    });
  });
  it('Return an error when missing redirect_uri', function (done) {
    moip.connect.getAuthorizeUrl({
      client_id: clientId,
      scopes: scopes
    }, function (error, url) {
      error.should.equal('Please inform the config object passing your client_id, redirect_uri and the list of scopes');
      done();
    });
  });
  it('Return an error when missing client_id', function (done) {
    moip.connect.getAuthorizeUrl({
      redirect_uri: redirectUri,
      scopes: scopes
    }, function (error, url) {
      error.should.equal('Please inform the config object passing your client_id, redirect_uri and the list of scopes');
      done();
    });
  });
  it('Return an error when missing scopes', function (done) {
    moip.connect.getAuthorizeUrl({
      client_id: clientId,
      redirect_uri: redirectUri
    }, function (error, url) {
      error.should.equal('Please inform the config object passing your client_id, redirect_uri and the list of scopes');
      done();
    });
  });
  it('Successfully generate an access token', function (done) {
    moip.connect.generateToken({
      client_id: clientId,
      redirect_uri: redirectUri,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: '229d6a6bd7afb35e6653d7f88c1c4de5bd0f69a2'
    }, function (error, body, response) {
      chai.assert.exists(body);
      done();
    });
  });
});