import { Buffer } from 'safe-buffer'
import resources from './resources'
import { bind, reduce, isFunction } from 'lodash'

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

const binder = (func, args) => bind(func, null, args)

const looper = (result, resource, authObject) => reduce(resource, (result, func, key) => {
  result[key] = isFunction(func) ? binder(func, authObject) : looper(result, func, authObject)
  return result
}, {})

const connect = (opts) => {
  const auth = authorization(opts)
  const env = environment(opts.production)

  return reduce(resources, (result, resource, key) => {
    result[key] = looper(result, resource, {auth, env})
    return result
  }, {})
}

export default connect
