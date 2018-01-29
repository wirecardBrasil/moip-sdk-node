import request from 'request-promise'
import endpoints from './endpoints'
import pjson from '../../package'

const get = (opts, endpoint, id, config) => {
  const options = {
    url: config && config.customUrl ? config.customUrl : `${endpoints[opts.env].assinaturas.url}${endpoint}/${id || ''}`,
    headers: {
      'Authorization': opts.auth,
      'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`
    },
    method: 'GET',
    json: true,
    resolveWithFullResponse: true
  }

  return request(options)
}

const post = (opts, endpoint, payload, config) => {
  const options = {
    url: config && config.customUrl ? config.customUrl : `${endpoints[opts.env].assinaturas.url}${endpoint}`,
    headers: {
      'Authorization': opts.auth,
      'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`
    },
    method: 'POST',
    body: payload,
    form: config && config.form,
    json: !config || !config.form,
    resolveWithFullResponse: true
  }

  return request(options)
}

const put = (opts, endpoint, payload, id, config) => {
  const options = {
    url: config && config.customUrl ? config.customUrl : `${endpoints[opts.env].assinaturas.url}${endpoint}/${id || ''}`,
    headers: {
      'Authorization': opts.auth,
      'content-type': 'application/json',
      'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`
    },
    method: 'PUT',
    body: payload,
    form: config && config.form,
    json: !config || !config.form,
    resolveWithFullResponse: true
  }

  return request(options)
}

const remove = (opts, endpoint) => {
  const options = {
    url: `${endpoints[opts.env].assinaturas.url}${endpoint}`,
    headers: {
      'Authorization': opts.auth,
      'User-Agent': `MoipNodeSDK/${pjson.version} (+https://github.com/moip/moip-sdk-node/)`
    },
    method: 'DELETE',
    json: true,
    resolveWithFullResponse: true
  }

  return request(options)
}

export default {
  get,
  post,
  remove,
  put
}
