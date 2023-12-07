import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    // Makebe suite for local debug
    testTimeout: 1000 * 30,
    globals: true,
    environment: 'node',
    passWithNoTests: false,
    cache: {
      dir: '../../.cache/vitest/next-env',
    },
    coverage: {
      provider: 'istanbul',
      reporter: ['json-summary', 'html'],
      extension: ['js', 'jsx', 'ts', 'tsx'],
    },
    include: ['**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [
      '**/node_modules/**',
      'dist/**',
      '**/coverage/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
  },
});
