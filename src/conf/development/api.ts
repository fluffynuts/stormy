export const protocol = 'https';
export const host = 'localhost';
export const port = 44355;
export const prefix = 'api';

import { buildUrl as _buildUrl } from '../build-url';
export function buildUrl(subPath: string) {
  return _buildUrl(protocol, host, port, [prefix, subPath].join('/'));
}

