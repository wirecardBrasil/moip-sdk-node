import api from '../client/api';

const getOne = (_id) => {
    return api.get('/orders', _id);
};

const getAll = () => {
    return api.get('/orders');
};

const create = (order) => {
    return api.post('/orders', order);
};

const refund = (_id, method) => {
    return api.post(`/orders/${_id}/refunds`, method || null);
};

export default {
    getOne,
    getAll,
    create,
    refund
}