import customer from './resources/customer';
import order from './resources/order';
import payment from './resources/payment';
import connect from './resources/connect';
import account from './resources/account';
import bankAccount from './resources/bankAccount';
import webhook from './resources/webhook';
import notification from './resources/notification';
import plan from './resources/plan';
import subscriber from './resources/subscriber';
import subscription from './resources/subscription';
import coupon from './resources/coupon';

import authorization from './client/authorization';


export default {
    init: authorization.set,
    customer,
    order,
    payment,
    // connect,
    // account,
    // bankAccount
    // webhook,
    // notification,
    // plan,
    // subscriber,
    // subscription,
    // coupon,
    // connect
};