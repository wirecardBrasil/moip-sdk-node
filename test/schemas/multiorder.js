module.exports = {
  orders: [
    {
      amount: {
        currency: 'BRL',
        subtotals: {
          shipping: 2000
        }
      },
      items: [
        {
          product: 'Camisa Verde e Amarelo - Brasil',
          quantity: 1,
          detail: 'Seleção Brasileira',
          price: 2000
        }
      ],
      customer: {
        fullname: 'Joao Sousa',
        email: 'joao.sousa@email.com',
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
      },
      receivers: [
        {
          moipAccount: {
            id: 'MPA-VB5OGTVPCI52'
          },
          type: 'PRIMARY'
        }
      ]
    },
    {
      amount: {
        currency: 'BRL',
        subtotals: {
          shipping: 3000
        }
      },
      items: [
        {
          product: 'Camisa Preta - Alemanha',
          quantity: 1,
          detail: 'Camiseta da Copa 2014',
          price: 1000
        }
      ],
      customer: {
        fullname: 'Joao Sousa',
        email: 'joao.sousa@email.com',
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
      },
      receivers: [
        {
          moipAccount: {
            id: 'MPA-IFYRB1HBL73Z'
          },
          type: 'PRIMARY'
        },
        {
          moipAccount: {
            id: 'MPA-KQB1QFWS6QNM'
          },
          type: 'SECONDARY',
          feePayor: false,
          amount: {
            fixed: 55
          }
        }
      ]
    }
  ]
}
