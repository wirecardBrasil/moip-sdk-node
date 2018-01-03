var request = require('request')
var moip = require('./moip')

var basicAuth = null
var endpoint = null

var coupon = {}

coupon.getAll = function (callback) {
  var options = {
    url: endpoint.assinaturas.url + '/coupons',
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

coupon.getOne = function (code, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/coupons/' + code,
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

coupon.create = function (coupon, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/coupons',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: coupon,
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

coupon.associate = function (code, coupon, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/subscriptions/' + code,
    headers: {
      'Authorization': basicAuth
    },
    method: 'PUT',
    body: coupon,
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

coupon.activate = function (code, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/coupons/' + code + '/active',
    headers: {
      'Authorization': basicAuth
    },
    method: 'PUT',
    body: {},
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

coupon.inactivate = function (code, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/coupons/' + code + '/inactive',
    headers: {
      'Authorization': basicAuth
    },
    method: 'PUT',
    body: {},
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

  return coupon
}
