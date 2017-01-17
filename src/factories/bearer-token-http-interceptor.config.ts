import IHttpProvider = angular.IHttpProvider;
function tokenInterceptorFactory(tokenRepository: ITokenRepository,
                                 bearerTokenInjector: IBearerTokenInjector) {
  return {
    request: function (config: IRequestConfig): Promise<IRequestConfig> {
      return tokenRepository.get().then(token => {
        return token
          ? bearerTokenInjector.inject(config, token)
          : config;
      });
    }
  };
}
export default function (app) {
  const interceptorName = 'bearerTokenHttpInterceptor';
  app.factory(interceptorName, tokenInterceptorFactory);
  app.config(function ($httpProvider: IHttpProvider) {
    $httpProvider.interceptors.push(interceptorName);
  });
}
