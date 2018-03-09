<img src="https://gist.githubusercontent.com/joaolucasl/00f53024cecf16410d5c3212aae92c17/raw/1789a2131ee389aeb44e3a9d5333f59cfeebc089/moip-icon.png" align="right" />

# Moip SDK Node
> The easiest way and fastest way to integrate Moip to your Node application
> Node.js module to integrate Moip v2 and subscriptions API 

[![Build Status](https://travis-ci.org/moip/moip-sdk-node.svg?branch=master)](https://travis-ci.org/moip/moip-sdk-node)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Coverage Status](https://coveralls.io/repos/github/moip/moip-sdk-node/badge.svg?branch=master)](https://coveralls.io/github/moip/moip-sdk-node?branch=master)

**Summary**

- [Installing](#installing)
- [Getting started](#getting-started)
- [Moip v2 Examples](#moip-v2-examples):
  - [Customers](#customers)
    - [Create](#create)
    - [Get](#get)
    - [Add a credit card to a Customer](#add-a-credit-card-to-a-customer)
    - [Remove a credit card from a Customer](#remove-a-credit-card-from-a-customer)
    - [Get all](#get-all)
  - [Orders](#orders)
    - [Create](#create-1)
    - [Get](#get-1)
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
    - [Create an order refund](#create-an-order-refund)
  - [Notification Preferenes](#notification-preferences)
    -  [Create](#create-2)
    -  [Get](#get-2)
    -  [Remove](#remove)
    -  [Get all](#get-all-2)
  - [Moip Connect](#moip-connect)
    - [Ask for OAuth permission](#ask-for-oauth-permission)
    - [Generate access token OAuth](#generate-access-token-oauth)
  - [Moip Account](#moip-account)
    - [Create](#create-3)
    - [Get](#get-3)
  - [Bank Account](#bank-account)
    -  [Create](#create-4)
    -  [Get](#get-4)
    -  [Get all](#get-all-3)
    -  [Remove](#remove-1)
- [API Reference](#api-reference)
- [Useful Links](#useful-links)
- [License](#license)
- [Contributors](#contributors)


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
  production: false
})
```

If you are using **import** syntax:
```javascript
import moipSdk from 'moip-sdk-node'
const moip = moipSdk({
  accessToken: 'your-access-token',
  production: false
})
```

To authenticate using Basic authorization, you can pass a `token` and `key` as an argument instead of `accessToken`.

# Moip v2 Examples

## Customers
#### Create
```javascript
moip.customer.create({
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
            expiration_date: "2017-09-30",
            instruction_lines: {
                first: "Primeira linha do boleto",
                second: "Segunda linha do boleto",
                third: "Terceira linha do boleto"
            },
            logo_uri: "https://sualoja.com.br/logo.jpg"
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
moip.payment.refund('PAY-3GALBSZIUSBE')
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
```

#### Create an order refund
```javascript
moip.order.refund('ORD-4GALBSZIUSBE')
    .then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log(err)
    })
}
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


## Moip Connect
#### Ask for OAuth permission

To ask for OAuth permission for a merchant, you need to redirect them to a page in which they will log in with their Moip credentials to authorize your access to their account.

The complete list of available scopes for permission is available [in our official documentation here](https://documentao-moip.readme.io/v2.1/reference#section-scopes-dispon%C3%ADveis).
```javascript
moip.connect.getAuthorizeUrl({
    client_id: 'APP-XXXXXXXXXXXX',
    redirect_uri: 'https://url_registered.in.yourapp',
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
    client_id: 'APP-XXXXXXXXXXXX',
    redirect_uri: 'https://url_registered.in.yourapp',
    client_secret: 'the secret token returned when you created your APP',
    grant_type: 'authorization_code',
    code: 'the code returned to your redirect_uri after seller authorized'
}).then((response) => {
    console.log(response) 
}).catch((err) => {
    console.log(err) 
})
```


## Moip Account

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

## API Reference

[Official API Reference](https://dev.moip.com.br/v2.0/reference)

[Official Documentation](https://dev.moip.com.br/docs)

## Useful Links

[Credit card test numbers](https://dev.moip.com.br/docs/numeros-de-cartoes-para-teste)

[Simulating different payment statuses](https://dev.moip.com.br/docs/simulando-diferentes-status-de-pagamento)


## License

[The MIT License](https://github.com/moip/moip-sdk-node/blob/master/LICENSE)

## Contributors

- [Igor Lopes](https://github.com/Igor-Lopes)
- [Daniel Leonardo](https://github.com/danielfnz)
