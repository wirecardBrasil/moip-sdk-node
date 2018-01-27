import api from '../client/api'

const release = (opts, _id) => {
  return api.post(opts, `/escrows/${_id}/release`, null)
}

export default {
  release
}
