import { OAuthRequestError } from '@lucia-auth/oauth';
import { type GithubAuth } from '@lucia-auth/oauth/providers';
import { type Auth } from 'lucia';
import { cookies, headers } from 'next/headers.js';
import { NextResponse, type NextRequest } from 'next/server.js';
import { getSession } from '../../utils/index.js';

const COOKIE_STATES = 'github_oauth_state';
const REDIRECT_URI_WITH_RETURN_URI = 'return_uri';

export const authorizeHandler = async (
  auth: Auth,
  provider: GithubAuth,
  request: NextRequest
) => {
  const session = await getSession(auth, request.method);
  if (session) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  }

  const returnUrl = request.nextUrl.searchParams.get('callbackUrl') || '/';

  // You can get a new authorization url with getAuthorizationUrl(). It will return a url and a state.
  const [url, state] = await provider.getAuthorizationUrl();

  const redirectUri = url.searchParams.get('redirect_uri');

  const redirectUriWithReturnUri =
    redirectUri?.toString() +
    `?${REDIRECT_URI_WITH_RETURN_URI}=${encodeURIComponent(returnUrl)}`;

  url.searchParams.set('redirect_uri', redirectUriWithReturnUri);

  const finalRedirectUri = url.toString();

  cookies().set(COOKIE_STATES, state, {
    path: '/',
    // only readable in the server
    httpOnly: true,
    // set to `true` in production (HTTPS)
    secure: process.env.NODE_ENV === 'production',
    // a reasonable expiration date, seconds
    maxAge: 60 * 60,
  });

  // redirect to authorization url
  return NextResponse.redirect(finalRedirectUri, {
    status: 302,
  });
};

/**
 * Upon authentication, the provider will redirect the user back to your application (GET request).
 * The url includes a code, and a state if the provider supports it. If a state is used, make sure to check if the state in the query params is the same as the one stored as a cookie.
 * @returns
 */
export const authorizeCallbackHandler = async (
  auth: Auth,
  provider: GithubAuth,
  request: NextRequest
) => {
  const authRequest = auth.handleRequest(request.method, {
    headers,
    cookies,
  });

  const session = await authRequest.validate();
  if (session) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  }

  const cookieStore = cookies();
  const storedState = cookieStore.get(COOKIE_STATES)?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');

  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const { getExistingUser, githubUser, createUser } =
      await provider.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      return await createUser({
        attributes: {
          username: githubUser.login,
          email: githubUser.email || '',
        },
      });
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    authRequest.setSession(session);

    const callbackUrl =
      request.nextUrl.searchParams.get(REDIRECT_URI_WITH_RETURN_URI) || '/';

    return new Response(null, {
      status: 302,
      headers: {
        Location: callbackUrl,
      },
    });
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
