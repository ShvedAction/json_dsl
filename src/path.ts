import { DslError } from './types';

export function resolvePath(context: unknown, path: (string | number)[]): unknown {
  let current: unknown = context;

  for (const segment of path) {
    if (current === null || current === undefined) {
      throw new DslError('PATH_NOT_FOUND', `Path not found at segment "${String(segment)}"`);
    }

    if (typeof segment === 'number') {
      if (!Array.isArray(current)) {
        throw new DslError('PATH_NOT_FOUND', `Expected array at segment ${segment}`);
      }
      if (segment < 0 || segment >= current.length) {
        throw new DslError('PATH_NOT_FOUND', `Array index out of bounds: ${segment}`);
      }
      current = current[segment];
      continue;
    }

    if (typeof current !== 'object') {
      throw new DslError('PATH_NOT_FOUND', `Expected object at segment "${segment}"`);
    }

    if (!Object.prototype.hasOwnProperty.call(current, segment)) {
      throw new DslError('PATH_NOT_FOUND', `Key not found: "${segment}"`);
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}
