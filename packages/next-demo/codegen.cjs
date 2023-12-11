/**
 * https://the-guild.dev/graphql/codegen/docs/config-reference/config-field
 * @type {import('@graphql-codegen/cli').CodegenConfig}
 */
module.exports = {
  overwrite: true,
  config: {
    strict: true,
    namingConvention: {
      enumValues: 'keep',
    },
    skipTypeNameForRoot: true,
    dedupeFragments: true,
    inlineFragmentTypes: 'combine',
    scalars: {
      ID: 'string | number',
      Money: 'number',
    },
    maybeValue: 'T',
    deprecatedFieldsWithReason: true,
    inputValueDeprecation: true,
  },
  generates: {
    'src/generated-types.ts': {
      schema: 'http://localhost:3001/shop-api',
      documents: 'src/data/**/*.{ts,tsx}',
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        'typescript',
        'typescript-operations',
      ],
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};
