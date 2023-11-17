'use client';

import { redirect, usePathname } from 'next/navigation';

// Can be imported from a shared config
const defaultLocale = 'en';

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.
// Catching non-localized requests
export default function NotFound() {
  const pathname = usePathname();

  // Add a locale prefix to show a localized not found page
  redirect(`/${defaultLocale}${pathname}`);
}
