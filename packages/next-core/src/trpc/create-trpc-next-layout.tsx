import { dehydrate, QueryClient } from '@tanstack/query-core';
import type { DehydratedState } from '@tanstack/react-query';
import type {
  AnyTRPCProcedure,
  AnyTRPCQueryProcedure,
  AnyTRPCRouter,
  inferProcedureInput,
  inferProcedureOutput,
  inferRouterContext,
  TRPCProcedureType,
} from '@trpc/server';
import {
  createRecursiveProxy,
  type CreateRouterOptions,
  type DataTransformer,
  type GetRawInputFn,
  type MaybePromise,
} from '@trpc/server/unstable-core-do-not-import';
import { getRequestStorage } from './local-storage.js';

interface CreateTRPCNextLayoutOptions<TRouter extends AnyTRPCRouter> {
  router: TRouter;
  createContext: () => MaybePromise<inferRouterContext<TRouter>>;
  transformer?: DataTransformer;
}

/**
 * @internal
 */
export type DecorateProcedure<TProcedure extends AnyTRPCProcedure> =
  TProcedure extends AnyTRPCQueryProcedure
    ? {
        fetch(
          input: inferProcedureInput<TProcedure>
        ): Promise<inferProcedureOutput<TProcedure>>;
        fetchInfinite(
          input: inferProcedureInput<TProcedure>
        ): Promise<inferProcedureOutput<TProcedure>>;
      }
    : never;

type OmitNever<TType> = Pick<
  TType,
  {
    [K in keyof TType]: TType[K] extends never ? never : K;
  }[keyof TType]
>;
/**
 * @internal
 */
export type DecoratedProcedureRecord<
  TProcedures extends CreateRouterOptions,
  TPath extends string = '',
> = OmitNever<{
  [TKey in keyof TProcedures]: TProcedures[TKey] extends AnyTRPCRouter
    ? DecoratedProcedureRecord<
        TProcedures[TKey]['_def']['record'],
        `${TPath}${TKey & string}.`
      >
    : TProcedures[TKey] extends AnyTRPCQueryProcedure
      ? DecorateProcedure<TProcedures[TKey]>
      : TProcedures[TKey] extends CreateRouterOptions
        ? DecoratedProcedureRecord<
            TProcedures[TKey],
            `${TPath}${TKey & string}.`
          >
        : never;
}>;

type CreateTRPCNextLayout<TRouter extends AnyTRPCRouter> =
  DecoratedProcedureRecord<TRouter['_def']['record']> & {
    dehydrate(): Promise<DehydratedState>;
  };

function getQueryKey(
  path: string[],
  input: unknown,
  isFetchInfinite?: boolean
) {
  return input === undefined
    ? [path, { type: isFetchInfinite ? 'infinite' : 'query' }] // We added { type: "infinite" | "query"  }, because it is how trpc v10.0 format the new queryKeys
    : [
        path,
        {
          input: { ...input },
          type: isFetchInfinite ? 'infinite' : 'query',
        },
      ];
}

/**
 * use the createTRPCNextLayout function to create a set of strongly-typed hooks from your API's type signature.
 * @param opts
 * @returns
 */
export function createTRPCNextLayout<TRouter extends AnyTRPCRouter>(
  opts: CreateTRPCNextLayoutOptions<TRouter>
): CreateTRPCNextLayout<TRouter> {
  function getState() {
    const requestStorage = getRequestStorage<{
      _trpc: {
        queryClient: QueryClient;
        context: MaybePromise<inferRouterContext<TRouter>>;
      };
    }>();
    requestStorage._trpc = requestStorage._trpc ?? {
      cache: Object.create(null),
      context: opts.createContext(),
      queryClient: new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
    };
    return requestStorage._trpc;
  }
  const transformer = opts.transformer ?? {
    serialize: (v) => v,
    deserialize: (v) => v,
  };

  return createRecursiveProxy(async (callOpts) => {
    const path = [...callOpts.path];
    const lastPart = path.pop();
    const state = getState();
    const ctx = await state.context;
    const { queryClient } = state;

    if (lastPart === 'dehydrate' && path.length === 0) {
      if (queryClient.isFetching()) {
        await new Promise<void>((resolve) => {
          const unsub = queryClient.getQueryCache().subscribe((event) => {
            if (event?.query.getObserversCount() === 0) {
              resolve();
              unsub();
            }
          });
        });
      }
      const dehydratedState = dehydrate(queryClient);

      return transformer.serialize(dehydratedState);
    }

    const fullPath = path.join('.');
    const procedure = opts.router._def.procedures[fullPath] as AnyTRPCProcedure;

    const type: TRPCProcedureType = 'query';

    const input = callOpts.args[0] as GetRawInputFn;
    const queryKey = getQueryKey(path, input, lastPart === 'fetchInfinite');

    if (lastPart === 'fetchInfinite') {
      return queryClient.fetchInfiniteQuery({
        queryKey: queryKey,
        queryFn: () =>
          procedure({
            getRawInput: async () => input,
            path: fullPath,
            ctx,
            type,
          }),
        initialPageParam: undefined,
      });
    }

    return queryClient.fetchQuery({
      queryKey: queryKey,
      queryFn: () =>
        procedure({
          getRawInput: async () => input,
          path: fullPath,
          ctx,
          type,
        }),
    });
  }) as CreateTRPCNextLayout<TRouter>;
}
