const auth = require('./config/auth')
const moip = require('../index').default(auth)
const {limit, offset, filters} = require('./schemas/queries/index')
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
    moip.webhook.getByQuery()
      .then(({body}) => {
        body.should.have.property('webhooks')
        done()
      })
      .catch((err) => done(err))
  })

  it('Should successfully get a list of webhooks by query', (done) => {
    moip.webhook.getByQuery({limit, offset, filters})
      .then(({body}) => {
        body.should.have.property('webhooks')
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
