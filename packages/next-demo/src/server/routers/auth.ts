import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LuciaError } from 'lucia';
import { cookies, headers } from 'next/headers';
import { auth } from '@/auth/lucia';
import { loginSchema, signUpSchema } from '@/common/validation/auth';
import { publicProcedure, router } from '../trpc';

export const authRouter = router({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, email, password } = input;
      try {
        // create user
        const user = await auth.createUser({
          key: {
            providerId: 'email', // auth method
            providerUserId: email.toLowerCase(), // unique id when using "username" auth method
            password, // hashed by Lucia
          },
          attributes: {
            username,
            email,
          },
        });

        // create session
        const session = await auth.createSession({
          userId: user.userId,
          attributes: {},
        });

        // create auth request
        const authRequest = auth.handleRequest(ctx.req?.method || 'post', {
          headers,
          cookies,
        });
        // create session & cookies
        authRequest.setSession(session);

        return {
          status: 201,
          message: 'Account created successfully',
        };
      } catch (err) {
        if (
          err instanceof PrismaClientKnownRequestError &&
          err.code === 'P2002'
        ) {
          return {
            status: 400,
            message: 'USER_ALREADY_EXISTS',
          };
          // throw new TRPCError({
          //   code: 'CONFLICT',
          //   message: 'USER_ALREADY_EXISTS',
          // });
        }
        return {
          status: 500,
          message: 'INTERNAL_SERVER_ERROR',
        };
        // throw new TRPCError({
        //   code: 'INTERNAL_SERVER_ERROR',
        //   message: 'An unknown error occurred',
        // });
      }
    }),

  signIn: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      try {
        // find user by key and validate password
        const key = await auth.useKey('email', email.toLowerCase(), password);

        // create session
        const session = await auth.createSession({
          userId: key.userId,
          attributes: {},
        });

        // create auth request
        const authRequest = auth.handleRequest(ctx.req?.method || 'post', {
          headers,
          cookies,
        });

        // create session & cookies
        authRequest.setSession(session);

        return {
          status: 200,
          message: 'Login created successfully',
        };
      } catch (err) {
        if (
          err instanceof LuciaError &&
          (err.message === 'AUTH_INVALID_KEY_ID' ||
            err.message === 'AUTH_INVALID_PASSWORD')
        ) {
          // user does not exist, or invalid password
          return {
            err,
            status: 400,
            message: 'CredentialsSignin',
          };
        }
        return {
          err,
          status: 500,
          message: 'An unknown error occurred',
        };
      }
    }),
});
