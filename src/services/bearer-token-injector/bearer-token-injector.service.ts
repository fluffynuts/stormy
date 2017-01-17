function bearerTokenInjectorFactory(): IBearerTokenInjector {
  return {
    inject: (config: IRequestConfig, token: string): IRequestConfig => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }
  };
}
export default function (app) {
  app.service('bearerTokenInjector', bearerTokenInjectorFactory);
}
