const auth = require('./config/auth')
const moip = require('../index').default(auth)
const chai = require('chai')

chai.should()
chai.use(require('chai-json-schema'))

describe('Moip Webhooks', () => {
  let webhook = {}

  it('Should successfully get all webhooks', (done) => {
    moip.webhook.getAll()
      .then(({body}) => {
        body.should.have.property('webhooks')
        webhook.resourceId = body.webhooks[0].resourceId
        webhook.id = body.webhooks[0].id
        done()
      })
  })

  it('Should successfully get webhooks from specific resource', (done) => {
    moip.webhook.getOne(webhook.resourceId)
      .then(({body}) => {
        body.should.have.property('webhooks')
        done()
      })
  })
})
