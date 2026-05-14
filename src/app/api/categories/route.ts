import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: { select: { products: true } },
    },
  });

  return Response.json(categories);
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, slug, image, sortOrder } = body;

  if (!name || !slug) {
    return Response.json({ error: 'Name and slug are required' }, { status: 400 });
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        image: image || null,
        sortOrder: Number(sortOrder) || 0,
      },
    });

    return Response.json(category, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
