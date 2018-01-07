import auth from './config/auth';
import moip from '../index';
import chai from 'chai';
import orderModel from './schemas/order';
import paymentWithEscrowModel from './schemas/paymentWithEscrow';
import shortid from 'shortid';

chai.should();
chai.use(require('chai-json-schema'));
moip.init(auth);

describe('Moip Payment With Escrow', () => {
    /*
         Create delay between requests
     */
    beforeEach((done) => {
        setTimeout(done, 500);
    });

    before((done) => {
        orderModel.ownId = shortid.generate();
        orderModel.customer.ownId = shortid.generate();
        done();
    });

    let order_id;
    let escrow_id;

    it('Should successfully create an order', (done) => {
        moip.order.create(orderModel)
            .then((body) => {
                order_id = body.id;
                done();
            })
            .catch(done);
    });


    it('Should create payment with escrow', (done) => {
        moip.payment.create(order_id, paymentWithEscrowModel)
            .then((body) => {
                body.should.have.property('id');
                body.should.have.property('escrows');
                chai.expect(body.escrows).to.be.an('array').that.is.not.empty;
                escrow_id = body.escrows[0].id;
                done();
            })
            .catch(done);
    });

    it('Should release escrow', (done) => {
        moip.escrow.release(escrow_id)
            .then((body) => {
                body.should.have.property('id');
                body.status.should.be.eql('RELEASED');
                done()
            })
            .catch(done);
    });
});
