import qs from 'query-string'
import nqs from 'querystring'
import _ from 'lodash'

const formatField = (field, key) => `${key}(${field})`

const formatFilter = filter => _.map(filter, formatField)

const stringify = (queryObj, sep = '|', eq = '::') =>
  nqs.unescape(qs.stringify(queryObj)).replace(/&/g, sep).replace(/=/g, eq)

const getFiltersQuerystring = (filters) =>
  _.mapValues(filters, (filter, key) =>
    stringify({[key]: formatFilter(filter)}))

const formatQueryStringFilters = filters =>
  _.toArray(getFiltersQuerystring(filters)).join('&')

const getQuerystring = _query =>
  _query && stringify(Object.assign(_query, _query.filters && {filters: formatQueryStringFilters(_query.filters)}), '&', '=')

export default getQuerystring
