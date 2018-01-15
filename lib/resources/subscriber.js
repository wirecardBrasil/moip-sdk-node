
import api from '../client/api'

const getOne = (code) => {
  return api.get(`/customers/${code}`);
};

const getAll = () => {
  return api.get('/customers')
};

const create = (subscriber, opts) => {
  return api.post('/customers', subscriber, opts);
};

const update = (code, subscriber) => {
  return api.put(`/customers/${code}`, subscriber);
};

const updateBilling = (code, billingInfo) => {
  return api.put(`/customers/${code}/billing_infos`, billingInfo);
};

export default {
  getOne,
  getAll,
  create,
  update,
  updateBilling
}
