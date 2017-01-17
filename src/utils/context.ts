export interface RequireContext extends Function {
  default: (app: any) => void;
  keys: () => string[];
}
export interface WebpackRequire {
  context: (directory: string, useSubDirectories?: boolean, regExp?: RegExp) => RequireContext;
}

function tryGetContext(): RequireContext {
  try {
    const webpackRequire = (require as any) as WebpackRequire;
    return webpackRequire.context('../', true);
  } catch (e) {
    if (!process.env.SUPPRESS_WEBPACK_CONTEXT_WARNING) {
      console.error('WARNING: unable to obtain webpack-specific require.context; auto-loading will not work as expected');
    }
    const context = function () {
      return {};
    } as any;
    context.keys = function () {
      return [];
    };
    context.default = function () {
      /* does nothing */
    };
    return context as RequireContext;
  }
}

const context = tryGetContext();

export function findContextFiles(regExp?: RegExp): RequireContext {
  const result = function (path) {
    return context(path);
  } as any; // there has to be a better way than the any hammer

  const keys = context.keys().filter(k => {
    return !regExp || k.match(regExp) !== null;
  });
  result.keys = function () {
    return keys;
  };
  return result as RequireContext;
}
