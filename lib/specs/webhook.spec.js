var auth = require('specs/config/auth.js')
var moip = require('index.js')(auth)
var chai = require('chai')
chai.should()
chai.use(require('chai-json-schema'))

var webhook = {}

describe('Moip Webhooks', function () {
  it('Should successfully get all webhooks', function (done) {
    moip.webhook.getAll(function (error, body, response) {
      response.statusCode.should.be.eql(200)
      body.should.have.property('webhooks')
      webhook.resourceId = body.webhooks[0].resourceId
      webhook.id = body.webhooks[0].id
      done()
    })
  })
  it('Should successfully get webhooks from specific resource', function (done) {
    moip.webhook.getOne(webhook.resourceId, function (error, body, response) {
      response.statusCode.should.be.eql(200)
      body.should.have.property('webhooks')
      done()
    })
  })
  it('Should resend webhooks for specific resource and event', function (done) {
    moip.notification.create({
      resourceId: webhook.resourceId,
      events: [
        'ORDER.CREATED'
      ],
      media: 'WEBHOOK',
      target: 'EMAIL'
    }, function (error, body, response) {
      response.statusCode.should.be.eql(201)
      body.should.have.property('id')
      body.should.have.property('events')
      body.events[0].should.be.eql('ORDER.CREATED')
      body.should.have.property('target')
      body.should.have.property('media')
      body.should.have.property('token')
      done()
    })
  })
})
