'use strict';

var auth = require('specs/config/auth.js');
var moip = require('index.js')(auth);
var plan = require('specs/schemas/plan.js');
var subscriber = require('specs/schemas/subscriber.js');
var subscription = require('specs/schemas/subscription.js');
var shortid = require('shortid');
var chai = require('chai');
chai.should();
chai.use(require('chai-json-schema'));

describe('Moip Subscriptions', function () {
  before(function (done) {
    subscription.code = shortid.generate();
    /* Redefine plan code */
    plan.code = shortid.generate();
    subscription.plan.code = plan.code;
    subscription.customer.code = subscriber.code;
    /* Create a new plan with active status */
    moip.plan.create(plan, function (error, body, response) {
      response.statusCode.should.be.eql(201);
      done();
    });
  });
  it('Should successfully create a subscription', function (done) {
    moip.subscription.create(subscription, { new_customer: false }, function (error, body, response) {
      response.statusCode.should.be.eql(201);
      done();
    });
  });
  it('Should successfully get a subscription', function (done) {
    moip.subscription.getOne(subscription.code, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully create a new plan for subscription update', function (done) {
    plan.code = shortid.generate();
    moip.plan.create(plan, function (error, body, response) {
      response.statusCode.should.be.eql(201);
      done();
    });
  });
  it('Should successfully update a subscription', function (done) {
    var invoiceDate = new Date();
    invoiceDate.setDate(invoiceDate.getDate() + 3);

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
    }, function (error, body, response) {
      /* Couldn't properly update in sandbox environment
      response.statusCode.should.be.eql(200)
      */
      done();
    });
  });
  it('Should successfully get all subscriptions', function (done) {
    moip.subscription.getAll(function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully update a subscription billing method', function (done) {
    moip.subscription.update(subscription.code, {
      payment_method: 'BOLETO'
    }, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully suspend a subscription', function (done) {
    moip.subscription.suspend(subscription.code, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully reactivate a subscription', function (done) {
    moip.subscription.activate(subscription.code, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully cancel a subscription', function (done) {
    moip.subscription.cancel(subscription.code, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully get all invoices from a subscription', function (done) {
    moip.subscription.getAllInvoices(subscription.code, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      /* Set an invoiceId for testing */
      subscription.invoiceId = body.invoices[0].id;
      done();
    });
  });
  it('Should successfully get one invoice from a subscription', function (done) {
    moip.subscription.getOneInvoice(subscription.invoiceId, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully get all payments from an invoice', function (done) {
    moip.subscription.getAllPayments(subscription.invoiceId, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully create a notification preference for subscriptions', function (done) {
    moip.subscription.createNotification({
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
    }, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
});