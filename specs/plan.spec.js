var auth = require('specs/config/auth.js')
var moip = require('index.js')(auth)
var plan = require('specs/schemas/plan.js')
var shortid = require('shortid')
var chai = require('chai')
chai.should()
chai.use(require('chai-json-schema'))

describe('Moip Plans', function () {
  before(function (done) {
    plan.code = shortid.generate()
    done()
  })
  it('Should successfully create a plan', function (done) {
    moip.plan.create(plan, function (error, body, response) {
      response.statusCode.should.be.eql(201)
      done()
    })
  })
  it('Should successfully activate a plan', function (done) {
    moip.plan.activate(plan.code, function (error, body, response) {
      response.statusCode.should.be.eql(200)
      done()
    })
  })
  it('Should successfully get a plan', function (done) {
    moip.plan.getOne(plan.code, function (error, body, response) {
      response.statusCode.should.be.eql(200)
      done()
    })
  })
  it('Should successfully get all plans', function (done) {
    moip.plan.getAll(function (error, body, response) {
      response.statusCode.should.be.eql(200)
      done()
    })
  })
  it('Should successfully update a plan', function (done) {
    moip.plan.update(plan, function (error, body, response) {
      response.statusCode.should.be.eql(200)
      done()
    })
  })
  it('Should successfully inactivate a plan', function (done) {
    moip.plan.inactivate(plan.code, function (error, body, response) {
      response.statusCode.should.be.eql(200)
      done()
    })
  })
})
