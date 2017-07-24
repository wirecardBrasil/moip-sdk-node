var chai = require('chai');
var should = chai.should();

var moip = require('../index.js')({
    token: '01010101010101010101010101010101',
    key: 'ABABABABABABABABABABABABABABABABABABABAB'
});

var customer = {};

describe('Moip Customers', function() {

    it('Create Customer', function(done) {
        moip.customer.create(function(error, body, response) {
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
