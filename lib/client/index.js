import { Buffer } from 'safe-buffer'
import resources from './resources'
import { bind, reduce } from 'lodash'
import Promise from 'bluebird'

const environment = (isProduction) => {
  return isProduction ? 'production' : 'sandbox'
}

const authorization = (opts) => {
  let auth
  if (opts.accessToken) {
    auth = 'OAuth ' + opts.accessToken
  } else if (opts.token && opts.key) {
    auth = 'Basic ' + new Buffer(opts.token + ':' + opts.key).toString('base64')
  } else {
    throw Error('You must provide either an `accessToken` or your `token` with the corresponding `key`.')
  }

  return auth
}

const connect = (opts) => {
  const auth = authorization(opts)
  const env = environment(opts.production)

  return Promise.resolve(reduce(resources, (result, resource, key) => {
    result[key] = reduce(resource, (result, func, key) => {
      result[key] = bind(func, null, {auth, env})
      return result
    }, {})

    return result
  }, {}))
}

export default {
  connect
}
