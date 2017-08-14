var request = require('request')
var moip = require('./moip')

var basicAuth = null

var notification = {}

notification.getOne = function (id, callback) {
  var options = {
    url: moip.sandbox.url + '/preferences/notifications/' + id,
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

notification.getAll = function (callback) {
  var options = {
    url: moip.sandbox.url + '/preferences/notifications',
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

notification.create = function (notification, callback) {
  var options = {
    url: moip.sandbox.url + '/preferences/notifications',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: notification,
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

notification.delete = function (id, callback) {
  var options = {
    url: moip.sandbox.url + '/preferences/notifications/' + id,
    headers: {
      'Authorization': basicAuth
    },
    method: 'DELETE',
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

  return notification
}
