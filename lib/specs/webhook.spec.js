import auth from './config/auth';
import moip from '../index';
import chai from 'chai';

chai.should();
chai.use(require('chai-json-schema'));
moip.init(auth);


describe('Moip Webhooks', () => {

    let webhook = {};

    it('Should successfully get all webhooks', (done) => {
        moip.webhook.getAll()
            .then((body) => {
                body.should.have.property('webhooks');
                webhook.resourceId = body.webhooks[0].resourceId;
                webhook.id = body.webhooks[0].id;
                done();
            })
    });

    it('Should successfully get webhooks from specific resource', (done) => {
        moip.webhook.getOne(webhook.resourceId)
            .then((body) => {
                body.should.have.property('webhooks');
                done();
            })
    });
});
