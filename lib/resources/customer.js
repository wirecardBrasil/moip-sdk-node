import api from '../client/api'

const getOne = (opts, _id) => api.get(opts, '/customers', _id)

const getAll = (opts) => api.get(opts, '/customers')

const create = (opts, customer) => api.post(opts, '/customers', customer)

const createCreditCard = (opts, _id, creditCard) => api.post(opts, `/customers/${_id}/fundinginstruments`, creditCard)

const removeCreditCard = (opts, _id) => api.remove(opts, `/fundinginstruments/${_id}`)

export default {
  getOne,
  getAll,
  create,
  createCreditCard,
  removeCreditCard
}
