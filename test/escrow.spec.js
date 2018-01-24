import auth from './config/auth';
import moip from '../dist/index';
import chai from 'chai';
import orderModel from './schemas/order';
import paymentWithEscrowModel from './schemas/paymentWithEscrow';
import shortid from 'shortid';

chai.should();
chai.use(require('chai-json-schema'));

describe('Moip Escrow', () => {
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
        moip.init(auth).then((client) => {
            client.order.create(orderModel)
                .then(({body}) => {
                    order_id = body.id;
                    done();
                })
                .catch(done);
        });
    });


    it('Should create payment with escrow', (done) => {
        moip.init(auth).then((client) => {
            client.payment.create(order_id, paymentWithEscrowModel)
                .then(({body}) => {
                    body.should.have.property('id');
                    body.should.have.property('escrows');
                    chai.expect(body.escrows).to.be.an('array').that.is.not.empty;
                    escrow_id = body.escrows[0].id;
                    done();
                })
                .catch(done);
        });
    });

    it('Should release escrow', (done) => {
        moip.init(auth).then((client) => {
            client.escrow.release(escrow_id)
                .then(({body}) => {
                    body.should.have.property('id');
                    body.status.should.be.eql('RELEASED');
                    done()
                })
                .catch(done);
        });
    });
});
