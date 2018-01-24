import auth from './config/auth';
import moip from '../index';
import chai from 'chai';
import subscription from './schemas/subscription';
import subscriber from './schemas/subscriber';
import plan from './schemas/plan';
import shortid from 'shortid';

chai.should();
chai.use(require('chai-json-schema'));
moip.init(auth);

describe('Moip Subscriptions', () => {
  before((done) => {
    /* Generate new codes */
    subscription.code = shortid.generate()
    plan.code = shortid.generate()
    subscription.plan.code = plan.code
    subscription.customer.code = subscriber.code
  })

  it('Should successfully create a new plan', (done) => {
    moip.plan.create(plan)
      .then((body) => {
        response.statusCode.should.be.eql(201)
        done();
      })
      .catch(done);
  })

  it('Should successfully create a subscription', (done) => {
    moip.subscription.create(subscription, { new_customer: false })
      .then((body) => {
        response.statusCode.should.be.eql(201)
        done();
      })
      .catch(done);
  })

  it('Should successfully get a subscription', (done) => {
    moip.subscription.getOne(subscription)
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully create a new plan for subscription update', (done) => {
    plan.code = shortid.generate()
    moip.plan.create(plan)
      .then((body) => {
        response.statusCode.should.be.eql(201)
        done();
      })
      .catch(done);
  })

  it('Should successfully update a subscription', (done) => {
    var invoiceDate = new Date()
    invoiceDate.setDate(invoiceDate.getDate() + 3)

    moip.subscription.update(subscription.code, {
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
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully get all subscriptions', (done) => {
    moip.subscriptions.getAll()
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully update a subscription billing method', (done) => {
    moip.subscriptions.update(subscription.code, {
      payment_method: 'BOLETO'
    })
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully suspend a subscription', (done) => {
    moip.subscriptions.suspend(subscription.code)
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully reactivate a subscription', (done) => {
    moip.subscriptions.reactivate(subscription.code)
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully cancel a subscription', (done) => {
    moip.subscriptions.cancel(subscription.code)
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully get all invoices from a subscription', (done) => {
    moip.subscriptions.getAllInvoices(subscription.code)
      .then((body) => {
        response.statusCode.should.be.eql(200)
        /* Set an invoiceId for testing */
        subscription.invoiceId = body.invoices[0].id
        done();
      })
      .catch(done);
  })

  it('Should successfully get one invoice from a subscription', (done) => {
    moip.subscriptions.getOneInvoice(subscription.invoiceId)
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully get all payments from an invoice', (done) => {
    moip.subscriptions.getAllPayments(subscription.invoiceId)
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully create a notification preference for subscriptions', (done) => {
    moip.subscriptions.createNotification({
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
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })
})
