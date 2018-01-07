import customer from './resources/customer';
import order from './resources/order';
import payment from './resources/payment';
import account from './resources/account';
import notification from './resources/notification';
import connect from './resources/connect';
import bankAccount from './resources/bankAccount';
import webhook from './resources/webhook';
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
    account,
    notification,
    connect,
    bankAccount
    // webhook,
    // plan,
    // subscriber,
    // subscription,
    // coupon,
    // connect
};