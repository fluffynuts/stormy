import * as _ from 'lodash';
import { NODE_ENV, findContextFiles } from '../utils';
const DEV_ENV = 'development' as string;
console.log('process.env:', process.env);

const
  devFind = new RegExp('\.\/development\/.*\\.ts'),
  devConfig = findContextFiles(devFind);

function getConfPathFor(filePath: string): string {
  const parts = filePath
    .split('/')
    .filter(p => p !== '.' && p !== '..')
    .map(p => p.replace(/\.(ts|js)/, ''))
    .map(p => p.replace(/\./, '_'));
  return parts.slice(2).join('.');
}

function getEnvironmentConfigFor(env: string) {
  const
    find = new RegExp('\./' + env + '\\/.*\\.ts'),
    context = findContextFiles(find);
  return _.reduce(context.keys(), (acc, cur) => {
    const
      subConf = devConfig(cur),
      confPath = getConfPathFor(cur);
    return confPath
      ? _.set(acc, confPath, subConf)
      : _.assign(acc, subConf);
  }, {});
}

const search = [DEV_ENV];
if (NODE_ENV !== DEV_ENV) {
  search.push(NODE_ENV);
}

export const config = _.reduce(search, (acc, env) => {
  const conf = _.assign(acc, getEnvironmentConfigFor(env)) as IConfig;
  conf.env = env;
  return conf;
}, {}) as IConfig;
