'use client';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { trpc } from '@/common/client-trpc';
import { type ISignUp, signUpSchema } from '@/common/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';

export const Signup = () => {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const t = useTranslations('SignUp');

  const { register, handleSubmit } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync } = trpc.auth.signUp.useMutation();

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      if (error) setError(undefined);
      const result = await mutateAsync(data);
      if (result.status === 201) {
        router.push('/login');
      } else {
        setError(JSON.stringify(result.message));
      }
    },
    [error, mutateAsync, router]
  );

  return (
    <form
      className="flex h-screen w-full items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body px-2 text-center">
          <h2 className="card-title">Create an account!</h2>
          <input
            type="text"
            placeholder="Type your username..."
            className="input input-bordered my-2 w-full max-w-xs p-1"
            {...register('username')}
          />
          <input
            type="username"
            placeholder="Type your username..."
            className="input input-bordered w-full max-w-xs p-1"
            {...register('username')}
          />
          <input
            type="password"
            placeholder="Type your password..."
            className="input input-bordered my-2 w-full max-w-xs p-1"
            {...register('password')}
          />
          {error && <p className="text-red-700">{t('error', { error })}</p>}

          <div className="card-actions my-2 flex items-center justify-between">
            <Link href="/login" className="border-spacing-4 border-blue-700">
              Go to login
            </Link>
            <button className="btn btn-secondary" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
