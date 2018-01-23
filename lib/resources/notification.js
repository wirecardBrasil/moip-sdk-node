import api from '../client/api';

const getOne = (opts, _id) => {
    return api.get(opts, '/preferences/notifications', _id);
};

const getAll = (opts) => {
    return api.get(opts, '/preferences/notifications');
};

const create = (opts, preferences) => {
    return api.post(opts, '/preferences/notifications', preferences);
};

const remove = (opts, _id) => {
    return api.remove(opts, `/preferences/notifications/${_id}`);
};

export default {
    getOne,
    getAll,
    create,
    remove
}