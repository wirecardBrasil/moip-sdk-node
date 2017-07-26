module.exports = function(credentials) {

    var basicAuth = "Basic " + new Buffer(credentials.token + ":" + credentials.key).toString("base64");

    return {
        customer: require('./lib/customer')(basicAuth),
        order: require('./lib/order')(basicAuth),
        payment: require('./lib/payment')(basicAuth),
        webhook: require('./lib/webhook')(basicAuth),
        notification: require('./lib/notification')(basicAuth),
        plan: require('./lib/plan')(basicAuth)
    };
};
