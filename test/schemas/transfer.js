module.exports = {
  amount: 500,
  transferInstrument: {
    method: 'BANK_ACCOUNT',
    bankAccount: {
      type: 'CHECKING',
      bankNumber: 1,
      agencyNumber: 1111,
      agencyCheckNumber: 2,
      accountNumber: 9999,
      accountCheckNumber: 8,
      holder: {
        fullname: 'Nome do Portador',
        taxDocument: {
          type: 'CPF',
          number: 22222222222
        }
      }
    }
  }
}
