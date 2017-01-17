import * as _ from 'lodash';

function uriEncode(obj: any, k: string): string {
  return [
    encodeURIComponent(k),
    encodeURIComponent(obj[k])
  ].join('=');
}

function formUrlEncoderService(): IFormUrlEncoder {
  return {
    encode: (formData: any): string => {
      return _.keys(formData).map(k => uriEncode(formData, k)).join('&');
    }
  };
};

export default function (app) {
  app.service('formUrlEncoder', formUrlEncoderService);
}
