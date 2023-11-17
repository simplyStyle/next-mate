'use client';

import superjson from 'superjson';
import { createHydrateClient } from './create-hydrate-client.jsx';

export const HydrateClient = createHydrateClient({
  transformer: superjson,
});
