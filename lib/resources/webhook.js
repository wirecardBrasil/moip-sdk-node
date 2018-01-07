import api from '../client/api';
import endpoints from '../client/endpoints';
import environment from '../client/environment';

const getOne = (_id) => {
    return api.get(null, null, {customUrl: `${endpoints[environment.get()].v2.url}/webhooks?resourceId=${_id}`});
};

const getAll = () => {
    return api.get('/webhooks');
};

export default {
    getOne,
    getAll
}
