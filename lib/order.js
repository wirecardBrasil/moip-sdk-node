var request = require('request')
var moip = require('./moip')

var basicAuth = null

var order = {}

order.getOne = function (id, callback) {
  var options = {
    url: moip.sandbox.url + '/orders/' + id,
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
    url: moip.sandbox.url + '/orders',
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
    url: moip.sandbox.url + '/orders',
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

module.exports = function (_basicAuth) {
  basicAuth = _basicAuth

  return order
}
