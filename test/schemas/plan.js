module.exports = {
  name: 'Plano Especial',
  description: 'Descrição do Plano Especial',
  amount: 990,
  setup_fee: 500,
  max_qty: 1,
  status: 'ACTIVE',
  payment_method: 'CREDIT_CARD',
  interval: {
    length: 1,
    unit: 'MONTH'
  },
  billing_cycles: 12,
  trial: {
    days: 30,
    enabled: false
  }
}
