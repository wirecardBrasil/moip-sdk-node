var request = require('request')
var moip = require('./moip')

var basicAuth = null
var endpoint = null

var bankaccount = {}

bankaccount.create = function (_account_id, bankaccounts, callback) {
  var options = {
    url: endpoint.v2.url + '/accounts/'+_account_id+'/bankaccounts/',
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

bankaccount.getOne = function (_id, callback) {
  var options = {
    url: endpoint.v2.url + '/bankaccounts/' + _id,
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

bankaccount.getAll = function (_id, callback) {
  var options = {
    url: endpoint.v2.url + '/accounts/' + _id+'/bankaccounts',
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

bankaccount.deleteOne = function (_id, callback) {
  var options = {
    url: endpoint.v2.url + '/bankaccounts/' + _id,
    headers: {
      'Authorization': basicAuth
    },
    method: 'DELETE',
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

  return bankaccount
}
