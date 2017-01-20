import { IModule } from 'angular';

function createAppMenuDirective() {
  return {
    link: (scope) => {
    }
  };
}

export default function(app: IModule) {
  app.directive('appMenu', createAppMenuDirective);
}
