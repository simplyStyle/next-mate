/**
 * This file contains tRPC's HTTP response handler
 */
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContext } from '@/server/context';
import { appRouter } from '@/server/routers/_app';

const handler = (request: Request) => {
  // console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    /**
     * @link https://trpc.io/docs/error-handling
     */
    onError({ error }) {
      if (error.code === 'INTERNAL_SERVER_ERROR') {
        // send to bug reporting
        console.error('Something went wrong', error);
      }
    },
    /**
     * Enable query batching
     */
    batching: {
      enabled: true,
    },
    /**
     * @link https://trpc.io/docs/caching#api-response-caching
     */
    // responseMeta() {
    //   // ...
    // },
    createContext: async function (opts) {
      return createContext(opts);
    },
  });
};

export { handler as GET, handler as POST };
