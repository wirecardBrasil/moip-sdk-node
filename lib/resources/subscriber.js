import api from '../client/api_assinaturas'

const getOne = (opts, _code) => {
  return api.get(opts, `/customers/${_code}`)
}

const getAll = (opts) => {
  return api.get(opts, '/customers')
}

const create = (opts, subscriber, config) => {
  return api.post(opts, '/customers', subscriber, config)
}

const update = (opts, _code, subscriber) => {
  return api.put(opts, `/customers/${_code}`, subscriber)
}

const updateBilling = (opts, _code, billingInfo) => {
  return api.put(opts, `/customers/${_code}/billing_infos`, billingInfo)
}

export default {
  getOne,
  getAll,
  create,
  update,
  updateBilling
}
