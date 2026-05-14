import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🖼️ Updating product images...');

  const imageMap: Record<string, string[]> = {
    'kirmizi-gul-buketi': ['/uploads/red-roses.png'],
    'beyaz-papatya-buketi': ['/uploads/daisy.png'],
    'pembe-gul-lilyum': ['/uploads/pink-roses.png'],
    'orkide-aranjmani': ['/uploads/orchid.png'],
    'silindir-kutuda-guller': ['/uploads/box-roses.png'],
  };

  for (const [slug, images] of Object.entries(imageMap)) {
    await prisma.product.update({
      where: { slug },
      data: { images: JSON.stringify(images) },
    });
    console.log(`  ✅ ${slug}`);
  }

  // Create a banner
  await prisma.banner.create({
    data: {
      title: 'Doğanın En Güzel Hali',
      subtitle: 'Lotus Çiçekçilik',
      image: '/uploads/hero-banner.png',
      link: '/cicekler',
      active: true,
      sortOrder: 1,
    },
  });
  console.log('✅ Created hero banner');

  // Update categories with images
  const catImages: Record<string, string> = {
    'buketler': '/uploads/red-roses.png',
    'aranjmanlar': '/uploads/orchid.png',
    'kutuda-cicekler': '/uploads/box-roses.png',
  };

  for (const [slug, image] of Object.entries(catImages)) {
    await prisma.category.update({
      where: { slug },
      data: { image },
    });
    console.log(`  ✅ Category: ${slug}`);
  }

  console.log('🎉 Images updated!');
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
