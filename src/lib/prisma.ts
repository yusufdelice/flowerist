import { PrismaClient } from '@/generated/prisma/client';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseUrl(): string {
  // If DATABASE_URL is already absolute, use it directly
  const envUrl = process.env.DATABASE_URL;
  if (envUrl && (envUrl.includes(':/'))) {
    return envUrl;
  }
  // Default to prisma/dev.db relative to project root
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
  return `file:${dbPath}`;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasourceUrl: getDatabaseUrl(),
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
