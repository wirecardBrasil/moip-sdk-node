import api from '../client/api_assinaturas'

const getOne = (opts, _code) => api.get(opts, `/subscriptions/${_code}`)

const getAll = (opts) => api.get(opts, '/subscriptions')

const create = (opts, subscription, config) => api.post(opts, '/subscriptions', subscription, config)

const update = (opts, _code, subscription) => api.put(opts, `/subscriptions/${_code}`, subscription)

const updatePaymentMethod = (opts, _code, paymentMethod) => api.put(opts, `/subscriptions/${_code}/change_payment_method`, paymentMethod)

const suspend = (opts, _code) => api.put(opts, `/subscriptions/${_code}/suspend`)

const activate = (opts, _code) => api.put(opts, `/subscriptions/${_code}/activate`)

const cancel = (opts, _code) => api.put(opts, `/subscriptions/${_code}/cancel`)

const getOneInvoice = (opts, _id) => api.get(opts, `/invoices/${_id}`)

const getAllInvoices = (opts, _code) => api.get(opts, `/subscriptions/${_code}/invoices`)

const getOnePayment = (opts, _id) => api.get(opts, `/payments/${_id}`)

const getAllPayments = (opts, _id) => api.get(opts, `/invoices/${_id}/payments`)

const createNotification = (opts, notification) => api.post(opts, '/users/preferences', notification)

export default {
  getOne,
  getAll,
  create,
  update,
  updatePaymentMethod,
  suspend,
  activate,
  cancel,
  getOneInvoice,
  getAllInvoices,
  getOnePayment,
  getAllPayments,
  createNotification
}
