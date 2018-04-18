import api from '../client/api'

const getOne = (opts, _id) => api.get(opts, '/multipayments', _id)

const create = (opts, multiorderId, multipayment) => api.post(opts, `/multiorders/${multiorderId}/multipayments`, multipayment)

const preAuthorizationCapture = (opts, _id) => api.post(opts, `/multipayments/${_id}/capture`)

const preAuthorizationCancel = (opts, _id) => api.post(opts, `/multipayments/${_id}/void`)

export default {
  getOne,
  create,
  preAuthorizationCapture,
  preAuthorizationCancel
}
