'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '@/common/client-trpc';
import {
  loginSchema,
  type ISignUp,
  type ILogin,
} from '@/common/validation/auth';
import { GithubLoginButton } from '@/components/GithubLoginButton';
import { LayoutPage } from '@/components/LayoutPage';
import { NavigationLink } from '@/components/NavigationLink';

export default function Login() {
  const t = useTranslations('Login');
  const [error, setError] = useState<string>();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const { register, handleSubmit } = useForm<ISignUp>({
    resolver: zodResolver(loginSchema),
  });
  const { mutateAsync } = trpc.auth.signIn.useMutation();

  const onSubmit = useCallback(
    async (data: ILogin) => {
      if (error) setError(undefined);
      const result = await mutateAsync(data);
      if (result!.status === 200) {
        window.location.href = callbackUrl;
      } else {
        setError(result.message);
      }
    },
    [callbackUrl, error, mutateAsync]
  );

  return (
    <LayoutPage title={t('title')}>
      <div className="mx-auto flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="/api/auth/callback/credentials"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                {t('email')}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  {...register('email')}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  {t('password')}
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  {...register('password')}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {t('submit')}
              </button>
            </div>
            {error && <p className="text-red-700">{t('error', { error })}</p>}
          </form>
          <div
            className="mt-4 flex w-full items-center justify-center rounded px-7 py-2 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            style={{ backgroundColor: '#000000' }}
          >
            <GithubLoginButton callbackUrl={callbackUrl} />
          </div>
          <p className="mt-10 text-center text-sm text-gray-400">
            Not a member?{' '}
            <NavigationLink href={'/signup'}>Signup</NavigationLink>
          </p>
        </div>
      </div>
    </LayoutPage>
  );
}
