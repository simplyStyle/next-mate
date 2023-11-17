import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    /** Oauth access token */
    accessToken: string;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      /** Oauth access token */
      accessToken: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    accessToken: string;
  }
}
