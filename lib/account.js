var request = require('request')
var moip = require('./moip')

var basicAuth = null
var endpoint = null

var account = {}

account.create = function (account, callback) {
  var options = {
    url: endpoint.v2.url + '/accounts',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: account,
    json: true
  }

  request(options, function (error, response, body) {
    if (body) {
      callback(error, body, response)
    } else {
      callback(error)
    }
  })
}

account.getOne = function (_id, callback) {
  var options = {
    url: endpoint.v2.url + '/accounts/' + _id,
    headers: {
      'Authorization': basicAuth
    },
    method: 'GET',
    json: true
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

  return account
}
