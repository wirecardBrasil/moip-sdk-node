import api from '../client/api';

const create = (opts, _id, bank_account) => {
    return api.post(opts, `/accounts/${_id}/bankaccounts`, bank_account);
};

const getOne = (opts, _id) => {
    return api.get(opts, '/bankaccounts', _id);
};

const getAll = (opts, _id) => {
    return api.get(opts, `/accounts/${_id}/bankaccounts`);
};

const remove = (opts, _id) => {
    return api.remove(opts, `/bankaccounts/${_id}`);
};


export default {
    create,
    getOne,
    getAll,
    remove
}
