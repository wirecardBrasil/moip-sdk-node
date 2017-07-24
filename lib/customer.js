var request = require('request');
var moip = require('./moip');

var basicAuth = null;

var customer = {};

customer.get = function(_id, callback) {

    var options = {
        url: moip.sandbox.url + '/customers/' + _id,
        headers: {
            'Authorization': basicAuth
        },
        method: 'GET'
    };

    request(options, function(error, response, body) {
        if (body) {
            callback(error, body, response);
        } else {
            callback(error);
        }
    });
};

customer.create = function(customer, callback) {

    var options = {
        url: moip.sandbox.url + '/customers',
        headers: {
            'Authorization': basicAuth
        },
        method: 'POST',
        body: customer,
        json: true
    };

    request(options, function(error, response, body) {
        if (body) {
            callback(error, body, response);
        } else {
            callback(error);
        }
    });
};

module.exports = function(_basicAuth) {
    basicAuth = _basicAuth;

    return customer;
};
