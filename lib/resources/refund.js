import api from '../client/api'

const get = (opts, _id) => {
  return api.get(opts, '/refunds', _id)
}

export default {
  get
}
