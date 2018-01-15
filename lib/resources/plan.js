import api from '../client/api'

const getOne = (code) => {
  return api.get(`/plans/${code}`);
};

const getAll = () => {
  return api.get('/plans')
};

const create = (plan) => {
  return api.post('/plans', plan);
};

const activate = (code) => {
  return api.put(`/plans/${code}/activate`);
};

const inactivate = (code) => {
  return api.put(`/plans/${code}/inactivate`);
};

const update = (code, plan) => {
  return api.put(`/plans/${code}`, plan);
};

export default {
  getOne,
  getAll,
  create,
  activate,
  inactivate,
  update
}
