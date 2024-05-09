import { type NextConfig } from 'next';
import { type z, type ZodSchema } from 'zod';
import { printValidatedEnv } from './print-validated-env.js';

/**
 * The type of a next config plugin
 */
export type NextConfigPlugin = (config?: NextConfig | undefined) => NextConfig;

/**
 * Normalize the next config by applying plugins
 * @param initConfig The initial next config
 * @param plugins The plugins to apply
 * @returns The normalized next config
 */
export const getNextConfig = (
  initConfig: NextConfig,
  plugins: Array<NextConfigPlugin> = []
) => {
  return plugins.reduce((config, plugin) => plugin(config), initConfig);
};

/**
 * The utility used to get validated environment variables for next build & dev from next.config.mjs
 * @example
 * ```ts
 * const env = createConfigEnv(z.object({ PORT: z.string().optional() }));
 * env.PORT; // string | undefined
 * ```
 * @returns The validated environment variables
 */
export const getNextConfigEnv = <T extends ZodSchema>(
  zodSchema: T,
  options?: {
    env?: Record<string, string | undefined>;
    isProd?: boolean;
  }
): z.infer<T> => {
  const parsedEnv = zodSchema.safeParse(options?.env ?? process.env);

  if (!parsedEnv.success) {
    console.error(
      '❌ Invalid environment variables:',
      JSON.stringify(parsedEnv.error.format(), null, 4)
    );
    process.exit(1);
  }
  printValidatedEnv(
    options?.isProd ? 'Build env(s)' : 'Server env(s)',
    parsedEnv
  );

  return parsedEnv.data;
};
