import api from '../client/api'

const getOne = (code) => {
  return api.get(`/coupons/${code}`);
};

const getAll = () => {
  return api.get('/coupons')
};

const create = (coupon) => {
  return api.post('/coupons', coupon);
};

const associate = (code, coupon) => {
  return api.put(`/subscriptions/${code}`, coupon);
};

const activate = (code) => {
  return api.put(`/coupons/${code}/activate`);
};

const inactivate = (code) => {
  return api.put(`/coupons/${code}/inactivate`);
};

export default {
  getOne,
  getAll,
  create,
  associate,
  activate,
  inactivate
}