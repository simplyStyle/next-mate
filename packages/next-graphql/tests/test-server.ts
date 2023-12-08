import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import mercurius, { type IResolvers } from 'mercurius';
import { getBooks, usersData } from './mock-data.js';

const app: FastifyInstance = Fastify({
  logger: process.env.NODE_ENV === 'development',
});

app.post('/users', async () => {
  return {
    data: usersData,
  };
});

const typeDef = `
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book!]!
  }
`;

const resolvers: IResolvers = {
  Query: {
    books: async () => {
      return getBooks();
    },
  },
};

app.register(mercurius.default, {
  schema: typeDef,
  resolvers: resolvers,
});

export const startTestAppServer = async () => {
  await app.listen();
  await app.ready();
  const address = app.server.address();
  const port = typeof address === 'string' ? address : address?.port;
  return {
    app,
    port,
  };
};
