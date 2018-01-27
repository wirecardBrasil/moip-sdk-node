'use strict';

var auth = require('specs/config/auth.js');
var moip = require('index.js')(auth);
var subscription = require('specs/schemas/subscription.js');
var plan = require('specs/schemas/plan.js');
var coupon = require('specs/schemas/coupon.js');
var shortid = require('shortid');
var chai = require('chai');
chai.should();
chai.use(require('chai-json-schema'));

describe('Moip Coupons', function () {
  it('Should successfully create a coupon', function (done) {
    coupon.code = shortid.generate();
    moip.coupon.create(coupon, function (error, body, response) {
      response.statusCode.should.be.eql(201);
      done();
    });
  });
  it('Should successfully create a new subscription for coupon association', function (done) {
    subscription.code = shortid.generate();
    moip.subscription.create(subscription, { new_customer: false }, function (error, body, response) {
      response.statusCode.should.be.eql(201);
      done();
    });
  });
  it('Should successfully create a new plan for coupon association', function (done) {
    plan.code = shortid.generate();
    moip.plan.create(plan, function (error, body, response) {
      response.statusCode.should.be.eql(201);
      done();
    });
  });
  it('Should successfully associate a coupon to an existent subscription', function (done) {
    moip.coupon.associate(subscription.code, {
      plan: {
        code: plan.code
      },
      coupon: {
        code: coupon.code
      }
    }, function (error, body, response) {
      /* Couldn't properly update in sandbox environment
      response.statusCode.should.be.eql(200)
      */
      done();
    });
  });
  it('Should successfully get a coupon', function (done) {
    moip.coupon.getOne(coupon.code, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully get all coupons', function (done) {
    moip.coupon.getAll(function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully inactivate a coupon', function (done) {
    moip.coupon.inactivate(coupon.code, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
  it('Should successfully activate a coupon', function (done) {
    moip.coupon.activate(coupon.code, function (error, body, response) {
      response.statusCode.should.be.eql(200);
      done();
    });
  });
});