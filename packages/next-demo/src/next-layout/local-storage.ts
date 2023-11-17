/**
 * This file makes sure that we can get a storage that is unique to the current request context
 */
import type { AsyncLocalStorage } from 'async_hooks';
import { requestAsyncStorage } from 'next/dist/client/components/request-async-storage.external';

// https://github.com/vercel/next.js/blob/canary/packages/next/client/components/request-async-storage.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asyncStorage: AsyncLocalStorage<any> | object = requestAsyncStorage;

function throwError(msg: string) {
  throw new Error(msg);
}

export function getRequestStorage<T>(): T {
  if ('getStore' in asyncStorage) {
    return asyncStorage.getStore() ?? throwError("Couldn't get async storage");
  }

  return asyncStorage as T;
}
