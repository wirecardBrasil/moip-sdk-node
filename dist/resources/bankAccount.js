'use strict';

var request = require('request');
var moip = require('../client/endpoints');

var OAuth = null;
var endpoint = null;

var bankAccount = {};

bankAccount.create = function (_account_id, bankaccounts, callback) {
  var options = {
    url: endpoint.v2.url + '/accounts/' + _account_id + '/bankaccounts/',
    headers: {
      'Authorization': OAuth
    },
    method: 'POST',
    body: account,
    json: true
  };

  request(options, function (error, response, body) {
    if (body) {
      callback(error, body, response);
    } else {
      callback(error);
    }
  });
};

bankAccount.getOne = function (_id, callback) {
  var options = {
    url: endpoint.v2.url + '/bankaccounts/' + _id,
    headers: {
      'Authorization': OAuth
    },
    method: 'GET',
    json: true
  };

  request(options, function (error, response, body) {
    if (body) {
      callback(error, body, response);
    } else {
      callback(error);
    }
  });
};

bankAccount.getAll = function (_id, callback) {
  var options = {
    url: endpoint.v2.url + '/accounts/' + _id + '/bankaccounts',
    headers: {
      'Authorization': OAuth
    },
    method: 'GET',
    json: true
  };

  request(options, function (error, response, body) {
    if (body) {
      callback(error, body, response);
    } else {
      callback(error);
    }
  });
};

bankAccount.deleteOne = function (_id, callback) {
  var options = {
    url: endpoint.v2.url + '/bankaccounts/' + _id,
    headers: {
      'Authorization': OAuth
    },
    method: 'DELETE',
    json: true
  };

  request(options, function (error, response, body) {
    if (body) {
      callback(error, body, response);
    } else {
      callback(error);
    }
  });
};

module.exports = function (_OAuth, _production) {
  OAuth = _OAuth;

  if (_production) {
    endpoint = moip.production;
  } else {
    endpoint = moip.sandbox;
  }

  return bankAccount;
};