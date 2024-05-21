import { type NextRequest } from 'next/server.js';
import { type Lucia } from '../lucia/index.js';
import { getSession } from '../utils/get-session.js';

export const sessionHandler = async (
  lucia: Lucia,
  req: NextRequest,
  authCode?: string
) => {
  const code = req.nextUrl.searchParams.get('code');

  const localFetchCode = authCode;

  // FIXME: validate here, this method only patched `middleware` for `edg` runtime mode.
  if (code !== localFetchCode) {
    return Response.json(null);
  }
  // USE `GET` to skip `csrfProtection` of lucia.
  const sessions = await getSession(lucia);
  return Response.json(sessions?.session || null);
};
