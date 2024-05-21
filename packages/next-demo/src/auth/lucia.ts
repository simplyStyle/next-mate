import {
  Lucia,
  PrismaAdapter,
  TimeSpan,
  createGithubProvider,
  createPasswordProvider,
} from '@hyperse-io/next-auth';
import { env } from '@/config/env';
import { prisma as prismaClient } from '@/server/prisma';

export const auth = new Lucia(new PrismaAdapter(prismaClient), {
  sessionExpiresIn: new TimeSpan(1, 'd'),
  sessionCookie: {
    attributes: {
      secure: process.env.IS_DEV == 'false',
    },
  },
});

export type Auth = typeof auth;

export const githubAuth = createGithubProvider({
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
});

export const passwordAuth = createPasswordProvider({
  lucia: auth,
});
