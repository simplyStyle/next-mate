import { use } from 'react';
import { useTranslations } from 'next-intl';
import { rsc } from '@/server/rsc';
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import { NavigationLink } from './NavigationLink';

export function Navigation() {
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
            <div className="inline-flex">
              <div className="mx-2">
                {' '}
                Hi <em>{user.username}</em>
              </div>{' '}
              <LogoutButton />
            </div>
          ) : (
            <>
              <NavigationLink href={'/login'}>Login</NavigationLink>
            </>
          )}
        </div>
        <LocaleSwitcher />
      </nav>
    </div>
  );
}
