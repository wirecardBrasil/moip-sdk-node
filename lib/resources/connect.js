import api from '../client/api'
import endpoints from '../client/endpoints'
import Promise from 'bluebird'

const getAuthorizeUrl = (opts, {clientId, redirectUri, scopes}) => {
  return new Promise((resolve, reject) => {
    if (clientId && redirectUri && scopes) {
      const responseType = 'response_type=code'
      return resolve(`${endpoints[opts.env].v2.authorizeUrl}${responseType}?&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`)
    } else {
      return reject(new Error('Please inform the config object passing your client_id, redirect_uri and the list of scopes'))
    }
  })
}

const generateToken = (opts, config) => {
  return api.post(opts, null, config, {customUrl: endpoints[opts.env].v2.generateTokenUrl, form: true})
}

export default {
  getAuthorizeUrl,
  generateToken
}
