import request from 'request-promise'
import endpoints from './endpoints'

const get = (opts, endpoint, id, config) => {
  const options = {
    url: config && config.customUrl ? config.customUrl : `${endpoints[opts.env].v2.url}${endpoint}/${id || ''}`,
    headers: {
      'Authorization': opts.auth
    },
    method: 'GET',
    json: true,
    resolveWithFullResponse: true
  }

  return request(options)
}

const post = (opts, endpoint, payload, config) => {
  const options = {
    url: config && config.customUrl ? config.customUrl : `${endpoints[opts.env].v2.url}${endpoint}`,
    headers: {
      'Authorization': opts.auth
    },
    method: 'POST',
    body: payload,
    form: config && config.form,
    json: !config || !config.form,
    resolveWithFullResponse: true
  }

  return request(options)
}

const remove = (opts, endpoint) => {
  const options = {
    url: `${endpoints[opts.env].v2.url}${endpoint}`,
    headers: {
      'Authorization': opts.auth
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
  remove
}
