import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { loginSchema, signUpSchema } from '@/common/validation/auth';
import { signIn } from '@/config/auth';
import { publicProcedure, router } from '../trpc';

export const authRouter = router({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, email, password } = input;
      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists.',
        });
      }
      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: { username, email, password: hashedPassword },
      });
      return {
        status: 201,
        message: 'Account created successfully',
        result: result.email,
      };
    }),

  signIn: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const { email, password } = input;
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      return {
        status: 200,
        data: result,
        message: 'Login created successfully',
      };
    } catch (err) {
      return {
        status: 400,
        err,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message: (err as any).message,
      };
    }
  }),
});
