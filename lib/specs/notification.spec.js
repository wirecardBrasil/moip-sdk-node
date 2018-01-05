import auth from './config/auth';
import moip from '../index';
import chai from 'chai';
import notificationModel from './schemas/notification';

chai.should();
chai.use(require('chai-json-schema'));
moip.init(auth);

describe('Moip Notifications', () => {
    it('Should successfully create a notification preference', (done) => {
        moip.notification.create(notificationModel)
            .then((body) => {
                body.should.have.property('id');
                notificationModel.id = body.id;
                body.should.be.jsonSchema(notificationModel);
                done()
            })
    });

    it('Should successfully get an notification', (done) => {
        moip.notification.getOne(notificationModel.id)
            .then((body) => {
                body.should.be.jsonSchema(notificationModel);
                done()
            })
    });

    it('Should fail to get a notification', (done) => {
        moip.notification.getOne('invalid-id')
            .catch(() => done());
    });

    it('Should successfully get all notifications', (done) => {
        moip.notification.getAll()
            .then(() => {
                done()
            })
            .catch(done);
    });

    it('Should successfully delete a notification', (done) => {
        moip.notification.remove(notificationModel.id)
            .then(() => {
                done()
            })
            .catch(done);
    });
});
