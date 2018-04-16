import api from '../client/api_assinaturas'

const getOne = (opts, _code) => api.get(opts, `/coupons/${_code}`)

const getAll = (opts) => api.get(opts, '/coupons')

const create = (opts, coupon) => api.post(opts, '/coupons', coupon)

const associate = (opts, _code, coupon) => api.put(opts, `/subscriptions/${_code}`, coupon)

const activate = (opts, _code) => api.put(opts, `/coupons/${_code}/active`)

const inactivate = (opts, _code) => api.put(opts, `/coupons/${_code}/inactive`)

export default {
  getOne,
  getAll,
  create,
  associate,
  activate,
  inactivate
}
