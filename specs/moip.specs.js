var chai = require('chai');
var should = chai.should();

var moip = require('../index.js')({
    token: '01010101010101010101010101010101',
    key: 'ABABABABABABABABABABABABABABABABABABABAB'
});

var customer = {};

describe('Moip Customers', function() {

    it('Create Customer', function(done) {
        var newCustomer = {
            "ownId": "24525252323535",
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
        };
        moip.customer.create(newCustomer, function(error, body, response) {
            console.log(response.statusCode);
            console.log(body);
            done();
        });
    });

    it('Get Customer', function(done) {
      moip.customer.get('CUS-UNTR67Z9JCAJ', function(error, body, response) {
          console.log(response.statusCode);
          console.log(body);
          done();
      });
    });
});
