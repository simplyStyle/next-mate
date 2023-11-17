import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { type AppRouter } from './routers/_app';

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
