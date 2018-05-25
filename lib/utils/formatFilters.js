import qs from 'querystring'
import _ from 'lodash'

const formatField = field => `(${field})`

const formatFilter = filter => _.mapValues(filter, formatField)

const stringify = (queryObj, sep = '|', eq = '::') => qs.unescape(qs.stringify(queryObj, sep, eq))

const formatFilters = (filters) => stringify(_.mapValues(filters, filter => stringify(formatFilter(filter))))

export default formatFilters
