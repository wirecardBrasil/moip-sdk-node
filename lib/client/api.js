import authorization from './authorization';
import request from 'request-promise';
import endpoints from './endpoints';
import environment from './environment';

const get = (endpoint, id, opts) => {
    const options = {
        url: opts && opts.customUrl ? opts.customUrl : `${endpoints[environment.get()].v2.url}${endpoint}/${id||''}`,
        headers: {
            'Authorization': authorization.get()
        },
        method: 'GET',
        json: true
    };

    return request(options);
};

const post = (endpoint, payload, opts) => {
    const options = {
        url: `${endpoints[environment.get()].v2.url}${endpoint}`,
        headers: {
            'Authorization': authorization.get()
        },
        method: 'POST',
        body: payload,
        form: opts && opts.form,
        json: !opts || !opts.form
    };

    console.log(options);

    return request(options);
};

const remove = (endpoint) => {
    const options = {
        url: `${endpoints[environment.get()].v2.url}${endpoint}`,
        headers: {
            'Authorization': authorization.get()
        },
        method: 'DELETE',
        json: true
    };

    return request(options);
};

export default {
    get,
    post,
    remove
}