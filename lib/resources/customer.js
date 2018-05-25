import api from '../client/api'
import {formatFilters} from '../utils'

const getOne = (opts, _id) => api.get(opts, '/customers', _id)

const getAll = (opts) => api.get(opts, '/customers')

const getByQuery = (opts, _query) => api.get(opts, '/customers', null, null, Object.assign(_query, {filters: formatFilters(_query.filters)}))

const create = (opts, customer) => api.post(opts, '/customers', customer)

const createCreditCard = (opts, _id, creditCard) => api.post(opts, `/customers/${_id}/fundinginstruments`, creditCard)

const removeCreditCard = (opts, _id) => api.remove(opts, `/fundinginstruments/${_id}`)

export default {
  getOne,
  getAll,
  create,
  getByQuery,
  createCreditCard,
  removeCreditCard
}
