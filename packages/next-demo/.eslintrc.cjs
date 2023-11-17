// Workaround for https://github.com/eslint/eslint/issues/3458 (re-export of @rushstack/eslint-patch)
require('@armit/eslint-config-bases/patch/modern-module-resolution');

const {
  getDefaultIgnorePatterns,
} = require('@armit/eslint-config-bases/helpers');

module.exports = {
  root: true,
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: [
    '@armit/eslint-config-bases/typescript',
    '@armit/eslint-config-bases/sonar',
    '@armit/eslint-config-bases/regexp',
    '@armit/eslint-config-bases/vitest',
    '@armit/eslint-config-bases/react',
    '@armit/eslint-config-bases/tailwind',
    // Apply prettier and disable incompatible rules
    '@armit/eslint-config-bases/prettier',
    'plugin:@next/next/recommended',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // https://github.com/vercel/next.js/discussions/16832
    '@next/next/no-img-element': 'off',
    // For the sake of example
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 'off',
    'vitest/max-nested-describe': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
  overrides: [
    {
      files: ['e2e/**/*.{ts,tsx}'],
      rules: {
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['src/**/*.{ts,tsx}'],
      rules: {
        'react/display-name': 'off',
      },
    },
    {
      files: ['src/**/route.ts', 'src/navigation.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['variable'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          },
        ],
      },
    },
    {
      files: ['src/backend/**/*graphql*schema*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            // Fine-tune naming convention for graphql resolvers and allow PascalCase
            selector: ['objectLiteralProperty'],
            format: ['camelCase', 'PascalCase'],
          },
        ],
      },
    },
  ],
};
