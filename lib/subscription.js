var request = require('request')
var moip = require('./moip')

var basicAuth = null
var endpoint = null

var subscription = {}

subscription.getAll = function (callback) {
  var options = {
    url: endpoint.assinaturas.url + '/subscriptions',
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

subscription.getOne = function (code, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/subscriptions/' + code,
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

subscription.create = function (subscription, query, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/subscriptions',
    headers: {
      'Authorization': basicAuth
    },
    qs: query || {},
    method: 'POST',
    body: subscription,
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

subscription.update = function (code, subscription, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/subscriptions/' + code,
    headers: {
      'Authorization': basicAuth
    },
    method: 'PUT',
    body: subscription,
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

subscription.updateBilling = function (code, subscription, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/subscriptions/' + code,
    headers: {
      'Authorization': basicAuth
    },
    method: 'PUT',
    body: subscription,
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

subscription.suspend = function (code, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/subscriptions/' + code + '/suspend',
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

subscription.activate = function (code, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/subscriptions/' + code + '/activate',
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

subscription.cancel = function (code, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/subscriptions/' + code + '/cancel',
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

subscription.getAllInvoices = function (code, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/subscriptions/' + code + '/invoices',
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

subscription.getOneInvoice = function (id, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/invoices/' + id,
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

subscription.getAllPayments = function (id, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/invoices/' + id + '/payments',
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

subscription.getOnePayment = function (id, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/payments/' + id,
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

subscription.createNotification = function (notification, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/users/preferences',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: notification,
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

  return subscription
}
