import api from '../client/api'
import endpoints from '../client/endpoints'
import {formatFilters} from '../utils'

const getOne = (opts, _id) => api.get(opts, null, null, {customUrl: `${endpoints[opts.env].v2.url}/webhooks?resourceId=${_id}`})

const getByQuery = (opts, _query) => api.get(opts, '/webhooks', null, null, Object.assign(_query, {filters: formatFilters(_query.filters)}))

const getAll = (opts) => api.get(opts, '/webhooks')

export default {
  getOne,
  getByQuery,
  getAll
}
