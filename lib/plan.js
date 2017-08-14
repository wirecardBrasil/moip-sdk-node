var request = require('request')
var moip = require('./moip')

var basicAuth = null

var plan = {}

plan.getAll = function (callback) {
  var options = {
    url: moip.v1.sandbox.url + '/plans',
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
    url: moip.v1.sandbox.url + '/plans/' + id,
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
    url: moip.v1.sandbox.url + '/plans',
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
    url: moip.v1.sandbox.url + '/plans/' + planId + '/activate',
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
    url: moip.v1.sandbox.url + '/plans/' + planId + '/inactivate',
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
    url: moip.v1.sandbox.url + '/plans/' + plan.code,
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

module.exports = function (_basicAuth) {
  basicAuth = _basicAuth

  return plan
}
