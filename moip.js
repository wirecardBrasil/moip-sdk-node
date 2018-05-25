const moip = require('./dist').default({
    token: '0DCSC1IXTG5KJAZRDU3JAZUNMP7VFARD',
    key: 'Q4ZDN7WEMEVNKTBEN4R8GXTZ0SSZGMOYDWZ10JUJ',
    production: false,
});

const getOrder = () => moip.order.getByQuery({
  limit: 100,
  offset: 10,
  filters: {
    createdAt: {
      bt: '2017-10-10T13:07:00Z,2017-10-25T13:08:00Z',
      gt: 5
    },
    status: {
      in: 'PAID,WAITING'
    }
  }
});

return getOrder().then((result) => {
    console.log(result.body)
}).catch(err => {
    console.log(err.body)
});
