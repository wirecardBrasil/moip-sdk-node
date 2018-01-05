import api from '../client/api';

const create = (account) => {
    return api.post('/accounts', account);
};

const getOne = (_id) => {
    return api.get('/accounts', _id);
};

export default {
    create,
    getOne
}