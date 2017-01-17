/* NB: only for use outside the app; rather use the $log service there instead */
import { NODE_ENV } from './env';
const DEV_ENV = 'development';

function output(func: Function,
                args: any[]): void {
  try {
    func.apply(console, args);
  } catch (ignore) {
    console.log(ignore);
  }
}

export function log(...args: any[]) {
  output(console.log, Array.prototype.slice.apply(arguments));
}

export function error(...args: any[]) {
  output(console.error, Array.prototype.slice.apply(arguments));
}

export function debug(...args: any[]) {
  if (NODE_ENV === DEV_ENV) {
    output(console.log, Array.prototype.slice.apply(arguments));
  }
}

