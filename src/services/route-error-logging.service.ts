function logRouteErrors($rootScope, $log) {
  $rootScope.$on('$stateChangeError', (ev, toState, toParams, fromState, fromParams, error) => {
    if (error) {
      $log.error(error);
    }
  });
}

export default function (app) {
  app.service('logRouteErrors', logRouteErrors);
}
