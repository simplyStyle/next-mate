import { type NextAuthConfig } from 'next-auth';

export const authBaseConfig: Omit<NextAuthConfig, 'providers'> = {
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken,
        },
      };
    },
  },
  session: {
    strategy: 'jwt',
  },
  // 'super-secret',
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  trustHost: true,
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
};
