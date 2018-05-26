module.exports = {
  limit: 100,
  offset: 10,
  filters: {
    status: {
      in: 'PAID,WAITING'
    }
  }
}
