import { z } from 'zod';

const envSchema = z.object({
  // Prisma
  DATABASE_URL: z.string().url(),

  // NODE_ENV
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string(),

  // OAUTH2
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),

  // LUCIA_AUTH_URL
  LUCIA_AUTH_URL: z.string().url(),
  LUCIA_AUTH_SECRET: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsedEnv.error.format(), null, 4)
  );
  process.exit(1);
}

export const env = parsedEnv.data;
