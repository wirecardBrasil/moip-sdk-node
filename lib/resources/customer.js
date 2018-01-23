import api from '../client/api';

const getOne = (opts, _id) => {
    return api.get(opts, '/customers', _id);
};

const getAll = (opts) => {
    return api.get(opts, '/customers');
};

const create = (opts, customer) => {
    return api.post(opts, '/customers', customer);
};

const createCreditCard = (opts, _id, credit_card) => {
    return api.post(opts, `/customers/${_id}/fundinginstruments`, credit_card);
};

const removeCreditCard = (opts, _id) => {
    return api.remove(opts, `/fundinginstruments/${_id}`);
};

export default {
    getOne,
    getAll,
    create,
    createCreditCard,
    removeCreditCard
}
