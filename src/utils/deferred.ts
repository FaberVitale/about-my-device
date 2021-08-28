export interface Deferred<T> extends Promise<T> {
  readonly resolve: (value?: T | PromiseLike<T>) => void;
  readonly reject: (reason?: unknown) => void;
}

/**
 * Creates a Promise with the `reject` and `resolve` functions
 * placed as methods on the promise object itself. It allows you to do:
 *
 *     const p = deferred<number>();
 *     // ...
 *     p.resolve(42);
 * @see https://deno.land/std@0.90.0/async/deferred.ts
 */
export function deferred<T>(): Deferred<T> {
  let resolvePromise: unknown;
  let rejectPromise: unknown;

  const promise = new Promise<T>((resolve, reject): void => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  Object.defineProperties(promise, {
    resolve: {
      value: resolvePromise,
      writable: false,
      configurable: false,
      enumerable: true,
    },
    reject: {
      value: rejectPromise,
      writable: false,
      configurable: false,
      enumerable: true,
    },
  });

  return promise as Deferred<T>;
}
