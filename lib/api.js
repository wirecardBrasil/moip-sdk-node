import authorization from './client/authorization';
import request from 'request-promise';
import endpoints from './client/endpoints';

const get = (endpoint, id, opts) => {
    const options = {
        url: opts && opts.customUrl ? opts.customUrl : `${endpoints['sandbox'].v2.url}${endpoint}/${id||''}`,
        headers: {
            'Authorization': authorization.get()
        },
        method: 'GET',
        json: true
    };

    return request(options);
};

const post = (endpoint, payload) => {
    const options = {
        url: `${endpoints['sandbox'].v2.url}${endpoint}`,
        headers: {
            'Authorization': authorization.get()
        },
        method: 'POST',
        body: payload,
        json: true
    };
    return request(options);
};

const remove = (endpoint) => {
    const options = {
        url: `${endpoints['sandbox'].v2.url}${endpoint}`,
        headers: {
            'Authorization': authorization.get()
        },
        method: 'DELETE',
        json: true
    };
};

export default {
    get,
    post
}