# Moip SDK Node
> Módulo Node.js para integração com a API Moip v2 e assinaturas

[![Build Status](https://travis-ci.org/Nucleus-Inc/moip-sdk-node.svg?branch=master)](https://travis-ci.org/Nucleus-Inc/moip-sdk-node)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

**Índice**

- [Instalação](#instalação)
- [Configurando a autenticação](#configurando-a-autenticação)
  - [Por BasicAuth](#por-basicauth)
- [Exemplos de Uso](#clientes):
  - [Clientes](#clientes)
    - [Criação](#criação)
    - [Consulta](#consulta)
  - [Pedidos](#pedidos)
    - [Criação](#criação-1)
    - [Consulta](#consulta-1)
      - [Pedido Específico](#pedido-específico)
      - [Todos os Pedidos](#todos-os-pedidos)
  - [Pagamentos](#pagamentos)
    - [Criação](#criação-2)
      - [Cartão de Crédito](#cartão-de-crédito)
        - [Com Hash](#com-hash)
      - [Com Boleto](#com-boleto)
    - [Consulta](#consulta-2)
  - [Moip Connect](#moip-connect)
    - [Criação de App](#criação-de-app)
  - [Preferências de Notificação](#preferências-de-notificação)
    -  [Criação](#criação-3)
    -  [Consulta](#consulta-3)
    -  [Exclusão](#exclusão)
    -  [Listagem](#listagem)
- [Referência API](#referência-api)
- [Licença](#licença)


## Instalação

Npm:

```
npm install moip-sdk-node --save
```

## Configurando a autenticação
### Por BasicAuth
```javascript
var moip = require('moip-sdk-node')({
    token: 'SEU_TOKEN',
    key: 'SUA_CHAVE',
     production: false // false para utilizar Sandbox e true para Production. Default: false
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
### Consulta
```javascript
moip.customer.getOne('CUS-MXAZ45AZ15U1', function(error, body, response) {
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

## Referência API

[Documentação oficial v2](https://dev.moip.com.br/v2.0/reference)

[Documentação oficial Assinaturas](https://dev.moip.com.br/v1.5/reference)

## Links Úteis

[Número de cartões para teste](https://dev.moip.com.br/docs/numeros-de-cartoes-para-teste)

[Simulando diferentes estados de pagamento](https://dev.moip.com.br/docs/simulando-diferentes-status-de-pagamento)

[Guia para assinaturas](https://dev.moip.com.br/docs/guia-para-assinaturas-1)


## Licença

[The MIT License](https://github.com/Nucleus-Inc/moip-sdk-node/blob/master/LICENSE.txt)
