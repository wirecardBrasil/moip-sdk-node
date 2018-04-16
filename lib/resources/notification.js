import api from '../client/api'

const getOne = (opts, _id) => api.get(opts, '/preferences/notifications', _id)

const getAll = (opts) => api.get(opts, '/preferences/notifications')

const create = (opts, preferences) => api.post(opts, '/preferences/notifications', preferences)

const remove = (opts, _id) => api.remove(opts, `/preferences/notifications/${_id}`)

export default {
  getOne,
  getAll,
  create,
  remove
}
