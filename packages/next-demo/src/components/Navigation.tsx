import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { use } from 'react';
import { rsc } from '@/server/rsc';
import { LocaleSwitcher } from './LocaleSwitcher';
import { NavigationLink } from './NavigationLink';

export function Navigation() {
  const locale = useLocale();
  const t = useTranslations('Navigation');
  const user = use(rsc.whoami.fetch());
  return (
    <div className="bg-slate-850">
      <nav className="flex justify-between bg-slate-600 p-2 text-white">
        <div>
          <NavigationLink href="/">{t('home')}</NavigationLink>
          <NavigationLink href="/pathnames">{t('pathnames')}</NavigationLink>
          <NavigationLink href="/secret">Secret page</NavigationLink>
          {user ? (
            <>
              Hi <em>{user.email}</em>. {user.name}{' '}
              <Link href="/api/auth/signout" className="underline">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link href={locale + '/login'}>Login</Link>
            </>
          )}
        </div>
        <LocaleSwitcher />
      </nav>
    </div>
  );
}
