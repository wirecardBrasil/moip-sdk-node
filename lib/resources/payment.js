import api from '../client/api';
import endpoints from '../client/endpoints';

const getOne = (opts, _id) => {
    return api.get(opts, '/payments', _id);
};

const create = (opts, order_id, payment) => {
    return api.post(opts, `/orders/${order_id}/payments`, payment);
};

const preAuthorizationCapture = (opts, _id) => {
    return api.post(opts, `/payments/${_id}/capture`);
};

const preAuthorizationCancel = (opts, _id) => {
    return api.post(opts, `/payments/${_id}/void`);
};

const _authorize = function (opts, _id, amount) {
    return api.get(opts, null, null, {customUrl: `${endpoints.sandbox.v2.authorizePaymentSimulationUrl}?payment_id=${_id}&amount${amount}`});
};

const refund = (opts, _id, method) => {
    return api.post(opts, `/payments/${_id}/refunds`, method || null);
};

export default {
    getOne,
    create,
    refund,
    preAuthorizationCapture,
    preAuthorizationCancel,
    _authorize
}