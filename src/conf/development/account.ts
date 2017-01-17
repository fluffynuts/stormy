export const protocol = 'https';
export const host = 'localhost';
export const port = 44355;
export const changePasswordPath = 'api/account/changePassword';
import { buildUrl } from '../build-url';

export function buildChangePasswordUrl() {
  return buildUrl(protocol, host, port, changePasswordPath);
}
