import * as _ from 'lodash';

export class NavigationRegistrar implements INavigationRegistrar {
  private _registrations: INavigationRegistration[] = [];

  get(): INavigationRegistration[] {
    // TODO: implement ordering hinting from registrations
    //   and order the output by that hinting. Currently,
    //   navigation items will be displayed in the order in
    //   which they were registered (which is up to whatever order
    //   they were imported in)
    return _.cloneDeep(this._registrations);
  }

  register(title: string, state: string): INavigationRegistrar {
    this._registrations.push({
      title,
      state
    });
    return this;
  }
}

const provider = {
  $get: new NavigationRegistrar()
};

export function registerNavigationRegistrarOn(app) {
  app.provider('navigationRegistrar', function () {
    return provider;
  });
  app.service('navigation', function () {
    return provider.$get;
  });
};

