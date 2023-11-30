'use client';

import { transformer } from '../transformer.js';
import { createHydrateClient } from './create-hydrate-client.jsx';

export const HydrateClient = createHydrateClient({
  transformer,
});
