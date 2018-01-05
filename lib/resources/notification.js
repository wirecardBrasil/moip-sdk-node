import api from '../client/api';

const getOne = (_id) => {
    return api.get('/preferences/notifications', _id);
};

const getAll = () => {
    return api.get('/preferences/notifications');
};

const create = (preferences) => {
    return api.post('/preferences/notifications', preferences);
};

const remove = (_id) => {
    return api.remove(`/preferences/notifications/${_id}`);
};

export default {
    getOne,
    getAll,
    create,
    remove
}