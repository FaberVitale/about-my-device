import { defineProperty } from '@/utils/object';

const EMPTY = Symbol('EMPTY');

export function memoize<T, U, R extends unknown[]>(
  fn: (...args: readonly [T, ...R]) => U,
) {
  const memo: {
    input: T | typeof EMPTY;
    stored: U | typeof EMPTY;
  } = {
    input: EMPTY,
    stored: EMPTY,
  };

  const memoized = function memoized(input: T, ...rest: R): U {
    if (input === memo.input && memo.stored !== EMPTY) {
      return memo.stored;
    }

    const stored = fn(input, ...rest);

    memo.input = input;
    memo.stored = stored;

    return memo.stored;
  };

  defineProperty(memoized, 'clear', {
    writable: false,
    value: function clear(): void {
      memo.input = EMPTY;
      memo.stored = EMPTY;
    },
  });

  return memoized;
}
