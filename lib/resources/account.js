import api from '../client/api'

const create = (opts, account) => {
  return api.post(opts, '/accounts', account)
}

const getOne = (opts, _id) => {
  return api.get(opts, '/accounts', _id)
}

export default {
  create,
  getOne
}
