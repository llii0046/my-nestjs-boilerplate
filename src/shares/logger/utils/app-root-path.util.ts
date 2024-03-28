import { parse, resolve, join } from 'path';
import { existsSync } from 'fs';

/**
 * Get the application root directory
 * @returns application root directory
 */
export function getAppRootPath(): string {
  if (process.env.APP_ROOT_PATH) {
    return resolve(process.env.APP_ROOT_PATH);
  }

  let cur = __dirname;
  const root = parse(cur).root;

  let appRootPath = '';
  while (cur) {
    if (
      existsSync(join(cur, 'node_modules')) &&
      existsSync(join(cur, 'package.json'))
    ) {
      appRootPath = cur;
    }
    if (root === cur) {
      break;
    }
    cur = resolve(cur, '..');
  }

  if (appRootPath) {
    process.env.APP_ROOT_PATH = appRootPath;
  }
  return appRootPath;
}
