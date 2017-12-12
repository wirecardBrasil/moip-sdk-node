var Buffer = require('safe-buffer').Buffer

module.exports = function (credentials, _production) {
  var basicAuth = 'Basic ' + new Buffer(credentials.token + ':' + credentials.key).toString('base64')
  var OAuth = 'OAuth ' + credentials.OAuth
  var production = _production || false

  return {
    account: require('./lib/account')(OAuth, production),
    bankAccount: require('./lib/bankAccount')(OAuth, production),
    customer: require('./lib/customer')(basicAuth, production),
    order: require('./lib/order')(basicAuth, production),
    payment: require('./lib/payment')(basicAuth, production),
    webhook: require('./lib/webhook')(basicAuth, production),
    notification: require('./lib/notification')(basicAuth, production),
    plan: require('./lib/plan')(basicAuth, production),
    subscriber: require('./lib/subscriber')(basicAuth, production),
    subscription: require('./lib/subscription')(basicAuth, production),
    coupon: require('./lib/coupon')(basicAuth, production),
    connect: require('./lib/connect')(basicAuth, production)
  }
}
