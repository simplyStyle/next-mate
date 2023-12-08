import 'server-only';
import { transformer, createTRPCNextLayout } from '@hyperse-io/next-core';
import { createContext } from '@/server/context';
import { appRouter } from '@/server/routers/_app';

/**
 * React server components, only can be run in server side
 */
export const rsc = createTRPCNextLayout({
  router: appRouter,
  transformer,
  createContext() {
    return createContext({});
  },
});
