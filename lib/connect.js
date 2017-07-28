var request = require('request');
var moip = require('./moip');

var basicAuth = null;

var connect = {};

connect.createApp = function(app, callback) {

    var options = {
        url: moip.sandbox.url + '/channels',
        headers: {
            'Authorization': basicAuth
        },
        method: 'POST',
        body: app,
        json: true
    };

    request(options, function(error, response, body) {
        if (response) {
            callback(error, body, response);
        } else {
            callback(error);
        }
    });
};

connect.generateToken = function(client, callback) {

    var options = {
        url: 'https://connect-sandbox.moip.com.br/oauth/token',
        headers: {
            'Authorization': basicAuth
        },
        method: 'POST',
        form: client
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

    return connect;
};
