import api from '../client/api_assinaturas'

const getOne = (opts, _code) => {
  return api.get(opts, `/coupons/${_code}`)
}

const getAll = (opts) => {
  return api.get(opts, '/coupons')
}

const create = (opts, coupon) => {
  return api.post(opts, '/coupons', coupon)
}

const associate = (opts, _code, coupon) => {
  return api.put(opts, `/subscriptions/${_code}`, coupon)
}

const activate = (opts, _code) => {
  return api.put(opts, `/coupons/${_code}/active`)
}

const inactivate = (opts, _code) => {
  return api.put(opts, `/coupons/${_code}/inactive`)
}

export default {
  getOne,
  getAll,
  create,
  associate,
  activate,
  inactivate
}
