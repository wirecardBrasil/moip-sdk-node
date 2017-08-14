var request = require('request')
var moip = require('./moip')

var basicAuth = null

var webhook = {}

webhook.getOne = function (resourceId, callback) {
  var options = {
    url: moip.sandbox.url + '/webhooks?resourceId=' + resourceId,
    headers: {
      'Authorization': basicAuth
    },
    method: 'GET',
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

webhook.getAll = function (callback) {
  var options = {
    url: moip.sandbox.url + '/webhooks',
    headers: {
      'Authorization': basicAuth
    },
    method: 'GET',
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

webhook.resend = function (webhook, callback) {
  var options = {
    url: moip.sandbox.url + '/webhooks',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: webhook,
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

module.exports = function (_basicAuth) {
  basicAuth = _basicAuth

  return webhook
}
