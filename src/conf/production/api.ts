export const protocol = '';
export const host = '';
export const port = 0;
export const prefix = 'api';

import { buildUrl as _buildUrl } from '../build-url';
export function buildUrl(subPath: string) {
  return _buildUrl(protocol, host, port, [prefix, subPath].join('/'));
}
