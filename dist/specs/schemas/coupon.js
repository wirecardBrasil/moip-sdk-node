'use strict';

module.exports = {
  name: 'Coupon name',
  description: 'My new coupon',
  discount: {
    value: 10000,
    type: 'percent'
  },
  status: 'active',
  duration: {
    type: 'repeating',
    occurrences: 12
  },
  max_redemptions: 1000,
  expiration_date: {
    year: 2020,
    month: '08',
    day: '01'
  }
};