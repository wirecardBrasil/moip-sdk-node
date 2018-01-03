import { Buffer } from "safe-buffer";

const authorization  = (credentials) => {
    if (credentials.accessToken)
        return 'OAuth ' + credentials.accessToken;
    else
        return 'Basic ' + new Buffer(credentials.token + ':' + credentials.key).toString('base64');
};

export default {
    authorization
}