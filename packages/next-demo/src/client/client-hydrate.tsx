'use client';

import superjson from 'superjson';
import { createHydrateClient } from '@/next-layout/create-hydrate-client';

export const HydrateClient = createHydrateClient({
  transformer: superjson,
});
