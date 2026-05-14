import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  const banners = await prisma.banner.findMany({
    orderBy: { sortOrder: 'asc' },
  });
  return Response.json(banners);
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { title, subtitle, image, link, active, sortOrder } = body;

  if (!title || !image) {
    return Response.json({ error: 'Title and image are required' }, { status: 400 });
  }

  try {
    const banner = await prisma.banner.create({
      data: {
        title,
        subtitle: subtitle || null,
        image,
        link: link || null,
        active: active !== false,
        sortOrder: Number(sortOrder) || 0,
      },
    });

    return Response.json(banner, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
