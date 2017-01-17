interface IApiConfig {
  protocol: string;
  host: string;
  port: number;
  prefix: string;
  clientId: string;
  clientSecret: string;
  buildUrl: (path?: string) => string;
}

interface IChangePasswordConfig {
  protocol: string;
  host: string;
  port: number;
  changePasswordPath: string;
  buildChangePasswordUrl: () => string;
}

interface IApplicationDefaults {
  defaultRoute: string;
}

interface IConfig {
  env: string;
  api: IApiConfig;
  auth: IApiConfig;
  account: IChangePasswordConfig;
  defaults: IApplicationDefaults;
}

