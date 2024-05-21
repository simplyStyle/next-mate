import { logoutHandler } from '@hyperse-io/next-auth';
import { type NextRequest } from 'next/server';
import { auth } from '@/auth/lucia';
import { env } from '@/config/env';

const handleLogout = (request: NextRequest) => {
  return logoutHandler(auth, request, {
    logoutPath: env.LUCIA_AUTH_URL,
  });
};

export const GET = (request: NextRequest) => {
  return handleLogout(request);
};

export const POST = (request: NextRequest) => {
  // Modify the implementation of the POST function here
  return handleLogout(request);
};
