import { fileURLToPath } from 'url';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: [],
  },
  cacheDir: '../../.cache/vitest/next-demo',
  test: {
    setupFiles: 'dotenv/config',
    globals: true,
    exclude: [...configDefaults.exclude, '**/playwright/**'],
    alias: {
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
  },
});
