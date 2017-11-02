var request = require('request')
var moip = require('./moip')

var basicAuth = null
var production = false
var endpoint = null

var connect = {}

connect.createApp = function (app, callback) {
  var options = {
    url: endpoint.v2.url + '/channels',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: app,
    json: true
  }

  request(options, function (error, response, body) {
    if (response) {
      callback(error, body, response)
    } else {
      callback(error)
    }
  })
}

connect.generateToken = function (client, callback) {
  var options = {
    url: endpoint.v2.OAuthUrl,
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    form: client
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
