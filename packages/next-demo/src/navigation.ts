import {
  createLocalizedPathnamesNavigation,
  type Pathnames,
} from 'next-intl/navigation';

export const locales = ['en', 'de'] as const;

// https://next-intl-docs.vercel.app/docs/routing/navigation#shared-pathnames
export const pathnames = {
  '/': '/',
  '/pathnames': {
    en: '/pathnames',
    de: '/pfadnamen',
  },
  '/secret': '/secret',
  '/login': '/login',
  '/sign-up': '/sign-up',
  '/api/auth/signout': '/api/auth/signout',
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
  });
