import api from '../client/api';

const getOne = (_id) => {
    return api.get('/customers', _id);
};

const getAll = () => {
    return api.get('/customers');
};

const create = (customer) => {
    return api.post('/customers', customer);
};

const createCreditCard = (_id, credit_card) => {
    return api.post(`/customers/${_id}/fundinginstruments`, credit_card);
};

const removeCreditCard = (_id) => {
    return api.remove(`/fundinginstruments/${_id}`);
};

export default {
    getOne,
    getAll,
    create,
    createCreditCard,
    removeCreditCard
}
