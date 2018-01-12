module.exports = {
  sandbox: {
    assinaturas: {
      url: 'https://api.moip.com.br/assinaturas/v1'
    },
    v2: {
      url: 'https://api.moip.com.br/v2',
      authorizeUrl: 'https://api.moip.com.br/simulador/authorize',
      OAuthUrl: 'https://connect.moip.com.br/oauth/token'
    }
  },
  production: {
    assinaturas: {
      url: 'https://api.moip.com.br/assinaturas/v1'
    },
    v2: {
      url: 'https://api.moip.com.br/v2',
      OAuthUrl: 'https://connect.moip.com.br/oauth/token'
    }
  }
}
