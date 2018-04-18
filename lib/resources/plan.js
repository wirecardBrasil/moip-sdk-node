import api from '../client/api_assinaturas'

const getOne = (opts, _code) => api.get(opts, `/plans/${_code}`)

const getAll = (opts) => api.get(opts, '/plans')

const create = (opts, plan) => api.post(opts, '/plans', plan)

const activate = (opts, _code) => api.put(opts, `/plans/${_code}/activate`)

const inactivate = (opts, _code) => api.put(opts, `/plans/${_code}/inactivate`)

const update = (opts, _code, plan) => api.put(opts, `/plans/${_code}`, plan)

export default {
  getOne,
  getAll,
  create,
  activate,
  inactivate,
  update
}
