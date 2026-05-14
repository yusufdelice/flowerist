import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  let settings = await prisma.siteSettings.findUnique({ where: { id: 'main' } });
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        id: 'main',
        phone: '+90 (216) 555 0123',
        whatsapp: '+902165550123',
        email: 'info@lotuscicekcilik.com',
        address: 'Bağdat Cad. No:123, Kadıköy/İstanbul',
        instagram: 'lotuscicekcilik',
        aboutText: '',
        footerText: '',
      },
    });
  }
  return Response.json(settings);
}

export async function PUT(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: 'main' },
      update: {
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        address: body.address,
        instagram: body.instagram,
        aboutText: body.aboutText,
        footerText: body.footerText,
      },
      create: {
        id: 'main',
        phone: body.phone || '',
        whatsapp: body.whatsapp || '',
        email: body.email || '',
        address: body.address || '',
        instagram: body.instagram || '',
        aboutText: body.aboutText || '',
        footerText: body.footerText || '',
      },
    });

    return Response.json(settings);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
