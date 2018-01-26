import api from '../client/api_assinaturas'

const getOne = (opts, _code) => {
  return api.get(opts, `/plans/${_code}`)
}

const getAll = (opts) => {
  return api.get(opts, '/plans')
}

const create = (opts, plan) => {
  return api.post(opts, '/plans', plan)
}

const activate = (opts, _code) => {
  return api.put(opts, `/plans/${_code}/activate`)
}

const inactivate = (opts, _code) => {
  return api.put(opts, `/plans/${_code}/inactivate`)
}

const update = (opts, _code, plan) => {
  return api.put(opts, `/plans/${_code}`, plan)
}

export default {
  getOne,
  getAll,
  create,
  activate,
  inactivate,
  update
}
