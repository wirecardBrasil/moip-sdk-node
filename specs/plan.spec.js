var chai = require('chai')
var should = chai.should()
chai.use(require('chai-json-schema'))
var shortid = require('shortid')

var moip = require('../index.js')({
  token: '01010101010101010101010101010101',
  key: 'ABABABABABABABABABABABABABABABABABABABAB'
})

var plan = {
  name: 'Plano Especial',
  description: 'Descrição do Plano Especial',
  amount: 990,
  setup_fee: 500,
  max_qty: 1,
  status: 'ACTIVE',
  payment_method: 'CREDIT_CARD',
  interval: {
    length: 1,
    unit: 'MONTH'
  },
  billing_cycles: 12,
  trial: {
    days: 30,
    enabled: true
  }
}

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
