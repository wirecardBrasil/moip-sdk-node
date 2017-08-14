var chai = require('chai')
chai.should()
chai.use(require('chai-json-schema'))

var moip = require('../index.js')({
  token: '01010101010101010101010101010101',
  key: 'ABABABABABABABABABABABABABABABABABABABAB'
})

var app = {
  name: 'Appz',
  description: 'Appz test',
  site: 'https://www.Appztest.com',
  redirectUri: 'https://www.Appztest.com/get'
}

/* var client = {
    code: 'f7812ad55364b769dd3c5c1483377b1bc6fee7d7',
    client_id: 'APP-N4E32QR73L3R',
    grant_type: 'authorization_code',
    redirect_uri: 'https://requestb.in/owzyaoox',
    client_secret: 'b5922b3d63a44f909bb32cd242c098c7'
};
*/

describe('Moip Connect', function () {
  it('Should successfully create an App', function (done) {
    moip.connect.createApp(app, function (error, body, response) {
      response.statusCode.should.be.eql(201)
      body.should.have.property('createdAt')
      body.should.have.property('accessToken')
      body.should.have.property('secret')
      app.createdAt = body.createdAt
      app.updateAt = body.updatedAt
      app.accessToken = body.accessToken
      app.secret = body.secret
      body.should.be.jsonSchema(app)
      done()
    })
  })
  /*  it('Should successfully generate an OAuth token', function(done) {
        moip.connect.generateToken(client, function(error, body, response) {
            response.statusCode.should.be.eql(200);
            done();
        });
    }); */
})
