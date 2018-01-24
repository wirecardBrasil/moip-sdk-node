import api from '../client/api'

const getOne = (_code) => {
  return api.get(`/plans/${_code}`);
};

const getAll = () => {
  return api.get('/plans')
};

const create = (plan) => {
  return api.post('/plans', plan);
};

const activate = (_code) => {
  return api.put(`/plans/${_code}/activate`);
};

const inactivate = (_code) => {
  return api.put(`/plans/${_code}/inactivate`);
};

const update = (_code, plan) => {
  return api.put(`/plans/${_code}`, plan);
};

export default {
  getOne,
  getAll,
  create,
  activate,
  inactivate,
  update
}
