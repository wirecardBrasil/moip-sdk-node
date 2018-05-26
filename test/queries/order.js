module.exports = {
  limit: 15,
  offset: 0,
  filters: {
    status: {
      in: 'PAID,WAITING'
    }
  }
}
