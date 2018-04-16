import api from '../client/api'
import endpoints from '../client/endpoints'

const getOne = (opts, _id) => api.get(opts, null, null, {customUrl: `${endpoints[opts.env].v2.url}/webhooks?resourceId=${_id}`})

const getAll = (opts) => api.get(opts, '/webhooks')

export default {
  getOne,
  getAll
}
