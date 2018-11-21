const auth = require('./config/auth')
const moip = require('../index').default(auth)
const chai = require('chai')
const transferModel = require('./schemas/transfer')

chai.should()
chai.use(require('chai-json-schema'))

const moipAccount = 'MPA-CULBBYHD11'
let transferID

describe('Transfer', () => {
	it('Should successfully transfer', (done) => {
		moip.transfer.create(transferModel)
			.then(({ body }) => {
				body.should.have.property('id')
				transferID = body.id
				done()
			}).catch(done)
	})

	it('Should successfully get one transfer', (done) => {
		moip.transfer.getOne(transferID)
			.then(({ body }) => {
				body.should.have.property('id')
				done()
			}).catch(done)
	})

	it('Should fail to get a transfer', (done) => {
		moip.transfer.getOne('non-existent-id')
			.catch(() => done())
	})

	it('Should successfully get all tranfers', (done) => {
		moip.transfer.getAll(moipAccount)
			.then(() => {
				done()
			}).catch(done)
	})

	it('Should successfully reverse a transfer', (done) => {
		moip.transfer.reverse(transferID)
			.then(() => {
				done()
			}).catch(done)
	})
})
