import api from '../client/api_assinaturas'

const getOne = (opts, _code) => api.get(opts, `/customers/${_code}`)

const getAll = (opts) => api.get(opts, '/customers')

const create = (opts, subscriber, config) => api.post(opts, '/customers', subscriber, config)

const update = (opts, _code, subscriber) => api.put(opts, `/customers/${_code}`, subscriber)

const updateBilling = (opts, _code, billingInfo) => api.put(opts, `/customers/${_code}/billing_infos`, billingInfo)

export default {
  getOne,
  getAll,
  create,
  update,
  updateBilling
}
