import api from '../client/api'

const getOne = (opts, _id) => {
  return api.get(opts, '/orders', _id)
}

const getAll = (opts) => {
  return api.get(opts, '/orders')
}

const create = (opts, order) => {
  return api.post(opts, '/orders', order)
}

const refund = (opts, _id, method) => {
  return api.post(opts, `/orders/${_id}/refunds`, method || null)
}

export default {
  getOne,
  getAll,
  create,
  refund
}
