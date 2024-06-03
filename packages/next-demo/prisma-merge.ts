import dotenv from 'dotenv';
import { luciaPrismaContent } from '@hyperse/next-auth';
import { prismaMerge } from '@hyperse/next-prisma';

dotenv.config();

prismaMerge({
  luciaPrismaModel: luciaPrismaContent,
  input: ['prisma/base.prisma'],
})
  .then(() => {
    console.log('merge prisma file success!');
  })
  .catch((err) => {
    console.log('merge prisma file fail: ', err);
  });
