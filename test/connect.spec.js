import auth from './config/auth'
import moip from '../dist/index'
import chai from 'chai'

chai.should()
chai.use(require('chai-json-schema'))

describe('Moip Connect', function () {
  const scopes = ['TRANSFER_FUNDS', 'MANAGE_ACCOUNT_INFO', 'REFUND']
  const clientId = 'APP-H33WKWDW97YL'
  const redirectUri = 'http://www.moip.com.br/redirect'

  it('Successfully redirect user to authorization page', (done) => {
    moip.init(auth).then((client) => {
      client.connect.getAuthorizeUrl({
        clientId: clientId,
        redirectUri: redirectUri,
        scopes: scopes
      }).then((url) => {
        url.should.be.a('string')
        chai.assert.include(url, scopes.toString())
        chai.assert.include(url, clientId)
        chai.assert.include(url, redirectUri)
        done()
      }).catch(done)
    })
  })

  it('Return an error when missing redirect_uri', (done) => {
    moip.init(auth).then((client) => {
      client.connect.getAuthorizeUrl({
        client_id: clientId,
        scopes: scopes
      }).catch(() => done())
    })
  })

  it('Return an error when missing client_id', (done) => {
    moip.init(auth).then((client) => {
      client.connect.getAuthorizeUrl({
        redirect_uri: redirectUri,
        scopes: scopes
      }).catch(() => done())
    })
  })

  it('Return an error when missing scopes', (done) => {
    moip.init(auth).then((client) => {
      client.connect.getAuthorizeUrl({
        client_id: clientId,
        redirect_uri: redirectUri
      }).catch(() => done())
    })
  })

  /*
      This test needs to be properly written as the code is only valid for one request.
   */
  // it('Successfully generate an access token', (done) => {
  //   moip.init(basicAuth).then((client) => {
  //     client.connect.generateToken({
  //       client_id: clientId,
  //       redirect_uri: redirectUri,
  //       client_secret: clientSecret,
  //       grant_type: 'authorization_code',
  //       code: '229d6a6bd7afb35e6653d7f88c1c4de5bd0f69a2'
  //     }).then((body) => {
  //       chai.assert.exists(body)
  //       done()
  //     })
  //   })
  // })
})
