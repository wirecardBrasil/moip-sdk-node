var request = require('request')
var moip = require('./moip')

var basicAuth = null
var endpoint = null

var subscriber = {}

subscriber.getAll = function (callback) {
  var options = {
    url: endpoint.assinaturas.url + '/customers',
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

subscriber.getOne = function (code, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/customers/' + code,
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

subscriber.create = function (subscriber, query, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/customers',
    headers: {
      'Authorization': basicAuth
    },
    qs: query || {},
    method: 'POST',
    body: subscriber,
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

subscriber.update = function (code, subscriber, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/customers/' + code,
    headers: {
      'Authorization': basicAuth
    },
    method: 'PUT',
    body: subscriber,
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

subscriber.updateBilling = function (code, billingInfo, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/customers/' + code + '/billing_infos',
    headers: {
      'Authorization': basicAuth
    },
    method: 'PUT',
    body: billingInfo,
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

module.exports = function (_basicAuth, _production) {
  basicAuth = _basicAuth

  if (_production) {
    endpoint = moip.production
  } else {
    endpoint = moip.sandbox
  }

  return subscriber
}
