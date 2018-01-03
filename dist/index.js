'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _connect = require('./resources/connect');

var _connect2 = _interopRequireDefault(_connect);

var _account = require('./resources/account');

var _account2 = _interopRequireDefault(_account);

var _bankAccount = require('./resources/bankAccount');

var _bankAccount2 = _interopRequireDefault(_bankAccount);

var _order = require('./resources/order');

var _order2 = _interopRequireDefault(_order);

var _payment = require('./resources/payment');

var _payment2 = _interopRequireDefault(_payment);

var _webhook = require('./resources/webhook');

var _webhook2 = _interopRequireDefault(_webhook);

var _notification = require('./resources/notification');

var _notification2 = _interopRequireDefault(_notification);

var _plan = require('./resources/plan');

var _plan2 = _interopRequireDefault(_plan);

var _subscriber = require('./resources/subscriber');

var _subscriber2 = _interopRequireDefault(_subscriber);

var _subscription = require('./resources/subscription');

var _subscription2 = _interopRequireDefault(_subscription);

var _coupon = require('./resources/coupon');

var _coupon2 = _interopRequireDefault(_coupon);

var _authorization = require('./client/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    initAuthorization: _authorization2.default.initAuthorization,
    account: _account2.default
    // bankAccount: bankAccount(config.production),
    // customer: customer(config.production),
    // order: order(config.production),
    // payment: payment(config.production),
    // webhook: webhook(config.production),
    // notification: notification(config.production),
    // plan: plan(config.production),
    // subscriber: subscriber(config.production),
    // subscription: subscription(config.production),
    // coupon: coupon(config.production),
    // connect: connect(config.production)
};