<img src="https://gist.githubusercontent.com/joaolucasl/00f53024cecf16410d5c3212aae92c17/raw/1789a2131ee389aeb44e3a9d5333f59cfeebc089/moip-icon.png" align="right" />

# Moip SDK Node
> O jeito mais simples e rápido de integrar o Moip a sua aplicação Node

> **[Em desenvolvimento - Não utilize em Produção**] Módulo Node.js para integração com a API Moip v2 e assinaturas

[![Build Status](https://travis-ci.org/Nucleus-Inc/moip-sdk-node.svg?branch=master)](https://travis-ci.org/Nucleus-Inc/moip-sdk-node)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

**Índice**

- [Instalação](#instalação)
- [Configurando a autenticação](#configurando-a-autenticação)
  - [Por BasicAuth](#por-basicauth)
- [Exemplos de Uso](#clientes):
  - [Contas transparentes](#contas-transparentes)
    - [Criação](#criação)
    - [Consulta](#consulta)
  - [Clientes](#clientes)
    - [Criação](#criação-1)
    - [Adicionar Cartão de Crédito](#add-cartao)
    - [Deletar Cartão de Crédito](#delete-cartao)
    - [Consulta](#consulta-1)
    - [Listagem](#listagem-1)
  - [Pedidos](#pedidos)
    - [Criação](#criação-2)
    - [Consulta](#consulta-2)
      - [Pedido Específico](#pedido-específico)
      - [Todos os Pedidos](#todos-os-pedidos)
  - [Pagamentos](#pagamentos)
    - [Criação](#criação-3)
      - [Cartão de Crédito](#cartão-de-crédito)
        - [Com Hash](#com-hash)
      - [Com Boleto](#com-boleto)
    - [Consulta](#consulta-3)
  - [Moip Connect](#moip-connect)
    - [Criação de App](#criação-de-app)
  - [Preferências de Notificação](#preferências-de-notificação)
    -  [Criação](#criação-4)
    -  [Consulta](#consulta-4)
    -  [Exclusão](#exclusão)
    -  [Listagem](#listagem-4)
 - [Contas Bancárias](#contas-bancarias)
    -  [Criação](#criação-5)
    -  [Consulta](#consulta-5)
    -  [Listagem](#listagem-5)
    -  [Exclusão](#exclusão-5)
- [Referência API](#referência-api)
- [Licença](#licença)


## Instalação

Npm:

```
npm install moip-sdk-node --save
```

## Configurando a autenticação

[Pré-requisito - Gerar o access_token](https://dev.moip.com.br/reference#1-criar-um-app)

```javascript
var moip = require('moip-sdk-node')({
    token: 'SEU_TOKEN',
    key: 'SUA_CHAVE',
    accessToken: 'access_token',
    production: false // false para utilizar Sandbox e true para Production. Default: false
})
```
## Contas transparentes
### Criação
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
    transparentAccount: true
}, function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

### Consulta
```javascript
moip.account.getOne(account_id, function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

## Clientes
### Criação
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
}, function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

### Adicionar Cartão de Crédito
```javascript
moip.customer.createCreditCard(customer_id,{
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
}, function(error, body, response) {
if (error) {
    console.log(error)
} else {
    console.log(body) 
}
})
```

### Deletar Cartão de Crédito
```javascript
moip.customer.deleteCreditCard(creditcard_id,function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

### Consulta
```javascript
moip.customer.getOne(customer_id, function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

### Consultar todos
```javascript
moip.customer.getAll(function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

## Pedidos
### Criação

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
}, function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```
### Consulta
#### Pedido Específico
```javascript
moip.order.getOne('ORD-SFGB23X8WAVQ', function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

#### Todos os Pedidos
##### Sem Filtro
```javascript
moip.order.getAll(function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

## Pagamentos

### Criação
#### Cartão de Crédito
##### Com Hash

```javascript
moip.payment.create('ORD-SFGB23X8WAVQ', {
    {
        installmentCount: 1,
        fundingInstrument: {
            method: 'CREDIT_CARD',
            creditCard: {        
                hash: 'HASH -- gerado do carto a partir de sua chave pública',
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
    }
}, function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

#### Com Boleto

```javascript
moip.payment.create('ORD-SFGB23X8WAVQ', {
    {
        installmentCount: 1,
        fundingInstrument: {
            method: 'CREDIT_CARD',
            funding_instrument: {
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
        }
    }
}, function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

### Consulta
```javascript
moip.payment.getOne('PAY-6PYBC8E93M2L', function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

## Moip Connect
### Criação de App
```javascript
moip.connect.createApp({
    name: 'Appz',
    description: 'Appz test',
    site: 'https://www.Appztest.com',
    redirectUri: 'https://www.Appztest.com/get'
}, function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

## Preferências de notificação
### Criação
```javascript
 moip.notification.create({
     events: [
         'ORDER.*',
         'PAYMENT.AUTHORIZED',
         'PAYMENT.CANCELLED'
     ],
     target: 'https://requestb.in/17ndz451',
     media: 'WEBHOOK'
 }, function(error, body, response) {
     if (error) {
         console.log(error)
     } else {
         console.log(body) 
     }
 })
```

### Consulta
```javascript
moip.notification.getOne('NPR-1231231231', function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

### Exclusão
```javascript
moip.notification.delete('NPR-1231231231', function(error, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(response) 
    }
})
```

### Listagem
```javascript
moip.notification.getAll(function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

## Contas bancárias
### Criação
```javascript
moip.bankAccount.create(_account_id,{
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
}, function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

### Consulta
```javascript
moip.bankAccount.getOne(bank_account_id, function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

### Consultar todas
```javascript
moip.bankAccount.getAll(account_id, function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

### Deletar
```javascript
moip.bankAccount.deleteOne(bankaccount_id, function(error, body, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(body) 
    }
})
```

## Referência API

[Documentação oficial v2](https://dev.moip.com.br/v2.1/reference)

[Documentação oficial Assinaturas](https://dev.moip.com.br/v1.5/reference)

## Links Úteis

[Número de cartões para teste](https://dev.moip.com.br/docs/numeros-de-cartoes-para-teste)

[Simulando diferentes estados de pagamento](https://dev.moip.com.br/docs/simulando-diferentes-status-de-pagamento)

[Guia para assinaturas](https://dev.moip.com.br/docs/guia-para-assinaturas-1)


## Licença

[The MIT License](https://github.com/moip/moip-sdk-node/blob/master/LICENSE)
