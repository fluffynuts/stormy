import IRequestConfig = angular.IRequestConfig;
interface IBearerTokenInjector {
  inject: (config: IRequestConfig, token: string) => IRequestConfig;
}

