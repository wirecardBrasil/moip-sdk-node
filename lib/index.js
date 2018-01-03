import connect from './lib/resources/connect';
import account from './lib/resources/account';
import bankAccount from './lib/resources/bankAccount';
import order from './lib/resources/order';
import payment from './lib/resources/payment';
import webhook from './lib/resources/webhook';
import notification from './lib/resources/notification';
import plan from './lib/resources/plan';
import subscriber from './lib/resources/subscriber';
import subscription from './lib/resources/subscription';
import coupon from './lib/resources/coupon';
import { initAuthorization } from './lib/client/authorization';

export default function (config) {
    
    initAuthorization(config);
    
    return {
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
    }
};