import api from '../client/api'
import {getQuerystring} from '../utils'

const create = (opts, account) => api.post(opts, '/accounts', account)

const getOne = (opts, _id) => api.get(opts, '/accounts', _id)

const exists = (opts, _query) => api.get(opts, '/accounts/exists', null, null, getQuerystring(_query))

export default {
  create,
  getOne,
  exists
}
