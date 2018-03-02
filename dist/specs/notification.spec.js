'use strict';

var _auth = require('./config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _notification = require('./schemas/notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(require('chai-json-schema'));

describe('Moip Notifications', function () {
    it('Should successfully create a notification preference', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.notification.create(_notification2.default).then(function (body) {
                body.should.have.property('id');
                _notification2.default.id = body.id;
                body.should.be.jsonSchema(_notification2.default);
                done();
            });
        });
    });

    it('Should successfully get an notification', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.notification.getOne(_notification2.default.id).then(function (body) {
                body.should.be.jsonSchema(_notification2.default);
                done();
            });
        });
    });

    it('Should fail to get a notification', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.notification.getOne('invalid-id').catch(function () {
                return done();
            });
        });
    });

    it('Should successfully get all notifications', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.notification.getAll().then(function () {
                done();
            }).catch(done);
        });
    });

    it('Should successfully delete a notification', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.notification.remove(_notification2.default.id).then(function () {
                done();
            }).catch(done);
        });
    });
});