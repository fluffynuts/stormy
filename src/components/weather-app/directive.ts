import { IModule } from 'angular';

function createWeatherAppDirective() {
  return {
    template: require('./template.html'),
    link: ($scope) => {
    }
  };
}

export default function(app: IModule) {
  app.directive('weatherApp', createWeatherAppDirective);
}
