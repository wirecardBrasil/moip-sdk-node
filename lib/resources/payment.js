import api from '../api';
import endpoints from '../client/endpoints';

const getOne = (_id) => {
    return api.get('/payments', _id);
};

const create = (order_id, payment) => {
    return api.post(`/orders/${order_id}/payments`, payment);
};

const refund = (_id) => {
    return api.post(`/payments/${_id}/refunds`);
};

const preAuthorizationCapture = (_id) => {
    return api.post(`/payments/${_id}/capture`);
};

const preAuthorizationCancel = (_id) => {
    return api.post(`/payments/${_id}/void`);
};

const _authorize = function (_id, amount) {
    return api.get(null, null, {customUrl: `${endpoints.sandbox.v2.authorizePaymentSimulationUrl}?payment_id=${_id}&amount${amount}`});
};

export default {
    getOne,
    create,
    refund,
    preAuthorizationCapture,
    preAuthorizationCancel,
    _authorize
}