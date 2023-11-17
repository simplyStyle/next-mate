'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '@/common/trpc-client';
import { type ISignUp, signUpSchema } from '@/common/validation/auth';

export const Signup = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync } = trpc.auth.signUp.useMutation();

  const onSubmit = useCallback(
    async (data: ISignUp) => {
      const result = await mutateAsync(data);
      if (result.status === 201) {
        router.push('/');
      }
    },
    [mutateAsync, router]
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
            type="email"
            placeholder="Type your email..."
            className="input input-bordered w-full max-w-xs p-1"
            {...register('email')}
          />
          <input
            type="password"
            placeholder="Type your password..."
            className="input input-bordered my-2 w-full max-w-xs p-1"
            {...register('password')}
          />
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
