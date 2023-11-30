import { NextResponse, type NextRequest } from 'next/server.js';
import { authEnv } from './auth-env.js';
import { ensureSlash } from './utils/auth-utils.js';

type AuthMiddlewareOptions = {
  /**
   * The base service path for local internal `fetch` requests
   */
  localBaseUrl?: string;
  /**
   * The Internal request verification code, Will be consumed by `api/auth/session`
   */
  localFetchCode?: string;
};

/**
 * FIXME:
 * The `getSession` which is exported from `lucia.ts`, cannot be used directly here because `middleware` does not currently support prisma's edg runtime mode.
 * https://github.com/vercel/next.js/discussions/46722
 * https://github.com/vercel/next.js/discussions/46722
 * https://github.com/Aayush-Rajagopalan/next13-prisma-edge
 */
const getSession = async (
  request: NextRequest,
  config: AuthMiddlewareOptions = {}
) => {
  try {
    const cookie = request.headers.get('cookie') || '';
    const localBaseUrl = (
      config.localBaseUrl
        ? config.localBaseUrl
        : `http://127.0.0.1:${authEnv?.PORT}`
    ).replace(/\/$/, '');

    const localFetchCode = config.localFetchCode || authEnv?.LUCIA_AUTH_SECRET;

    const res = await fetch(
      `${localBaseUrl}/api/auth/session?code=${localFetchCode}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          cookie,
          'Content-Type': 'application/json',
          Origin: request.nextUrl.origin,
        },
      }
    );
    return await res.json();
  } catch (error) {
    return null;
  }
};

export const createAuthMiddleware =
  (
    nextMiddleware: (request: NextRequest) => NextResponse<unknown>,
    config: AuthMiddlewareOptions = {}
  ) =>
  async (req: NextRequest) => {
    // Wrapper a proxy to make `getSession` work for `edg` runtime mode.
    const session = await getSession(req, config);
    if (!session) {
      const loginPage = `/login`;
      const wantToPathname = req.nextUrl.pathname;
      const wantToHref = authEnv?.LUCIA_AUTH_URL
        ? `${ensureSlash(authEnv?.LUCIA_AUTH_URL)}${wantToPathname}`
        : req.nextUrl.href;

      if (wantToPathname !== loginPage) {
        // Redirect to signin page by default if not authorized
        req.nextUrl.pathname = loginPage;
        req.nextUrl.searchParams.set(`callbackUrl`, wantToHref);
        return NextResponse.redirect(req.nextUrl);
      }
    }
    return nextMiddleware(req);
  };
