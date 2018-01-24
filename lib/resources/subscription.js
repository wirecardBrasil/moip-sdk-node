import api from '../client/api'

const getOne = (_code) => {
  return api.get(`/subscriptions/${_code}`);
};

const getAll = () => {
  return api.get('/subscriptions')
};

const create = (subscription, opts) => {
  return api.post('/subscriptions', subscription, opts);
};

const update = (_code, subscription) => {
  return api.put(`/subscriptions/${_code}`, subscription);
};

const updatePaymentMethod = (_code, paymentMethod) => {
  return api.put(`/subscriptions/${_code}/change_payment_method`, paymentMethod);
};

const suspend = (_code) => {
  return api.put(`/subscriptions/${_code}/suspend`);
};

const activate = (_code) => {
  return api.put(`/subscriptions/${_code}/activate`);
};

const cancel = (_code) => {
  return api.put(`/subscriptions/${_code}/cancel`);
};

const getOneInvoice = (_id) => {
  return api.get(`/invoices/${_id}`)
};

const getAllInvoices = (_code) => {
  return api.get(`/subscriptions/${_code}/invoices`)
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
