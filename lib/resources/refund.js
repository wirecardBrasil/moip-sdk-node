import api from '../client/api'
import endpoints from '../client/endpoints'

const get = (opts, _id) => {
  return api.get(opts, '/refunds', _id)
}

export default {
  get
}
