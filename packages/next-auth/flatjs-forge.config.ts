import { defineConfig } from '@flatjs/forge';

export default defineConfig({
  input: ['src/index.ts', 'src/providers/index.ts'],
  dts: {
    compilationOptions: {
      followSymlinks: false,
      preferredConfigPath: 'tsconfig.build.json',
    },
    entryPointOptions: {
      libraries: {
        importedLibraries: ['next', 'zod'],
      },
    },
    dtsFilter: (dtsFile) =>
      dtsFile.split('/').length <= 2 && /index.d.ts/.test(dtsFile),
  },
  plugin: {
    pluginConfigs: {
      babelOptions: {
        usePreset: 'react',
      },
    },
  },
  output: {
    format: 'esm',
    preserveModules: true,
  },
});
