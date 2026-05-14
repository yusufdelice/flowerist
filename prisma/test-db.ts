import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

prisma.product.count()
  .then((count: number) => {
    console.log('Product count:', count);
    return prisma.$disconnect();
  })
  .catch((e: Error) => {
    console.error('Error:', e.message);
    return prisma.$disconnect();
  });
