'use client';

import { useMemo } from 'react';
import {
  type DehydratedState,
  HydrationBoundary as Hydrate,
} from '@tanstack/react-query';
import type { DataTransformer } from '@trpc/server/unstable-core-do-not-import';

export function createHydrateClient(opts: { transformer?: DataTransformer }) {
  return function HydrateClient(props: {
    children: React.ReactNode;
    state: DehydratedState;
  }) {
    const { state, children } = props;

    const transformedState: DehydratedState = useMemo(() => {
      if (opts.transformer) {
        return opts.transformer.deserialize(state);
      }
      return state;
    }, [state]);
    return <Hydrate state={transformedState}>{children}</Hydrate>;
  };
}
