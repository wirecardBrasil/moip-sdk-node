var chai = require('chai');
var should = chai.should();
chai.use(require('chai-json-schema'));

var moip = require('../index.js')({
    token: '01010101010101010101010101010101',
    key: 'ABABABABABABABABABABABABABABABABABABABAB'
});

var notification = {
    events: [
        'ORDER.*',
        'PAYMENT.AUTHORIZED',
        'PAYMENT.CANCELLED'
    ],
    target: 'https://requestb.in/17ndz451',
    media: 'WEBHOOK'
};

describe('Moip Notifications', function() {
    it('Should successfully create a notification preference', function(done) {
        moip.notification.create(notification, function(error, body, response) {
            response.statusCode.should.be.eql(201);
            //Verify and add to schema
            body.should.have.property('id');
            notification.id = body.id;
            body.should.be.jsonSchema(notification);
            done();
        });
    });
    it('Should successfully get an notification', function(done) {
        moip.notification.getOne(notification.id, function(error, body, response) {
            response.statusCode.should.be.eql(200);
            body.should.be.jsonSchema(notification);
            done();
        });
    });
    it('Should fail to get a notification', function(done) {
        moip.notification.getOne('invalid-id', function(error, body, response) {
            response.statusCode.should.be.eql(404);
            done();
        });
    });
    it('Should successfully get all notifications', function(done) {
        moip.notification.getAll(function(error, body, response) {
            response.statusCode.should.be.eql(200);
            done();
        });
    });
    it('Should successfully delete a notification', function(done) {
        moip.notification.delete(notification.id, function(error, response) {
            response.statusCode.should.be.eql(204);
            done();
        });
    });
});
