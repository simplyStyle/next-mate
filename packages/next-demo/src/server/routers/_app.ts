/**
 * This file contains the root router of your tRPC-backend
 */
import { privateProcedure, publicProcedure, router } from '../trpc';
import { authRouter } from './auth';
import { postRouter } from './post';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  post: postRouter,
  auth: authRouter,
  whoami: publicProcedure.query(({ ctx }) => ctx.session?.user),
  secret: privateProcedure.query(() => 'cow level'),
});

export type AppRouter = typeof appRouter;
