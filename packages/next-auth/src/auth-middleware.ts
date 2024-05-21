import { NextResponse, type NextRequest } from 'next/server.js';
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

  port: string;
  luciaAuthUrl: string;
  luciaAuthSecret: string;
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
  config: AuthMiddlewareOptions = {
    port: '',
    luciaAuthUrl: '',
    luciaAuthSecret: '',
  }
) => {
  try {
    const cookie = request.headers.get('cookie') || '';
    const { port, luciaAuthSecret } = config;
    const localBaseUrl = (
      config.localBaseUrl ? config.localBaseUrl : `http://127.0.0.1:${port}`
    ).replace(/\/$/, '');

    const localFetchCode = config.localFetchCode || luciaAuthSecret;

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
    config: AuthMiddlewareOptions = {
      port: '',
      luciaAuthUrl: '',
      luciaAuthSecret: '',
    }
  ) =>
  async (req: NextRequest) => {
    // Wrapper a proxy to make `getSession` work for `edg` runtime mode.
    try {
      const session = await getSession(req, config);
      if (!session) {
        const { luciaAuthUrl } = config;
        const loginPage = `/login`;
        const wantToPathname = req.nextUrl.pathname;
        const wantToHref = luciaAuthUrl
          ? `${ensureSlash(luciaAuthUrl)}${wantToPathname}`
          : req.nextUrl.href;

        if (wantToPathname !== loginPage) {
          // Redirect to signin page by default if not authorized
          req.nextUrl.pathname = loginPage;
          req.nextUrl.searchParams.set(`callbackUrl`, wantToHref);
          return NextResponse.redirect(req.nextUrl);
        }
      }
    } catch (error) {
      console.log('error', error);
    }

    return nextMiddleware(req);
  };
