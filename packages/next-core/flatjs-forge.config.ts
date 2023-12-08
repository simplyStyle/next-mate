import { defineConfig } from '@flatjs/forge';
import preserveDirectives from 'rollup-plugin-preserve-directives';

export default defineConfig({
  input: ['src/index.ts', 'src/client/index.ts', 'src/trpc/index.ts'],
  dts: {
    compilationOptions: {
      followSymlinks: false,
      preferredConfigPath: 'tsconfig.build.json',
    },
    entryPointOptions: {
      libraries: {
        importedLibraries: [
          'superjson',
          '@tanstack/query-core',
          '@tanstack/react-query',
          '@trpc/server',
          'next',
          'react',
        ],
      },
    },
    dtsFilter: (dtsFile) =>
      dtsFile.split('/').length <= 2 && /index.d.ts/.test(dtsFile),
  },
  externals: ['rollup-plugin-preserve-directives'],
  plugin: {
    pluginConfigs: {
      babelOptions: {
        usePreset: 'react',
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extraPlugins: [(preserveDirectives as any)()],
  },
  output: {
    format: 'esm',
    preserveModules: true,
  },
});
