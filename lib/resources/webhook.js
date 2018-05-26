import api from '../client/api'
import endpoints from '../client/endpoints'
import {getQuerystring} from '../utils'

const getOne = (opts, _id) => api.get(opts, null, null, {customUrl: `${endpoints[opts.env].v2.url}/webhooks?resourceId=${_id}`})

const query = (opts, _query) => api.get(opts, '/webhooks', null, null, getQuerystring(_query))

const getAll = (opts) => api.get(opts, '/webhooks')

export default {
  getOne,
  query,
  getAll
}
