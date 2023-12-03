import { type Auth } from 'lucia';
import { headers, cookies } from 'next/headers.js';
import { NextResponse, type NextRequest } from 'next/server.js';
import { authEnv } from '../auth-env.js';

export const logoutHandler = async (
  auth: Auth,
  request: NextRequest,
  handler?: (request: NextRequest) => Promise<void>
) => {
  const authRequest = auth.handleRequest(request.method, {
    headers,
    cookies,
  });
  // check if user is authenticated
  const session = await authRequest.validate();
  if (!session) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  // customized logout handle?
  await handler?.(request);

  // make sure to invalidate the current session!
  await auth.invalidateSession(session.sessionId);
  // delete session cookie
  authRequest.setSession(null);
  // redirect to login page
  return NextResponse.redirect(new URL('/login', authEnv?.LUCIA_AUTH_URL));
};
