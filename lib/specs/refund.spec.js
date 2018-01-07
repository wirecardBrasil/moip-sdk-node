import auth from './config/auth';
import moip from '../index';
import chai from 'chai';
import orderModel from './schemas/order';
import paymentModel from './schemas/payment';
import shortid from 'shortid';

chai.should();
chai.use(require('chai-json-schema'));
moip.init(auth);

describe('Moip Payment Refunds', () => {
    before((done) => {
        orderModel.ownId = shortid.generate();
        orderModel.customer.ownId = shortid.generate();
        done();
    });

    let order_id;

    it('Should successfully create an order', (done) => {
        moip.order.create(orderModel)
            .then((body) => {
                order_id = body.id;
                done();
            })
            .catch(done);
    });

    it('Should successfully create a payment for an order', (done) => {
        moip.payment.create(order_id, paymentModel)
            .then((body) => {
                // Verify and add to schema
                body.should.have.property('id');
                paymentModel.id = body.id;
                done();
            })
            .catch(done);
    });


    it('Should successfully refund the payment', (done) => {
        moip.payment.refund(paymentModel.id)
            .then((body) => {
                body.should.have.property('id');
                body.should.have.property('status');
                body.status.should.be.eql('COMPLETED');
                done()
            })
            .catch(done);
    });
});

describe('Moip Order Refunds', () => {
    before((done) => {
        orderModel.ownId = shortid.generate();
        orderModel.customer.ownId = shortid.generate();
        done();
    });

    let order_id;

    it('Should successfully create an order', (done) => {
        moip.order.create(orderModel)
            .then((body) => {
                order_id = body.id;
                done();
            })
            .catch(done);
    });

    it('Should successfully create a payment for an order', (done) => {
        moip.payment.create(order_id, paymentModel)
            .then((body) => {
                // Verify and add to schema
                body.should.have.property('id');
                paymentModel.id = body.id;
                done();
            })
            .catch(done);
    });


    it('Should successfully refund the payment', (done) => {
        moip.order.refund(order_id)
            .then((body) => {
                body.should.have.property('id');
                body.should.have.property('status');
                body.status.should.be.eql('COMPLETED');
                done()
            })
            .catch(done);
    });
});