import { Buffer } from "safe-buffer";

let key;

const initAuthorization = (credentials) => {
    if (credentials.accessToken)
        key = 'OAuth ' + credentials.accessToken;
    else
    if (credentials.token && credentials.key)
        key = 'Basic ' + new Buffer(credentials.token + ':' + credentials.key).toString('base64');
    else
        throw Error ('You must provide either an `accessToken` or your `token` with the corresponding `key`.');

    console.log('\n', key);
};

const get = () => {
    return key;
}

export default {
    initAuthorization,
    get
}
