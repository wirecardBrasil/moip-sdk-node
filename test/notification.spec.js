import auth from './config/auth';
import moip from '../dist/index';
import chai from 'chai';
import notificationModel from './schemas/notification';

chai.should();
chai.use(require('chai-json-schema'));

describe('Moip Notifications', () => {
    it('Should successfully create a notification preference', (done) => {
        moip.init(auth).then((client) => {
            client.notification.create(notificationModel)
                .then(({body}) => {
                    body.should.have.property('id');
                    notificationModel.id = body.id;
                    body.should.be.jsonSchema(notificationModel);
                    done()
                })
            })
    });

    it('Should successfully get an notification', (done) => {
        moip.init(auth).then((client) => {
            client.notification.getOne(notificationModel.id)
                .then(({body}) => {
                    body.should.be.jsonSchema(notificationModel);
                    done()
                })
            })
    });

    it('Should fail to get a notification', (done) => {
        moip.init(auth).then((client) => {
            client.notification.getOne('invalid-id')
                .catch(() => done());
        })
    });

    it('Should successfully get all notifications', (done) => {
        moip.init(auth).then((client) => {
            client.notification.getAll()
                .then(() => {
                    done()
                })
                .catch(done);
        })
    });

    it('Should successfully delete a notification', (done) => {
        moip.init(auth).then((client) => {
            client.notification.remove(notificationModel.id)
                .then(() => {
                    done()
                })
                .catch(done);
        })
    });
});
