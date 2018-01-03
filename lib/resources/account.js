import request from 'request-promise';
import moip from './moip';

let OAuth = null;
let endpoint = null;
let account = {};

account.create = function (account) {
  const options = {
    url: endpoint.v2.url + '/accounts',
    headers: {
      'Authorization': OAuth
    },
    method: 'POST',
    body: account,
    json: true
  };
  return request(options);
};

account.getOne = function (_id) {
  const options = {
    url: endpoint.v2.url + '/accounts/' + _id,
    headers: {
      'Authorization': OAuth
    },
    method: 'GET',
    json: true
  };

  return request(options)
};

module.exports = function (_OAuth, _production) {
  OAuth = _OAuth

  if (_production) {
    endpoint = moip.production
  } else {
    endpoint = moip.sandbox
  }

  return account
};
