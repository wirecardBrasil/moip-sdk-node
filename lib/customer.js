var request = require('request');

var basicAuth = null;

var Customer = {};

Customer.get = function(_id, callback) {

    var options = {
        url: 'https://sandbox.moip.com.br/v2/customers/' + _id,
        headers: {
            "Authorization": basicAuth
        },
        method: 'GET'
    };

    request(options, function(error, response, body) {
        if (body) {
            callback(error, body, response);
        } else {
            callback(error);
        }
    });
};

Customer.create = function(callback) {

    var options = {
        url: 'https://sandbox.moip.com.br/v2/customers',
        headers: {
            "Authorization": basicAuth
        },
        method: 'POST',
        body: {
            "ownId": "2452525fsdfsf",
            "fullname": "Jose Silva",
            "email": "jose_silva0@email.com",
            "birthDate": "1988-12-30",
            "taxDocument": {
                "type": "CPF",
                "number": "22222222222"
            },
            "phone": {
                "countryCode": "55",
                "areaCode": "11",
                "number": "66778899"
            },
            "shippingAddress": {
                "city": "Sao Paulo",
                "complement": "8",
                "district": "Itaim",
                "street": "Avenida Faria Lima",
                "streetNumber": "2927",
                "zipCode": "01234000",
                "state": "SP",
                "country": "BRA"
            }
        },
        json: true // Automatically stringifies the body to JSON
    };

    request(options, function(error, response, body) {
        if (body) {
            callback(error, body, response);
        } else {
            callback(error);
        }
    });
};

module.exports = function(_basicAuth) {
    basicAuth = _basicAuth;

    return Customer;
};
