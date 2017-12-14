var request = require('request')
var moip = require('./moip')

var OAuth = null
var endpoint = null

var payment = {}

payment.getOne = function (id, callback) {
  var options = {
    url: endpoint.v2.url + '/payments/' + id,
    headers: {
      'Authorization': OAuth
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
    url: endpoint.v2.url + '/orders/' + orderId + '/payments',
    headers: {
      'Authorization': OAuth
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

payment.refund = function (payment_id, callback) {
  var options = {
    url: endpoint.v2.url + '/orders/' + payment_id + '/refunds',
    headers: {
      'Authorization': OAuth
    },
    method: 'POST',
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


payment.preAuthorizationCapture = function (payment_id, callback) {
  var options = {
    url: endpoint.v2.url + '/payments/' + payment_id + '/capture',
    headers: {
      'Authorization': OAuth
    },
    method: 'POST',
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

payment.preAuthorizationCancel = function (orderId, callback) {
  var options = {
    url: endpoint.v2.url + '/payments/' + payment_id + '/void',
    headers: {
      'Authorization': OAuth
    },
    method: 'POST',
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
    url: endpoint.v2.authorizeUrl + '?payment_id=' + id + '&amount=' + amount,
    headers: {
      'Authorization': OAuth
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

module.exports = function (_OAuth, _production) {
  OAuth = _OAuth

  if (_production) {
    endpoint = moip.production
  } else {
    endpoint = moip.sandbox
  }

  return payment
}
