import { verify } from 'argon2';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '@/common/validation/auth';
import { prisma } from '@/server/prisma';
import { authBaseConfig } from './auth-base-config';

export const {
  auth,
  signOut,
  signIn,
  handlers: { GET, POST },
} = NextAuth({
  ...authBaseConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@mail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const creds = await loginSchema.safeParse(credentials);
        if (!creds.success) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: { email: creds.data.email },
        });

        if (!user) {
          return null;
        }

        const isValidPassword = await verify(
          user.password,
          creds.data.password
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: String(user.id),
          email: user.email,
          username: user.username,
          accessToken: String(user.id),
        };
      },
    }),
  ],
});
