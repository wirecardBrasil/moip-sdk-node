
import api from '../client/api'

const getOne = (_code) => {
  return api.get(`/customers/${_code}`);
};

const getAll = () => {
  return api.get('/customers')
};

const create = (subscriber, opts) => {
  return api.post('/customers', subscriber, opts);
};

const update = (_code, subscriber) => {
  return api.put(`/customers/${_code}`, subscriber);
};

const updateBilling = (_code, billingInfo) => {
  return api.put(`/customers/${_code}/billing_infos`, billingInfo);
};

export default {
  getOne,
  getAll,
  create,
  update,
  updateBilling
}
