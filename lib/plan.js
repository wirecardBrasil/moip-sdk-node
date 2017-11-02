var request = require('request')
var moip = require('./moip')

var basicAuth = null
var endpoint = null

var plan = {}

plan.getAll = function (callback) {
  var options = {
    url: endpoint.assinaturas.url + '/plans',
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

plan.getOne = function (id, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/plans/' + id,
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

plan.create = function (plan, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/plans',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: plan,
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

plan.activate = function (planId, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/plans/' + planId + '/activate',
    headers: {
      'Authorization': basicAuth
    },
    body: plan,
    method: 'PUT',
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

plan.inactivate = function (planId, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/plans/' + planId + '/inactivate',
    headers: {
      'Authorization': basicAuth
    },
    body: plan,
    method: 'PUT',
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

plan.update = function (plan, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/plans/' + plan.code,
    headers: {
      'Authorization': basicAuth
    },
    method: 'PUT',
    body: plan,
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

  return plan
}
