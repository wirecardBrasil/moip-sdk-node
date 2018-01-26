'use strict';

var _auth = require('./config/auth');

var _auth2 = _interopRequireDefault(_auth);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.should();
_chai2.default.use(require('chai-json-schema'));

describe('Moip Webhooks', function () {

    var webhook = {};

    it('Should successfully get all webhooks', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.webhook.getAll().then(function (body) {
                body.should.have.property('webhooks');
                webhook.resourceId = body.webhooks[0].resourceId;
                webhook.id = body.webhooks[0].id;
                done();
            });
        });
    });

    it('Should successfully get webhooks from specific resource', function (done) {
        _index2.default.init(_auth2.default).then(function (client) {
            client.webhook.getOne(webhook.resourceId).then(function (body) {
                body.should.have.property('webhooks');
                done();
            });
        });
    });
});