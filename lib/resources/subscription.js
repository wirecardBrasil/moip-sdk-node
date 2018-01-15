import api from '../client/api'

const getOne = (code) => {
  return api.get(`/subscriptions/${code}`);
};

const getAll = () => {
  return api.get('/subscriptions')
};

const create = (subscription, opts) => {
  return api.post('/subscriptions', subscription, opts);
};

const update = (code, subscription) => {
  return api.put(`/subscriptions/${code}`, subscription);
};

const updatePaymentMethod = (code, paymentMethod) => {
  return api.put(`/subscriptions/${code}/change_payment_method`, paymentMethod);
};

const suspend = (code) => {
  return api.put(`/subscriptions/${code}/suspend`);
};

const activate = (code) => {
  return api.put(`/subscriptions/${code}/activate`);
};

const cancel = (code) => {
  return api.put(`/subscriptions/${code}/cancel`);
};

const getOneInvoice = (_id) => {
  return api.get(`/invoices/${_id}`)
};

const getAllInvoices = (code) => {
  return api.get(`/subscriptions/${code}/invoices`)
};

const getOnePayment = (_id) => {
  return api.get(`/payments/${_id}`)
};

const getAllPayments = (_id) => {
  return api.get(`/invoices/${_id}/payments`)
};

const createNotification = (notification) => {
  return api.post('/users/preferences', notification);
};

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
