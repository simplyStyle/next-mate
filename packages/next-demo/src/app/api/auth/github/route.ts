import { authorizeHandler } from '@hyperse-io/next-auth';
import { type NextRequest } from 'next/server';
import { auth, githubAuth } from '@/auth/lucia';

export const GET = async (request: NextRequest) => {
  return authorizeHandler(auth, githubAuth, request);
};
