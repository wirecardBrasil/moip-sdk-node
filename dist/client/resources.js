'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _customer = require('../resources/customer');

var _customer2 = _interopRequireDefault(_customer);

var _order = require('../resources/order');

var _order2 = _interopRequireDefault(_order);

var _payment = require('../resources/payment');

var _payment2 = _interopRequireDefault(_payment);

var _escrow = require('../resources/escrow');

var _escrow2 = _interopRequireDefault(_escrow);

var _account = require('../resources/account');

var _account2 = _interopRequireDefault(_account);

var _notification = require('../resources/notification');

var _notification2 = _interopRequireDefault(_notification);

var _connect = require('../resources/connect');

var _connect2 = _interopRequireDefault(_connect);

var _bankAccount = require('../resources/bankAccount');

var _bankAccount2 = _interopRequireDefault(_bankAccount);

var _webhook = require('../resources/webhook');

var _webhook2 = _interopRequireDefault(_webhook);

var _plan = require('../resources/plan');

var _plan2 = _interopRequireDefault(_plan);

var _subscriber = require('../resources/subscriber');

var _subscriber2 = _interopRequireDefault(_subscriber);

var _subscription = require('../resources/subscription');

var _subscription2 = _interopRequireDefault(_subscription);

var _coupon = require('../resources/coupon');

var _coupon2 = _interopRequireDefault(_coupon);

var _refund = require('../resources/refund');

var _refund2 = _interopRequireDefault(_refund);

var _multiorder = require('../resources/multiorder');

var _multiorder2 = _interopRequireDefault(_multiorder);

var _multipayment = require('../resources/multipayment');

var _multipayment2 = _interopRequireDefault(_multipayment);

var _transfer = require('../resources/transfer');

var _transfer2 = _interopRequireDefault(_transfer);

var _balance = require('../resources/balance');

var _balance2 = _interopRequireDefault(_balance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  customer: _customer2.default,
  order: _order2.default,
  payment: _payment2.default,
  escrow: _escrow2.default,
  account: _account2.default,
  notification: _notification2.default,
  connect: _connect2.default,
  bankAccount: _bankAccount2.default,
  webhook: _webhook2.default,
  plan: _plan2.default,
  subscriber: _subscriber2.default,
  subscription: _subscription2.default,
  coupon: _coupon2.default,
  refund: _refund2.default,
  multiorder: _multiorder2.default,
  multipayment: _multipayment2.default,
  transfer: _transfer2.default,
  balance: _balance2.default
};