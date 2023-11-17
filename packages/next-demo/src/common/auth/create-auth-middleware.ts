import { type NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authBaseConfig } from '../../config/auth-base-config';

/**
 * 此处考虑到 authMiddleware会在全局middleware中使用，但是middleware 并不支持`argon2`库
 * 实际上 middleware 也不需要使用 authMiddleware，因为middleware中的authMiddleware只是用来做权限校验的
 */
const { auth } = NextAuth({
  ...authBaseConfig,
  providers: [],
});

export const creteAuthMiddleware = (
  nextMiddleware: (request: NextRequest) => NextResponse<unknown>
) =>
  auth(
    // Note that this callback is only invoked if
    // the `authorized` callback has returned `true`
    // and not for pages listed in `pages`.
    (req) => {
      if (!req.auth) {
        const signInPage =
          authBaseConfig.pages?.signIn ?? `${req.nextUrl.basePath}}/signin`;

        const wantToHref = req.nextUrl.href;
        const wantToPathname = req.nextUrl.pathname;

        if (wantToPathname !== signInPage) {
          // Redirect to signin page by default if not authorized
          req.nextUrl.pathname = signInPage;
          req.nextUrl.searchParams.set('callbackUrl', wantToHref);
          return NextResponse.redirect(req.nextUrl);
        }
      }
      return nextMiddleware(req);
    }
  );
