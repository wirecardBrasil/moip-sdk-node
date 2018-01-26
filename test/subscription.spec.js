import auth from './config/auth'
import moip from '../dist/index'
import chai from 'chai'
import subscription from './schemas/subscription'
import subscriber from './schemas/subscriber'
import plan from './schemas/plan'
import shortid from 'shortid'

chai.should()
chai.use(require('chai-json-schema'))
moip.init(auth)

describe('Moip Subscriptions', () => {
  before((done) => {
    /* Generate new codes */
    subscription.code = shortid.generate()
    plan.code = shortid.generate()
    subscription.plan.code = plan.code
    subscription.customer.code = subscriber.code
    done()
  })

  it('Should successfully create a new plan', (done) => {
    moip.init(auth).then((client) => {
      client.plan.create(plan)
        .then((response) => {
          response.statusCode.should.be.eql(201)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully create a subscription', (done) => {
    moip.init(auth).then((client) => {
      client.subscription.create(subscription, {new_customer: false})
        .then((response) => {
          response.statusCode.should.be.eql(201)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully get a subscription', (done) => {
    moip.init(auth).then((client) => {
      client.subscription.getOne(subscription.code)
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully create a new plan for subscription update', (done) => {
    plan.code = shortid.generate()
    moip.init(auth).then((client) => {
      client.plan.create(plan)
        .then((response) => {
          response.statusCode.should.be.eql(201)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully update a subscription', (done) => {
    const invoiceDate = new Date()
    invoiceDate.setDate(invoiceDate.getDate() + 3)
    moip.init(auth).then((client) => {
      client.subscription.update(subscription.code, {
        plan: {
          code: plan.code
        },
        amount: '9990',
        next_invoice_date: {
          day: invoiceDate.getDate(),
          month: invoiceDate.getMonth() + 1,
          year: invoiceDate.getFullYear()
        }
      })
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully get all subscriptions', (done) => {
    moip.init(auth).then((client) => {
      client.subscription.getAll()
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully update a subscription billing method', (done) => {
    moip.init(auth).then((client) => {
      client.subscription.update(subscription.code, {
        payment_method: 'BOLETO'
      })
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully suspend a subscription', (done) => {
    moip.init(auth).then((client) => {
      client.subscription.suspend(subscription.code)
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully reactivate a subscription', (done) => {
    moip.init(auth).then((client) => {
      client.subscription.activate(subscription.code)
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully cancel a subscription', (done) => {
    moip.init(auth).then((client) => {
      client.subscription.cancel(subscription.code)
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully get all invoices from a subscription', (done) => {
    moip.init(auth).then((client) => {
      client.subscription.getAllInvoices(subscription.code)
        .then((response) => {
          response.statusCode.should.be.eql(200)
          /* Set an invoiceId for testing */
          subscription.invoiceId = response.body.invoices[0].id
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully get one invoice from a subscription', (done) => {
    moip.init(auth).then((client) => {
      client.subscription.getOneInvoice(subscription.invoiceId)
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully get all payments from an invoice', (done) => {
    moip.init(auth).then((client) => {
      client.subscription.getAllPayments(subscription.invoiceId)
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully create a notification preference for subscriptions', (done) => {
    moip.init(auth).then((client) => {
      client.subscription.createNotification({
        notification: {
          webhook: {
            url: 'http://exemploldeurl.com.br/assinaturas'
          },
          email: {
            merchant: {
              enabled: true
            },
            customer: {
              enabled: true
            }
          }
        }
      })
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })
})
