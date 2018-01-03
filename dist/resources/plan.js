'use strict';

var request = require('request');
var moip = require('../client/endpoints');

var basicAuth = null;
var endpoint = null;

var plan = {};

plan.getAll = function (callback) {
  var options = {
    url: endpoint.assinaturas.url + '/plans',
    headers: {
      'Authorization': basicAuth
    },
    method: 'GET',
    json: true
  };

  request(options, function (error, response, body) {
    if (response) {
      callback(error, body, response);
    } else {
      callback(error);
    }
  });
};

plan.getOne = function (code, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/plans/' + code,
    headers: {
      'Authorization': basicAuth
    },
    method: 'GET',
    json: true
  };

  request(options, function (error, response, body) {
    if (response) {
      callback(error, body, response);
    } else {
      callback(error);
    }
  });
};

plan.create = function (plan, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/plans',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: plan,
    json: true
  };

  request(options, function (error, response, body) {
    if (response) {
      callback(error, body, response);
    } else {
      callback(error);
    }
  });
};

plan.activate = function (code, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/plans/' + code + '/activate',
    headers: {
      'Authorization': basicAuth
    },
    body: plan,
    method: 'PUT',
    json: true
  };

  request(options, function (error, response, body) {
    if (response) {
      callback(error, body, response);
    } else {
      callback(error);
    }
  });
};

plan.inactivate = function (code, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/plans/' + code + '/inactivate',
    headers: {
      'Authorization': basicAuth
    },
    body: plan,
    method: 'PUT',
    json: true
  };

  request(options, function (error, response, body) {
    if (response) {
      callback(error, body, response);
    } else {
      callback(error);
    }
  });
};

plan.update = function (code, plan, callback) {
  var options = {
    url: endpoint.assinaturas.url + '/plans/' + code,
    headers: {
      'Authorization': basicAuth
    },
    method: 'PUT',
    body: plan,
    json: true
  };

  request(options, function (error, response, body) {
    if (response) {
      callback(error, body, response);
    } else {
      callback(error);
    }
  });
};

module.exports = function (_basicAuth, _production) {
  basicAuth = _basicAuth;

  if (_production) {
    endpoint = moip.production;
  } else {
    endpoint = moip.sandbox;
  }

  return plan;
};