import api from '../client/api';

const release = (_id) => {
    return api.post(`/escrows/${_id}/release`, null);
};

export default {
    release
}