import { IModule } from 'angular';


export function loadComponentsOn(app: IModule) {
  const
    angular = require('angular'), // late-load angular, on porpoise
    autoloadRegex = /(directive|component|service|factory|controller|config|filter)\.ts$/,
    requireGlob = (require as any).context('./', true); // not passing in the regex on purpose: I'm seeing strange behaviour when I do

  requireGlob.keys().forEach(path => {
    if (!path.match(autoloadRegex)) {
      return;
    }
    console.log('loading: ', path);
    const defaultFunc = requireGlob(path).default;
    if (!defaultFunc) {
      throw `${path} does not export a default function!`;
    }
    defaultFunc(app);
  });
}
