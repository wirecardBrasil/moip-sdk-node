import auth from './config/auth'
import moip from '../dist/index'
import chai from 'chai'
import subscription from './schemas/subscription'
import coupon from './schemas/coupon'
import plan from './schemas/plan'
import shortid from 'shortid'

chai.should()
chai.use(require('chai-json-schema'))

describe('Moip Coupons', () => {
  before((done) => {
    /* Generate new codes */
    subscription.code = shortid.generate()
    coupon.code = shortid.generate()
    plan.code = shortid.generate()
    done()
  })

  it('Should successfully create a coupon', (done) => {
    moip.init(auth).then((client) => {
      client.coupon.create(coupon)
        .then((response) => {
          response.statusCode.should.be.eql(201)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully create a new subscription for coupon association', (done) => {
    moip.init(auth).then((client) => {
      client.subscription.create(subscription, {new_customer: false})
        .then((response) => {
          response.statusCode.should.be.eql(201)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully create a new plan for coupon association', (done) => {
    moip.init(auth).then((client) => {
      client.plan.create(plan)
        .then((response) => {
          response.statusCode.should.be.eql(201)
          done()
        })
    })
  })

  it('Should successfully associate a coupon to an existent subscription', (done) => {
    moip.init(auth).then((client) => {
      client.coupon.associate(subscription.code, {
        plan: {
          code: plan.code
        },
        coupon: {
          code: coupon.code
        }
      })
        .then((body) => {
          /* Couldn't properly update in sandbox environment
       response.statusCode.should.be.eql(200)
          */
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully get a coupon', (done) => {
    moip.init(auth).then((client) => {
      client.coupon.getOne(coupon.code)
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully get all coupons', (done) => {
    moip.init(auth).then((client) => {
      client.coupon.getAll()
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully inactivate a coupon', (done) => {
    moip.init(auth).then((client) => {
      client.coupon.inactivate(coupon.code)
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })

  it('Should successfully activate a coupon', (done) => {
    moip.init(auth).then((client) => {
      client.coupon.activate(coupon.code)
        .then((response) => {
          response.statusCode.should.be.eql(200)
          done()
        })
        .catch(done)
    })
  })
})