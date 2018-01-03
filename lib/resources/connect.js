var request = require('request')
var moip = require('./moip')

var basicAuth = null
var production = false
var endpoint = null

var connect = {}

connect.getAuthorizeUrl = function (config, callback) {
  if (config && config.client_id && config.redirect_uri && config.scopes) {
    var responseType = 'response_type=code';
    var url = endpoint.v2.authorizeUrl + '?' + responseType +
        '&client_id=' + config.client_id +
        '&redirect_uri=' + config.redirect_uri +
        '&scope=' + config.scopes;

  } else {
    var error = 'Please inform the config object passing your client_id, redirect_uri and the list of scopes';
  }
  callback(error, url);
}

connect.generateToken = function (config, callback) {
  var options = {
    url: endpoint.v2.generateTokenUrl,
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    form: config
  }

  request(options, function (error, response, body) {
    if (body) {
      callback(error, body, response)
    } else {
      callback(error)
    }
  })
}

module.exports = function (_basicAuth, _production) {
  basicAuth = _basicAuth

  if (_production) {
    endpoint = moip.production
  } else {
    endpoint = moip.sandbox
  }

  return connect
}