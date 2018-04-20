import api from '../client/api'

const getOne = (opts, _id) => api.get(opts, '/multiorders', _id)

const create = (opts, multiorder) => api.post(opts, '/multiorders', multiorder)

export default {
  getOne,
  create
}
