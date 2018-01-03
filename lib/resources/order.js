var request = require('request')
var moip = require('./moip')

var basicAuth = null
var endpoint = null

var order = {}

order.getOne = function (id, callback) {
  var options = {
    url: endpoint.v2.url + '/orders/' + id,
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

order.getAll = function (callback) {
  var options = {
    url: endpoint.v2.url + '/orders',
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

order.create = function (order, callback) {
  var options = {
    url: endpoint.v2.url + '/orders',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: order,
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

  return order
}
