const auth = require('./config/auth')
const moip = require('../index').default(auth)
const {webhook: {limit, offset, event}} = require('./queries')
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

  it('Should successfully get a list of webhooks by empty query', (done) => {
    moip.webhook.query()
      .then(({body}) => {
        body.should.have.property('webhooks')
        done()
      })
      .catch((err) => done(err))
  })

  it('Should successfully get a list of webhooks by query', (done) => {
    moip.webhook.query({resourceId: webhook.resourceId, limit, offset, event})
      .then(({body}) => {
        body.should.have.property('webhooks')
        body.webhooks.length.should.be.at.most(limit)
        body.webhooks.filter(w => w.event !== 'ORDER.CREATED')
          .length.should.be.equal(0)
        done()
      })
      .catch((err) => done(err))
  })

  it('Should successfully get webhooks from specific resource', (done) => {
    moip.webhook.getOne(webhook.resourceId)
      .then(({body}) => {
        body.should.have.property('webhooks')
        done()
      })
  })
})
