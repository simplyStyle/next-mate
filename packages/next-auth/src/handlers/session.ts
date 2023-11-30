import { type Auth } from 'lucia';
import { type NextRequest } from 'next/server.js';
import { getSession } from '../utils/get-session.js';

export const sessionHandler = async (
  auth: Auth,
  req: NextRequest,
  authCode?: string
) => {
  const code = req.nextUrl.searchParams.get('code');

  const localFetchCode = authCode || process.env.LUCIA_AUTH_SECRET;

  // FIXME: validate here, this method only patched `middleware` for `edg` runtime mode.
  if (code !== localFetchCode) {
    return Response.json(null);
  }
  // USE `GET` to skip `csrfProtection` of lucia.
  const session = await getSession(auth, 'GET');
  return Response.json(session);
};
