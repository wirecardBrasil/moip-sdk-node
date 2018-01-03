'use strict';

var auth = require('specs/config/auth.js');
var moip = require('index.js')(auth);
var plan = require('specs/schemas/plan.js');
var shortid = require('shortid');
var chai = require('chai');
chai.should();
chai.use(require('chai-json-schema'));

describe('Moip Plans', function () {
  before(function (done) {
    plan.code = shortid.generate();
    done();
  });
  it('Should successfully create a plan', function (done) {
    moip.plan.create(plan, function (error, body, response) {
      response.statusCode.should.be.eql(201);
      done();
    });
  });
  it('Should successfully activate a plan', function (done) {
    moip.plan.activate(plan.code, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully get a plan', function (done) {
    moip.plan.getOne(plan.code, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully get all plans', function (done) {
    moip.plan.getAll(function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully update a plan', function (done) {
    moip.plan.update(plan.code, {
      name: 'Plano Especial',
      description: 'Nova descrição',
      amount: 1290,
      setup_fee: 800,
      max_qty: 1,
      payment_method: 'CREDIT_CARD',
      interval: {
        length: 1,
        unit: 'MONTH'
      },
      billing_cycles: 12,
      trial: {
        days: 30,
        enabled: true,
        hold_setup_fee: true
      }
    }, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully inactivate a plan', function (done) {
    moip.plan.inactivate(plan.code, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
});