<img src="https://user-images.githubusercontent.com/4432322/48435349-66f65b80-e763-11e8-9cb8-6dd8335e62d7.png" align="right" />

# Wirecard SDK Node
> The easiest way and fastest way to integrate Wirecard to your Node application
> Node.js module to integrate Wirecard v2 and subscriptions API

[![Build Status](https://travis-ci.org/moip/moip-sdk-node.svg?branch=master)](https://travis-ci.org/moip/moip-sdk-node)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Coverage Status](https://coveralls.io/repos/github/moip/moip-sdk-node/badge.svg?branch=master)](https://coveralls.io/github/moip/moip-sdk-node?branch=master)

**Summary**

- [Installing](#installing)
- [Getting started](#getting-started)
- [Wirecard v2 Examples](#wirecard-v2-examples):
  - [Customers](#customers)
    - [Create](#create)
    - [Get](#get)
    - [Query](#query)
    - [Add a credit card to a Customer](#add-a-credit-card-to-a-customer)
    - [Remove a credit card from a Customer](#remove-a-credit-card-from-a-customer)
    - [Get all](#get-all)
  - [Orders](#orders)
    - [Create](#create-1)
    - [Get](#get-1)
    - [Query](#query-1)
    - [Get all](#get-all-1)
  - [Payments](#payments)
    - [Create a credit card payment (using credit card hash)](#create-a-credit-card-payment-using-credit-card-hash)
    - [Create a Boleto payment](#create-a-boleto-payment)
    - [Create a payment with pre-authorization](#create-a-payment-with-pre-authorization)
    - [Create a payment with escrow](#create-a-payment-with-escrow)
    - [Capturing a payment with pre-authorization](#capturing-a-payment-with-pre-authorization)
    - [Canceling a payment with pre-authorization](#canceling-a-payment-with-pre-authorization)
    - [Releasing the escrow](#releasing-the-escrow)
    - [Get (details of a payment)](#get-details-of-a-payment)
  - [Refunds](#refunds)
    - [Create a payment refund](#create-a-payment-refund)
    - [Create a payment partial refund](#create-a-payment-partial-refund)
    - [Create an order refund](#create-an-order-refund)
    - [Get Refund](#get-refund)
    - [List Payment Refunds](#list-payment-refunds)
    - [List Order Refunds](#list-order-refunds)
  - [Notification Preferenes](#notification-preferences)
    -  [Create](#create-2)
    -  [Get](#get-2)
    -  [Remove](#remove)
    -  [Get all](#get-all-2)
  - [Wirecard Connect](#wirecard-connect)
    - [Ask for OAuth permission](#ask-for-oauth-permission)
    - [Generate access token OAuth](#generate-access-token-oauth)
  - [Multiorder](#multiorder)
    - [Create Multiorder](#create-multiorder)
    - [Get Multiorder](#get-multiorder)
  - [Multipayment](#multipayment)
    - [Create Multipayment](#create-multipayment)
    - [Get Multipayment](#get-multipayment)
  - [Account](#account)
    - [Create](#create-3)
    - [Get](#get-3)
    - [Check Existence](#check-existence)
  - [Bank Account](#bank-account)
    -  [Create](#create-4)
    -  [Get](#get-4)
    -  [Get all](#get-all-3)
    -  [Remove](#remove-1)
  - [Balance](#balance)
    - [Get balance](#get-balance)
  - [Transfers](#transfers)
	-  [Create transfer](#create-transfer)
    -  [Get transfer](#get-transfer)
    -  [Get all transfers](#get-all-transfers)
  - [Webhooks](#webhooks)
    -  [Get](#get-5)
    -  [Query](#query-2)
    -  [Get all](#get-all-4)
- [API Reference](#api-reference)
- [Useful Links](#useful-links)
- [License](#license)
- [Contributors](#contributors)
- [Slack Community](#slack-community-) [![Slack](https://user-images.githubusercontent.com/4432322/37355972-ba0e9f32-26c3-11e8-93d3-39917eb24109.png)](https://slackin-cqtchmfquq.now.sh)



# Installing

Npm:

```
npm install moip-sdk-node --save
```

# Getting started

[Prerequisite - Create an app (access token)](https://documentao-moip.readme.io/v2.0/reference#1-criar-um-app)

```javascript
const moip = require('moip-sdk-node').default({
  accessToken: 'your-access-token',
  // token: 'your-token',
  // key: 'your-key',
  production: false
})
```

If you are using **import** syntax:
```javascript
import moipSdk from 'moip-sdk-node'
const moip = moipSdk({
  accessToken: 'your-access-token',
  // token: 'your-token',
  // key: 'your-key',
  production: false
})
```

To authenticate using Basic authorization, you can pass a `token` and `key` as an argument instead of `accessToken`.

# Moip v2 Examples

## Customers
#### Create
```javascript
moip.customer.create({
    ownId: '1521656695',
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
        city: 'Sao Paulo',
        complement: '8',
        district: 'Itaim',
        street: 'Avenida Faria Lima',
        streetNumber: '2927',
        zipCode: '01234000',
        state: 'SP',
        country: 'BRA'
    }
}).then((response) => {
    console.log(response.body)
}).catch((err) => {
    console.log(err)
})
```

#### Get
```javascript
moip.customer.getOne(customerId)
    .then((response) => {
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
```

#### Query
```javascript
// query example
// See https://dev.moip.com.br/reference#filtros-de-busca
const queryObj = {
  limit: 14,
  offset: 0
}
moip.customer.query(queryObj)
    .then((response) => {
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
```

#### Add a credit card to a Customer
```javascript
moip.customer.createCreditCard(customerId, {
    method: "CREDIT_CARD",
    creditCard: {
        expirationMonth: "05",
        expirationYear: "22",
        number: "5555666677778884",
        cvc: "123",
        holder: {
            fullname: "Jose Portador da Silva",
            birthdate: "1988-12-30",
            taxDocument: {
                type: "CPF",
                number: "33333333333"
            },
            phone: {
                countryCode: "55",
                areaCode: "11",
                number: "66778899"
            }
        }
    }
}).then((response) => {
    console.log(response.body)
}).catch((err) => {
    console.log(err)
})
```

#### Remove a credit card from a Customer
```javascript
moip.customer.removeCreditCard(creditcardId)
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```

#### Get all
```javascript
moip.customer.getAll()
    .then((response) => {
        console.log(response.body)
    }).catch((err) => {
        console.log(err)
    })
```

## Orders
#### Create

```javascript
moip.order.create({
    ownId: '1521656695',
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
        ownId: '1521656726',
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
}).then((response) => {
    console.log(response.body)
}).catch((err) => {
    console.log(err)
})
```
#### Get
```javascript
moip.order.getOne('ORD-SFGB23X8WAVQ')
    .then((response) => {
        console.log(response.body)
    }).catch((err) => {
        console.log(err)
    })
```

#### Query
```javascript
// query example
// See https://dev.moip.com.br/reference#filtros-de-busca
const objQuery = {
  limit: 15,
  offset: 0,
  filters: {
    status: {
      in: 'PAID,WAITING'
    }
  }
}

moip.order.query(objQuery)
    .then((response) => {
        console.log(response.body)
    }).catch((err) => {
        console.log(err)
    })
```

#### Get all
```javascript
moip.order.getAll()
    .then((response) => {
        console.log(response)
    }).then((err) => {
        console.log(err)
    })
```

## Payments

#### Create a credit card payment (using credit card hash)

```javascript
moip.payment.create('ORD-SFGB23X8WAVQ', {
    installmentCount: 1,
    fundingInstrument: {
        method: 'CREDIT_CARD',
        creditCard: {
            hash: 'Credit Card HASH -> generated using the JS encryption SDK',
            holder: {
                fullname: 'Jose Santos',
                birthdate: '1980-01-02',
                taxDocument: {
                    type: 'CPF',
                    number: '12345679891'
                },
                phone: {
                    countryCode: '55',
                    areaCode: '11',
                    number: '25112511'
                }
            }
        }
    }
}).then((response) => {
    console.log(response.body)
}).catch((err) => {
    console.log(err)
})
```

#### Create a Boleto payment

```javascript
moip.payment.create('ORD-SFGB23X8WAVQ', {
    installmentCount: 1,
    fundingInstrument: {
        method: "BOLETO",
        boleto: {
            expirationDate: "2017-09-30",
            instructionLines: {
                first: "Primeira linha do boleto",
                second: "Segunda linha do boleto",
                third: "Terceira linha do boleto"
            },
            logoUri: "https://sualoja.com.br/logo.jpg"
        }
    }
}).then((response) => {
    console.log(response.body)
}).catch((err) => {
    console.log(err)
})
```

#### Create a payment with pre-authorization

To create a payment with pre-authorization you only have to add a `delayCapture` attribute to any payment method (credit card, boleto or online bank debit). See the example below with a credit card payment:
```javascript
moip.payment.create('ORD-SFGB23X8WAVQ', {
    installmentCount: 1,
    delayCapture: true,
    fundingInstrument: {
        method: 'CREDIT_CARD',
        creditCard: {
            hash: 'Credit Card HASH -> generated using the JS encryption SDK',
            holder: {
                fullname: 'Jose Santos',
                birthdate: '1980-01-02',
                taxDocument: {
                    type: 'CPF',
                    number: '12345679891'
                },
                phone: {
                    countryCode: '55',
                    areaCode: '11',
                    number: '25112511'
                }
            }
        }
    }
}).then((response) => {
    console.log(response.body)
}).catch((err) => {
    console.log(err)
})
```

#### Create a payment with escrow

To create a payment with escrow you only have to add the node `escrow` with an attribute `description`:
```javascript
moip.payment.create('ORD-SFGB23X8WAVQ', {
    installmentCount: 1,
    escrow: {
        description: 'Teste escrow'
    },
    fundingInstrument: {
        method: 'CREDIT_CARD',
        creditCard: {
            hash: 'Credit Card HASH -> generated using the JS encryption SDK',
            holder: {
                fullname: 'Jose Santos',
                birthdate: '1980-01-02',
                taxDocument: {
                    type: 'CPF',
                    number: '12345679891'
                },
                phone: {
                    countryCode: '55',
                    areaCode: '11',
                    number: '25112511'
                }
            }
        }
    }
}).then((response) => {
    console.log(response.body)
}).catch((err) => {
    console.log(err)
})
```


#### Capturing a payment with pre-authorization

```javascript
moip.payment.preAuthorizationCapture('PAY-6PYBC8E93M2L')
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```

#### Canceling a payment with pre-authorization

```javascript
moip.payment.preAuthorizationCancel('PAY-6PYBC8E93M2L')
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```

### Releasing the escrow
```javascript
moip.escrow.release('ECW-6SCRX0LE4PPW')
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```

#### Get (details of a payment)
```javascript
moip.payment.getOne('PAY-6PYBC8E93M2L')
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```

## Refunds

#### Create a payment refund
```javascript
moip.payment.refunds.create('PAY-3GALBSZIUSBE')
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```

#### Create a payment partial refund
```javascript
moip.payment.refunds.create('PAY-3GALBSZIUSBE', {
    amount: 100
}).then((response) => {
    console.log(response)
}).catch((err) => {
    console.log(err)
})
```

#### Create an order refund
```javascript
moip.order.refunds.create('ORD-4GALBSZIUSBE')
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```

#### Get Refund
```javascript
moip.refund.get('REF-1HI7RBLWH0CZ')
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```

#### List Payment Refunds
```javascript
moip.payment.refunds.get('PAY-3GALBSZIUSBE')
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```

#### List Order Refunds
```javascript
moip.order.refunds.get('ORD-4GALBSZIUSBE')
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```


## Notification Preferences
#### Create
```javascript
moip.notification.create({
    events: [
        'ORDER.*',
        'PAYMENT.AUTHORIZED',
        'PAYMENT.CANCELLED'
    ],
    target: 'https://requestb.in/17ndz451',
    media: 'WEBHOOK'
}).then((response) => {
    console.log(response.body)
}).catch((err) => {
    console.log(err)
})
```

#### Get
```javascript
moip.notification.getOne('NPR-1231231231')
    .then((response) => {
        console.log(response.body)
    })
```

#### Remove
```javascript
moip.notification.remove('NPR-1231231231')
    .then((response) => {
        console.log(response)
    })
```

#### Get all
```javascript
moip.notification.getAll()
    .then((response) => {
        console.log(response.body)
    })
```


## Wirecard Connect
#### Ask for OAuth permission

To ask for OAuth permission for a merchant, you need to redirect them to a page in which they will log in with their Moip credentials to authorize your access to their account.

The complete list of available scopes for permission is available [in our official documentation here](https://dev.wirecard.com.br/v2.0/reference#section-scopes-dispon%C3%ADveis).
```javascript
moip.connect.getAuthorizeUrl({
    clientId: 'APP-XXXXXXXXXXXX',
    redirectUri: 'https://url_registered.in.yourapp',
    scopes: ['RECEIVE_FUNDS', 'REFUND']
}).then((url) => {
    console.log(url)
}).catch((err) => {
    console.log(err)
})
```

#### Generate access token OAuth

Once the merchant has given you permission, you need to generate their `access token` from the code returned to your `redirect_uri`.

```javascript
moip.connect.generateToken({
    clientId: 'APP-XXXXXXXXXXXX',
    redirectUri: 'https://url_registered.in.yourapp',
    clientSecret: 'the secret token returned when you created your APP',
    grantType: 'authorization_code',
    code: 'the code returned to your redirect_uri after seller authorized'
}).then((response) => {
    console.log(response)
}).catch((err) => {
    console.log(err)
})
```

## Multiorder

#### Create Multiorder
```javascript
moip.multiorder.create({
    ownId: 'your_own_id',
    orders: [
        {
            ownId: 'your_own_id',
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
                    type: 'PRIMARY',
                    moipAccount: {
                        id: 'MPA-VB5OGTVPCI52'
                    }
                }
            ]
        },
        {
            ownId: 'your_own_id',
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
                    type: 'PRIMARY',
                    moipAccount: {
                        id: 'MPA-IFYRB1HBL73Z'
                    }
                },
                {
                    type: 'SECONDARY',
                    feePayor: false,
                    moipAccount: {
                        id: 'MPA-KQB1QFWS6QNM'
                    },
                    amount: {
                        fixed: 55
                    }
                }
            ]
        }
    ]
})
.then((response) => {
    console.log(response)
}).catch((err) => {
    console.log(err)
})
```

#### Get Multiorder

```javascript
moip.multiorder.getOne('MOR-NUU8VMJ0QPUP')
      .then((response) => {
          console.log(response)
      }).catch((err) => {
          console.log(err)
      })
```

## Multipayment

#### Create Multipayment

```javascript
moip.multipayment.create('MOR-NUU8VMJ0QPUP', {
    installmentCount: 1,
    fundingInstrument: {
        method: 'CREDIT_CARD',
        creditCard: {
            hash: 'Credit Card HASH -> generated using the JS encryption SDK',
            holder: {
                fullname: 'Jose Santos',
                birthdate: '1980-01-02',
                taxDocument: {
                    type: 'CPF',
                    number: '12345679891'
                },
                phone: {
                    countryCode: '55',
                    areaCode: '11',
                    number: '25112511'
                }
            }
        }
    }
}).then((response) => {
    console.log(response.body)
}).catch((err) => {
    console.log(err)
})
```

#### Get Multipayment

```javascript
moip.multipayment.getOne('MPY-6W6DILA4BZ1X')
      .then((response) => {
          console.log(response)
      }).catch((err) => {
          console.log(err)
      })
```

## Account

#### Create
```javascript
moip.account.create({
    email: {
        address: "dev.moip@labs.moip.com.br"
    },
    person: {
        name: "Runscope",
        lastName: "Random 9123",
        taxDocument: {
            type: "CPF",
            number: "123.456.798-91"
        },
        identityDocument: {
            type : "RG",
            number: "434322344",
            issuer: "SSP",
            issueDate: "2000-12-12"
        },
        birthDate: "1990-01-01",
        phone: {
            countryCode: "55",
            areaCode: "11",
            number: "965213244"
        },
        address: {
            street: "Av. Brigadeiro Faria Lima",
            streetNumber: "2927",
            district: "Itaim",
            zipCode: "01234-000",
            city: "São Paulo",
            state: "SP",
            country: "BRA"
        }
    },
    type: "MERCHANT",
    transparentAccount: false
}).then((response) => {
    console.log(response.body)
}).catch((err) => {
    console.log(err)
})
```

#### Get
```javascript
moip.account.getOne(accountId)
    .then((response) => {
        console.log(response.body)
    })
    .catch((err) => {
        console.log(err)
    })
```

#### Check Existence
Verify if an account already exists through the `e-mail` or `tax document`
```javascript
moip.account.exists({
    email: 'integracao@labs.moip.com.br'
    // tax_document: 880.956.367-03
    }).then(() => {
        console.log('If here, the account exists')
    }).catch(() => {
        console.log('If here, the account does not exist')
    })
```

## Bank Account
#### Create
```javascript
moip.bankAccount.create(moipAccountId, {
    bankNumber: "237",
    agencyNumber: "12345",
    agencyCheckNumber: "0",
    accountNumber: "12345678",
    accountCheckNumber: "7",
    type: "CHECKING",
    holder: {
        taxDocument: {
            type: "CPF",
            number: "622.134.533-22"
        },
        fullname: "Demo Moip"
    }
}).then((response) => {
    console.log(response.body)
}).catch((response) => {
    console.log(response.body)
})
```

#### Get
```javascript
moip.bankAccount.getOne(bankAccountId)
    .then((response) => {
        console.log(response.body)
    }).catch((err) => {
        console.log(err)
    })
```

#### Get all
```javascript
moip.bankAccount.getAll(moipAccountId)
    .then((response) => {
        console.log(response.body)
    }).catch((err) => {
        console.log(err)
    })
```

#### Remove
```javascript
moip.bankAccount.remove(bankAccountId)
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```

## Balance
#### Get balance
```javascript
moip.balance.getOne()
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```

## Transfers
#### Create transfer
```javascript
moip.transfer.create({
    amount: 500,
    transferInstrument: {
        method: "BANK_ACCOUNT",
        bankAccount: {
            type: "CHECKING",
            bankNumber: 1,
            agencyNumber: 1111,
            agencyCheckNumber: 2,
            accountNumber: 9999,
            accountCheckNumber: 8,
            holder: {
                fullname: "Nome do Portador",
                taxDocument: {
                    type: "CPF",
                    number: "22222222222"
                }
            }
        }
    }
}).then((response) => {
    console.log(response.body)
}).catch((response) => {
    console.log(response.body)
})
```

#### Get transfer
```javascript
moip.transfer.getOne(transferId)
    .then((response) => {
        console.log(response.body)
    }).catch((err) => {
        console.log(err)
    })
```

#### Get all transfers
```javascript
moip.transfer.getAll()
    .then((response) => {
        console.log(response.body)
    }).catch((err) => {
        console.log(err)
    })
```

## Webhooks

#### Get
```javascript
moip.webhook.getOne(webhookId)
    .then((response) => {
        console.log(response.body)
    }).catch((err) => {
        console.log(err)
    })
```

#### Query
```javascript
//query example
// See https://dev.moip.com.br/reference#consultar-webhook-enviado
const queryObj = {
  limit: 4,
  offset: 0,
  event: 'ORDER.CREATED'
  resourceId: 'the_resource_id'
}
moip.webhook.query(queryObj)
    .then((response) => {
        console.log(response.body)
    }).catch((err) => {
        console.log(err)
    })
```

#### Get all
```javascript
moip.webhook.getAll()
    .then((response) => {
        console.log(response.body)
    }).catch((err) => {
        console.log(err)
    })
```

## API Reference

[Official API Reference](https://dev.moip.com.br/v2.0/reference)

[Official Documentation](https://dev.moip.com.br/docs)

## Useful Links

[Credit card test numbers](https://dev.moip.com.br/docs/numeros-de-cartoes-para-teste)

[Simulating different payment statuses](https://dev.moip.com.br/docs/simulando-diferentes-status-de-pagamento)

[Search filters](https://dev.moip.com.br/reference#filtros-de-busca)


## License

[The MIT License](https://github.com/moip/moip-sdk-node/blob/master/LICENSE)

## Contributors

- [Igor Lopes](https://github.com/Igor-Lopes)
- [Daniel Leonardo](https://github.com/danielfnz)
- [Luiz Fernando](https://github.com/lfernando-silva)
- [Karl Alexander](https://github.com/karlsmarx)

## Slack Community [![Slack](https://user-images.githubusercontent.com/4432322/37355972-ba0e9f32-26c3-11e8-93d3-39917eb24109.png)](https://slackin-cqtchmfquq.now.sh)

Have any question? Join us on [Slack](https://slackin-cqtchmfquq.now.sh/)!
