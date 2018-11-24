import api from '../client/api'

const getOne = (opts, _id) => api.get(opts, '/transfers', _id)

const getAll = (opts) => api.get(opts, '/transfers')

const reverse = (opts, _id) => api.post(opts, `/transfers/${_id}/reverse`)

const create = (opts, transfer) => api.post(opts, '/transfers', transfer)

export default {
  getOne,
  getAll,
  reverse,
  create
}
