import authorization from './client/authorization';
import request from 'request-promise';
import endpoints from './client/endpoints';

const get = (endpoint, id) => {
    const options = {
        url: `${endpoints['sandbox'].v2.url}${endpoint}/${id||''}`,
        headers: {
            'Authorization': authorization
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
            'Authorization': authorization
        },
        method: 'POST',
        body: payload,
        json: true
    };
    console.log(options);
    return request(options);
};

export default {
    get,
    post
}