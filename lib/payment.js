var request = require('request')
var moip = require('./moip')

var basicAuth = null

var payment = {}

payment.getOne = function (id, callback) {
  var options = {
    url: moip.sandbox.url + '/payments/' + id,
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

payment.create = function (orderId, payment, callback) {
  var options = {
    url: moip.sandbox.url + '/orders/' + orderId + '/payments',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: payment,
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

payment.authorize = function (id, amount, callback) {
  var options = {
    url: 'https://sandbox.moip.com.br/simulador/authorize?payment_id=' + id + '&amount=' + amount,
    headers: {
      'Authorization': basicAuth
    },
    method: 'GET',
    json: true
  }

  request(options, function (error, response) {
    if (response) {
      callback(error, response)
    } else {
      callback(error)
    }
  })
}

module.exports = function (_basicAuth) {
  basicAuth = _basicAuth

  return payment
}
