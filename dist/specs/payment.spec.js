'use strict';

var auth = require('specs/config/auth.js');
var moip = require('index.js')(auth);
var order = require('specs/schemas/order.js');
var payment = require('specs/schemas/payment.js');
var chai = require('chai');
chai.should();
chai.use(require('chai-json-schema'));

describe('Moip Payments', function () {
  it('Should successfully create a payment for an order', function (done) {
    moip.payment.create(order.id, payment, function (error, body, response) {
      response.statusCode.should.be.eql(201);
      // Verify and add to schema
      body.should.have.property('id');
      body.should.have.property('status');
      body.should.have.property('delayCapture');
      body.should.have.property('amount');
      body.should.have.property('events');
      body.should.have.property('receivers');
      body.should.have.property('_links');
      body.should.have.property('createdAt');
      body.should.have.property('updatedAt');
      payment.id = body.id;
      payment.status = body.status;
      payment.delayCapture = body.delayCapture;
      payment.amount = body.amount;
      payment.events = body.events;
      payment.receivers = body.receivers;
      payment._links = body._links;
      payment.createdAt = body.createdAt;
      payment.updatedAt = body.updatedAt;
      body.should.be.jsonSchema(payment);
      done();
    });
  });
  it('Should successfully get a payment', function (done) {
    moip.payment.getOne(payment.id, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      body.should.be.jsonSchema(payment);
      done();
    });
  });
  it('Should fail to get a payment', function (done) {
    moip.payment.getOne('invalid-id', function (error, body, response) {
      response.statusCode.should.be.eql(404);
      done();
    });
  });
});

describe('Moip Payment Authorization', function () {
  /*
      Create delay between requests
  */
  beforeEach(function (done) {
    setTimeout(function () {
      done();
    }, 2000);
  });
  it('Should authorize payment in sandbox', function (done) {
    moip.payment.authorize(payment.id, payment.amount.total, function (error, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should get an authorized payment in sandbox', function (done) {
    moip.payment.getOne(payment.id, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      body.status.should.be.eql('AUTHORIZED');
      done();
    });
  });
});