import { z } from 'zod';

const authEnvSchema = z.object({
  // NODE_ENV
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string(),

  // LUCIA_AUTH_URL
  LUCIA_AUTH_URL: z.string().url(),
  LUCIA_AUTH_SECRET: z.string(),
});

const parsedEnv = authEnvSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error(
    '❌ Invalid Auth environment variables:',
    JSON.stringify(parsedEnv.error.format(), null, 4)
  );
}
export const authEnv = parsedEnv.success ? parsedEnv.data : null;
