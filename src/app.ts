import { registerNavigationRegistrarOn } from './components/navigation-registrar';
import { loadComponentsOn } from './webpack-angular-bootstrapper';
import * as angular from 'angular';

const
  appName = 'weather.app',
  dependencies = [
    'ui.router',
    'ngAnimate',
    'ngMaterial',
    'angular-storage'
  ],
  app = angular.module(appName, dependencies);

registerNavigationRegistrarOn(app);
loadComponentsOn(app);
angular.bootstrap(document, [appName]);
