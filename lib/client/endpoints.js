export default {
  sandbox: {
    assinaturas: {
      url: 'https://sandbox.moip.com.br/assinaturas/v1'
    },
    v2: {
      url: 'https://sandbox.moip.com.br/v2',
      authorizePaymentSimulationUrl: 'https://sandbox.moip.com.br/simulador/authorize',
      generateTokenUrl: 'https://connect-sandbox.moip.com.br/oauth/token',
      authorizeUrl: 'https://connect-sandbox.moip.com.br/oauth/authorize'
    }
  },
  production: {
    assinaturas: {
      url: 'https://api.moip.com.br/assinaturas/v1'
    },
    v2: {
      url: 'https://api.moip.com.br/v2',
      generateTokenUrl: 'https://connect.moip.com.br/oauth/token',
      authorizeUrl: 'https://connect.moip.com.br/oauth/authorize'
    }
  }
}
