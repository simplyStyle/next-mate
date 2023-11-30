import { fileURLToPath } from 'url';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: [],
  },
  test: {
    globals: true,
    exclude: [...configDefaults.exclude, '**/playwright/**'],
    cache: {
      dir: '../../.cache/vitest/next-demo',
    },
    alias: {
      '~/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
  },
});
