import api from '../client/api'

const create = (opts, account) => api.post(opts, '/accounts', account)

const getOne = (opts, _id) => api.get(opts, '/accounts', _id)

export default {
  create,
  getOne
}
