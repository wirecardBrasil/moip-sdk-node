import { Buffer } from "safe-buffer";

let authorization;

const initAuthorization = (credentials) => {
    if (credentials.accessToken)
        authorization = 'OAuth ' + credentials.accessToken;
    else
    if (credentials.token && credentials.key)
        authorization = 'Basic ' + new Buffer(credentials.token + ':' + credentials.key).toString('base64');
    else
        throw Error ('You must provide either an `accessToken` or your `token` with the corresponding `key`.');

    console.log('\n', authorization);
};

export {
    initAuthorization
}

export default authorization;