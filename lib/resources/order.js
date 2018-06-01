import api from '../client/api'
import {getQuerystring} from '../utils'

const getOne = (opts, _id) => api.get(opts, '/orders', _id)

const getAll = (opts) => api.get(opts, '/orders')

const query = (opts, _query) => api.get(opts, '/orders', null, null, getQuerystring(_query))

const create = (opts, order) => api.post(opts, '/orders', order)

const refund = (opts, _id, method) => api.post(opts, `/orders/${_id}/refunds`, method || null)

const getRefunds = (opts, _id) => api.get(opts, `/orders/${_id}/refunds`)

export default {
  getOne,
  getAll,
  create,
  query,
  refunds: {
    create: refund,
    get: getRefunds
  }
}
