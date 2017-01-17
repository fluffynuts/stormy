import { IModule } from 'angular';
import moment = require('moment');

function configureMdDateLocale($mdDateLocaleProvider) {
  const dateFormat = 'YYYY-MM-DD';
  $mdDateLocaleProvider.parseDate = function(value: any): any {
    return moment(value, dateFormat);
  };
  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format(dateFormat);
  };
}
export default function(app: IModule) {
  app.config(configureMdDateLocale);
}
