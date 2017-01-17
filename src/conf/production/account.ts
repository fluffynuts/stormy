export const protocol = '';
export const host = '';
export const port = 0;
export const changePasswordPath = 'api/account/changePassword';
import { buildUrl } from '../build-url';

export function buildChangePasswordUrl() {
  return buildUrl(protocol, host, port, changePasswordPath);
}
