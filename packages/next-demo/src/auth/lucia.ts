import { createGithub } from '@hyperse-io/next-auth';
import { prisma } from '@lucia-auth/adapter-prisma';
import { lucia } from 'lucia';
import { nextjs_future } from 'lucia/middleware';
import { env } from '@/config/env';
import { prisma as prismaClient } from '@/server/prisma';

export const auth = lucia({
  adapter: prisma(prismaClient, {
    key: 'key', // model Key {}
    user: 'user', // model User {}
    session: 'session', // model Session {}
  }),
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    return {
      username: data.username,
      email: data.email,
    };
  },
});

export type Auth = typeof auth;

export const githubAuth = createGithub(auth, {
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
});
