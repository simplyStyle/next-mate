import * as fs from 'node:fs';
import * as path from 'node:path';
import { promisify } from 'node:util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const prismaInputFile = path.join(
  process.cwd(),
  '/src/adapters/prisma/lucia.prisma'
);

const prismaOutputFile = path.join(
  process.cwd(),
  '/src/adapters/lucia-prisma.ts'
);

async function copyPrismaFile() {
  const prismaContent = await readFile(prismaInputFile);
  const prismaOutputContent =
    '/** auto generated code by "yarn generate" */\n' +
    'export const luciaPrismaContent = `' +
    prismaContent +
    '`;\n';
  await writeFile(prismaOutputFile, prismaOutputContent);
}

copyPrismaFile()
  .then(() => {
    console.log('copy prisma content to luciaPrisma.js success!');
  })
  .catch((err) => {
    console.log('copy prisma content fail: ', err);
  });
