import { logoutHandler } from '@hyperse-io/next-auth';
import { type NextRequest } from 'next/server';
import { auth } from '@/auth/lucia';

export const GET = (request: NextRequest) => {
  return logoutHandler(auth, request);
};

export const POST = (request: NextRequest) => {
  return logoutHandler(auth, request);
};
