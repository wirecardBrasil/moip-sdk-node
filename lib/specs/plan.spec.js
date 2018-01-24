import auth from './config/auth';
import moip from '../index';
import chai from 'chai';
import plan from './schemas/plan';
import shortid from 'shortid';

chai.should();
chai.use(require('chai-json-schema'));
moip.init(auth);

describe('Moip Plans', () => {
  before((done) => {
    plan.code = shortid.generate()
    done();
  });

  it('Should successfully create a plan', (done) => {
    moip.plan.create(plan)
      .then((body) => {
        response.statusCode.should.be.eql(201)
        done();
      })
      .catch(done);
  })

  it('Should successfully activate a plan', (done) => {
    moip.plan.activate(plan.code)
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully get a plan', (done) => {
    moip.plan.getOne(plan.code)
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully get all plans', (done) => {
    moip.plan.getAll()
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully update a plan', (done) => {
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
    })
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })

  it('Should successfully inactivate a plan', function (done) {
    moip.plan.inactivate()
      .then((body) => {
        response.statusCode.should.be.eql(200)
        done();
      })
      .catch(done);
  })
})
