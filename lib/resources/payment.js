import api from '../client/api'
import endpoints from '../client/endpoints'

const getOne = (opts, _id) => api.get(opts, '/payments', _id)

const create = (opts, orderId, payment) => api.post(opts, `/orders/${orderId}/payments`, payment)

const preAuthorizationCapture = (opts, _id) => api.post(opts, `/payments/${_id}/capture`)

const preAuthorizationCancel = (opts, _id) => api.post(opts, `/payments/${_id}/void`)

const _authorize = (opts, _id, amount) => api.get(opts, null, null, {customUrl: `${endpoints.sandbox.v2.authorizePaymentSimulationUrl}?payment_id=${_id}&amount${amount}`})

const refund = (opts, _id, refund) => api.post(opts, `/payments/${_id}/refunds`, refund)

const getRefunds = (opts, _id) => api.get(opts, `/payments/${_id}/refunds`)

export default {
  getOne,
  create,
  preAuthorizationCapture,
  preAuthorizationCancel,
  _authorize,
  refunds: {
    create: refund,
    get: getRefunds
  }
}
