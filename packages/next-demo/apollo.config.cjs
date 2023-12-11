// https://github.com/apollographql/apollo/blob/main/docs/source/devtools/apollo-config.md
module.exports = {
  client: {
    service: {
      name: 'shop',
      // localSchemaFile: './schema-shop.json',
      url: 'http://localhost:3001/shop-api',
    },
    includes: ['./src/data/**/*.ts'],
  },
};
