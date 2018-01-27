'use strict';

module.exports = {
  amount: {
    currency: 'BRL',
    subtotals: {
      shipping: 1000
    }
  },
  items: [{
    product: 'Descrição do pedido',
    quantity: 1,
    detail: 'Mais info...',
    price: 1000
  }],
  customer: {
    fullname: 'Jose Silva',
    email: 'jose_silva0@email.com',
    birthDate: '1988-12-30',
    taxDocument: {
      type: 'CPF',
      number: '22222222222'
    },
    phone: {
      countryCode: '55',
      areaCode: '11',
      number: '66778899'
    },
    shippingAddress: {
      street: 'Avenida Faria Lima',
      streetNumber: 2927,
      complement: 8,
      district: 'Itaim',
      city: 'Sao Paulo',
      state: 'SP',
      country: 'BRA',
      zipCode: '01234000'
    }
  }
};