export const protocol = '';
export const host = '';
export const port = 0;
export const tokenPath = 'core/connect/token';
export const clientId = 'chillisoft-workflows';
export const clientSecret = 'S00p3r-S3kr3t';

import { buildUrl as _buildUrl } from '../build-url';
export function buildUrl() {
  return _buildUrl(protocol, host, port, tokenPath);
}
