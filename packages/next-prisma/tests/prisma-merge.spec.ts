import * as fs from 'node:fs';
import { promisify } from 'node:util';
import { prismaMerge } from '../src/index.js';

const readFile = promisify(fs.readFile);

test('merge prisma', async () => {
  const luciaPrismaContent = `
    model User {
        id String @unique
        name String
    }
`;

  await prismaMerge({
    luciaPrismaModel: luciaPrismaContent,
    input: ['tests/prisma/test1.prisma'],
    output: 'tests/prisma/testMerge1.prisma',
  });

  const prismaContent = await readFile('tests/prisma/testMerge1.prisma', {
    encoding: 'utf-8',
  });
  expect(prismaContent).toMatchSnapshot();
});

test('merge prisma cover', async () => {
  const luciaPrismaContent = `
      model User {
          id String @unique
          name String
      }
  `;

  await prismaMerge({
    luciaPrismaModel: luciaPrismaContent,
    input: ['tests/prisma/test1.prisma', 'tests/prisma/test2.prisma'],
    output: 'tests/prisma/testMerge2.prisma',
  });

  const prismaContent = await readFile('tests/prisma/testMerge2.prisma', {
    encoding: 'utf-8',
  });
  expect(prismaContent).toMatchSnapshot();
});
