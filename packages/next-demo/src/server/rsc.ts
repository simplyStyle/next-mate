import superjson from 'superjson';
import { createTRPCNextLayout } from '@/next-layout/create-trpc-next-layout';
import { createContext } from '@/server/context';
import { appRouter } from '@/server/routers/_app';
import 'server-only';

/**
 * React server components, only can be run in server side
 */
export const rsc = createTRPCNextLayout({
  router: appRouter,
  transformer: superjson,
  createContext() {
    return createContext({});
  },
});
