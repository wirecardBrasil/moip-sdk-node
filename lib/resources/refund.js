import api from '../client/api'

const get = (opts, _id) => api.get(opts, '/refunds', _id)

export default {
  get
}
