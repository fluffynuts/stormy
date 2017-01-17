import { IRootScopeService } from 'angular';

function tokenRepositoryFactory(
  store: IAngularStore,
  $rootScope: IRootScopeService
): ITokenRepository {
  const tokenKey = 'token';
  return {
    get: async(): Promise<string> => {
      return store.get(tokenKey);
    },
    set: async(token: string): Promise<void> => {
      store.set(tokenKey, token);
      $rootScope.$emit('user-token-updated');
    },
    clear: async(): Promise<void> => {
      store.remove(tokenKey);
      $rootScope.$emit('user-token-cleared');
    }
  } as ITokenRepository;
}

export default function (app) {
  app.factory('tokenRepository', tokenRepositoryFactory);
}
