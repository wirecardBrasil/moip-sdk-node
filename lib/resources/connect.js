import api from '../client/api';
import endpoints from '../client/endpoints';
import environment from '../client/environment';

const getAuthorizeUrl = ({client_id, redirect_uri, scopes}) => {
    if (client_id && redirect_uri && scopes) {
        const responseType = 'response_type=code';
        return `${endpoints[environment.get()].v2.authorizeUrl}${responseType}?&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}`;
    } else {
        return 'Please inform the config object passing your client_id, redirect_uri and the list of scopes';
    }
};

const generateToken = (config) => {
    return api.post(endpoints[environment.get()].v2.generateTokenUrl, config, {form: true});
};

export default {
    getAuthorizeUrl,
    generateToken
}