import { config } from '../conf';

function getConf() {
  return config;
}
export default function (app) {
  app.service('conf', getConf);
}
