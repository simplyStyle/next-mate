import { prismaMerge } from '@hyperse-io/next-prisma';
import { luciaPrismaContent } from '@hyperse-io/next-auth';

prismaMerge({
  prePrismaModel: luciaPrismaContent,
  input: ['prisma/base.prisma'],
})
  .then(() => {
    console.log('merge prisma file success!');
  })
  .catch((err) => {
    console.log('merge prisma file fail: ', err);
  });
