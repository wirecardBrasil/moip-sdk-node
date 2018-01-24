import api from '../client/api'

const getOne = (_code) => {
  return api.get(`/coupons/${_code}`);
};

const getAll = () => {
  return api.get('/coupons')
};

const create = (coupon) => {
  return api.post('/coupons', coupon);
};

const associate = (_code, coupon) => {
  return api.put(`/subscriptions/${_code}`, coupon);
};

const activate = (_code) => {
  return api.put(`/coupons/${_code}/activate`);
};

const inactivate = (_code) => {
  return api.put(`/coupons/${_code}/inactivate`);
};

export default {
  getOne,
  getAll,
  create,
  associate,
  activate,
  inactivate
}