import connect from './resources/connect';
import account from './resources/account';
import bankAccount from './resources/bankAccount';
import order from './resources/order';
import payment from './resources/payment';
import webhook from './resources/webhook';
import notification from './resources/notification';
import plan from './resources/plan';
import subscriber from './resources/subscriber';
import subscription from './resources/subscription';
import coupon from './resources/coupon';

import { initAuthorization } from './client/authorization';


export default {
    initAuthorization,
    account,
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