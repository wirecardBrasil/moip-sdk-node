const auth = require('./config/auth')
const moip = require('../index').default(auth)
const chai = require('chai')
const transferModel = require('./schemas/transfer')

chai.should()
chai.use(require('chai-json-schema'))

const moipAccount = 'MPA-CULBBYHD11'
let transferID

describe('Transfer', () => {
	it('should successfully get balance', (done) => {
		moip.balance.getOne()
			.then(({ body }) => {
				body[0].should.have.property('unavailable')
				body[0].should.have.property('future')
				body[0].should.have.property('current')
				done()
			}).catch(done)
	})
})