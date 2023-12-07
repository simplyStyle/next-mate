import pic from 'picocolors';
import { type SafeParseSuccess } from 'zod';

/**
 * Prints the validated environment variables to the console
 * @param section The section of the environment variables
 * @param zodSafeParseSuccess The result of the zod safe parse
 */
export const printValidatedEnv = (
  section: 'Build env(s)' | 'Server env(s)',
  zodSafeParseSuccess: SafeParseSuccess<Record<string, unknown>>
) => {
  const hasProcess = typeof process !== 'undefined';
  const isRunningInNode = hasProcess && process !== undefined;
  const isTestEnv = hasProcess && process.env.NODE_ENV === 'test';

  if (isRunningInNode && !isTestEnv) {
    const prefix = pic.cyan('- info'.padEnd(7));
    console.info(prefix.concat(`${section} validation successful:`));
    for (const [key, value] of Object.entries(zodSafeParseSuccess.data)) {
      console.info(prefix.concat(`${key}=${value}`));
    }
  }
};
