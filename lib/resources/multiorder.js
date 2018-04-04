import api from '../client/api'

const getOne = (opts, _id) => {
  return api.get(opts, '/multiorders', _id)
}

const create = (opts, multiorder) => {
  return api.post(opts, '/multiorders', multiorder)
}

export default {
  getOne,
  create
}
