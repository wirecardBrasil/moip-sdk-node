import api from '../client/api';

const create = (_id, bank_account) => {
    return api.post(`/accounts/${_id}/bankaccounts`, bank_account);
};

const getOne = (_id) => {
    return api.get('/bankaccounts', _id);
};

const getAll = (_id) => {
    return api.get(`/accounts/${_id}/bankaccounts`);
};

const remove = (_id) => {
    return api.remove(`/bankaccounts/${_id}`);
};


export default {
    create,
    getOne,
    getAll,
    remove
}
