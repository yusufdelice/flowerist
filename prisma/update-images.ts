import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🖼️ Updating all product images and categories...');

  const imageMap: Record<string, string[]> = {
    'kirmizi-gul-buketi': ['/uploads/red-roses.png'],
    'beyaz-papatya-buketi': ['/uploads/daisy.png'],
    'mevsim-cicekleri-buketi': ['/uploads/seasonal-bouquet.jpg'],
    'pembe-gul-lilyum': ['/uploads/pink-roses.png'],
    'aycicegi-buketi': ['/uploads/sunflowers.jpg'],
    'orkide-aranjmani': ['/uploads/orchid.png'],
    'masa-aranjmani': ['/uploads/table-arrangement.jpg'],
    'gul-aranjmani': ['/uploads/rose-arrangement.jpg'],
    'silindir-kutuda-guller': ['/uploads/box-roses.png'],
    'kalp-kutuda-cicekler': ['/uploads/heart-box.jpg'],
    'pastel-kutu-aranjmani': ['/uploads/pastel-box.jpg'],
    'gelin-buketi-klasik': ['/uploads/bridal-classic.jpg'],
    'gelin-buketi-modern': ['/uploads/bridal-modern.jpg'],
    'nisan-masasi-susleme': ['/uploads/engagement-table.jpg'],
    'taziye-celengi': ['/uploads/condolence-wreath.jpg'],
    'taziye-aranjmani': ['/uploads/condolence-basket.jpg'],
    'bonsai-agaci': ['/uploads/bonsai.jpg'],
    'sukulent-terrarium': ['/uploads/succulent-terrarium.jpg'],
    'lavanta-saksisi': ['/uploads/lavender-pot.jpg'],
    'mor-orkide': ['/uploads/purple-orchid.jpg'],
  };

  for (const [slug, images] of Object.entries(imageMap)) {
    try {
      await prisma.product.update({
        where: { slug },
        data: { images: JSON.stringify(images) },
      });
      console.log(`  ✅ Product: ${slug}`);
    } catch (e: any) {
      console.warn(`  ⚠️ Could not update ${slug}: ${e.message}`);
    }
  }

  // Categories
  const catImages: Record<string, string> = {
    'buketler': '/uploads/red-roses.png',
    'aranjmanlar': '/uploads/orchid.png',
    'kutuda-cicekler': '/uploads/box-roses.png',
    'dugun-nisan': '/uploads/bridal-classic.jpg',
    'cenaze-cicekleri': '/uploads/condolence-wreath.jpg',
    'saksi-cicekleri': '/uploads/bonsai.jpg',
  };

  for (const [slug, image] of Object.entries(catImages)) {
    try {
      await prisma.category.update({
        where: { slug },
        data: { image },
      });
      console.log(`  ✅ Category: ${slug}`);
    } catch (e: any) {
      console.warn(`  ⚠️ Category ${slug}: ${e.message}`);
    }
  }

  // Banners
  await prisma.banner.deleteMany();
  await prisma.banner.createMany({
    data: [
      {
        title: 'Doğanın En Güzel Hali',
        subtitle: 'Lotus Çiçekçilik — El Yapımı Çiçek Tasarımları',
        image: '/uploads/hero-banner.png',
        link: '/cicekler',
        active: true,
        sortOrder: 1,
      },
      {
        title: 'Özel Günler İçin Masalsı Dokunuşlar',
        subtitle: 'Gelin Buketleri & Nişan Masası Tasarımları',
        image: '/uploads/banner-wedding.jpg',
        link: '/kategori/dugun-nisan',
        active: true,
        sortOrder: 2,
      },
      {
        title: 'Evinize Yaşam Katan Saksı Çiçekleri',
        subtitle: 'Orkideler, Sukulentler ve Özel Bonsailer',
        image: '/uploads/banner-orchid.jpg',
        link: '/kategori/saksi-cicekleri',
        active: true,
        sortOrder: 3,
      },
    ],
  });
  console.log('✅ Created 3 rotating hero banners');

  console.log('🎉 All images, categories, and banners updated successfully!');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
