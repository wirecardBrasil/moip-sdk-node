'use strict';

var request = require('request');
var moip = require('../client/endpoints');

var basicAuth = null;
var endpoint = null;

var webhook = {};

webhook.getOne = function (resourceId, callback) {
  var options = {
    url: endpoint.v2.url + '/webhooks?resourceId=' + resourceId,
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

webhook.getAll = function (callback) {
  var options = {
    url: endpoint.v2.url + '/webhooks',
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

webhook.resend = function (webhook, callback) {
  var options = {
    url: endpoint.v2.url + '/webhooks',
    headers: {
      'Authorization': basicAuth
    },
    method: 'POST',
    body: webhook,
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

  return webhook;
};