import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 20;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const featured = searchParams.get('featured');
  const inStock = searchParams.get('inStock');

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
      { tags: { contains: search } },
    ];
  }

  if (category) {
    where.categoryId = category;
  }

  if (featured !== null && featured !== undefined && featured !== '') {
    where.featured = featured === 'true';
  }

  if (inStock !== null && inStock !== undefined && inStock !== '') {
    where.inStock = inStock === 'true';
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return Response.json({
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, slug, description, price, categoryId, tags, images, featured, inStock, sortOrder } = body;

  if (!name || !slug || !description || !price || !categoryId) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: Number(price),
        categoryId,
        tags: tags || '',
        images: images || '[]',
        featured: Boolean(featured),
        inStock: inStock !== false,
        sortOrder: Number(sortOrder) || 0,
      },
      include: { category: true },
    });

    return Response.json(product, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
