import { luciaPrismaContent } from '@hyperse-io/next-auth';
import { prismaMerge } from '@hyperse-io/next-prisma';
import dotenv from 'dotenv';

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
