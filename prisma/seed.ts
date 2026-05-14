// Simple seed script that works with Prisma 6.x custom output
// Run with: npx tsx prisma/seed.ts

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.siteSettings.deleteMany();

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Buketler', slug: 'buketler', sortOrder: 1 } }),
    prisma.category.create({ data: { name: 'Aranjmanlar', slug: 'aranjmanlar', sortOrder: 2 } }),
    prisma.category.create({ data: { name: 'Kutuda Çiçekler', slug: 'kutuda-cicekler', sortOrder: 3 } }),
    prisma.category.create({ data: { name: 'Düğün & Nişan', slug: 'dugun-nisan', sortOrder: 4 } }),
    prisma.category.create({ data: { name: 'Cenaze Çiçekleri', slug: 'cenaze-cicekleri', sortOrder: 5 } }),
    prisma.category.create({ data: { name: 'Saksı Çiçekleri', slug: 'saksi-cicekleri', sortOrder: 6 } }),
  ]);
  console.log(`✅ Created ${categories.length} categories`);

  const products = [
    { name: 'Kırmızı Gül Buketi', slug: 'kirmizi-gul-buketi', description: 'En kaliteli kırmızı güllerden oluşan muhteşem bir buket. 25 adet ithal kırmızı gül ile hazırlanmıştır.\n\nBuket yüksekliği: 50 cm\nÇiçek sayısı: 25 adet', price: 850, categoryId: categories[0].id, tags: 'romantik,sevgiliye,kırmızı,gül', featured: true },
    { name: 'Beyaz Papatya Buketi', slug: 'beyaz-papatya-buketi', description: 'Masumiyet ve saflığın simgesi beyaz papatyalardan oluşan zarif bir buket.\n\nBuket yüksekliği: 40 cm', price: 420, categoryId: categories[0].id, tags: 'papatya,beyaz,zarif', featured: true },
    { name: 'Mevsim Çiçekleri Buketi', slug: 'mevsim-cicekleri-buketi', description: 'Mevsimin en taze ve renkli çiçeklerinden oluşan canlı bir buket.\n\nBuket yüksekliği: 45 cm', price: 550, categoryId: categories[0].id, tags: 'mevsim,renkli,taze', featured: false },
    { name: 'Pembe Gül & Lilyum', slug: 'pembe-gul-lilyum', description: 'Zarif pembe güller ve kokulu lilyumlardan oluşan şık bir buket.\n\nBuket yüksekliği: 55 cm\n15 gül, 3 lilyum', price: 750, categoryId: categories[0].id, tags: 'pembe,gül,lilyum,şık', featured: true },
    { name: 'Ayçiçeği Buketi', slug: 'aycicegi-buketi', description: 'Neşe ve mutluluk getiren parlak ayçiçeklerinden oluşan enerji dolu bir buket.\n\nÇiçek sayısı: 10 adet', price: 480, categoryId: categories[0].id, tags: 'ayçiçeği,sarı,neşeli', featured: false },
    { name: 'Orkide Aranjmanı', slug: 'orkide-aranjmani', description: 'Beyaz seramik saksıda tek dallı beyaz orkide aranjmanı.\n\nYükseklik: 60 cm\nSaksı: Beyaz seramik', price: 650, categoryId: categories[1].id, tags: 'orkide,beyaz,dekoratif', featured: true },
    { name: 'Masa Aranjmanı', slug: 'masa-aranjmani', description: 'Renkli mevsim çiçeklerinden yuvarlak masa aranjmanı.\n\nÇap: 30 cm\nKap: Cam vazo', price: 380, categoryId: categories[1].id, tags: 'masa,aranjman,renkli', featured: false },
    { name: 'Gül Aranjmanı', slug: 'gul-aranjmani', description: 'Kırmızı ve beyaz güllerin zarif uyumundan oluşan şık bir aranjman.\n\n30 adet karışık gül\nKap: Gold metal sepet', price: 920, categoryId: categories[1].id, tags: 'gül,aranjman,premium', featured: true },
    { name: 'Silindir Kutuda Güller', slug: 'silindir-kutuda-guller', description: 'Siyah silindir kutuda özenle yerleştirilmiş kırmızı güller.\n\nGül sayısı: 20 adet', price: 1100, categoryId: categories[2].id, tags: 'kutu,gül,lüks,hediye', featured: true },
    { name: 'Kalp Kutuda Çiçekler', slug: 'kalp-kutuda-cicekler', description: 'Kalp şeklinde özel kutuda kırmızı güller ve çikolatalar.\n\nGül sayısı: 15 adet', price: 1350, categoryId: categories[2].id, tags: 'kalp,kutu,sevgililer', featured: false },
    { name: 'Pastel Kutu Aranjmanı', slug: 'pastel-kutu-aranjmani', description: 'Pastel tonlarda çiçeklerle hazırlanmış zarif kutu aranjmanı.\n\nÇiçek: Gül, karanfil, lisyantus', price: 780, categoryId: categories[2].id, tags: 'pastel,kutu,zarif', featured: false },
    { name: 'Gelin Buketi - Klasik', slug: 'gelin-buketi-klasik', description: 'Beyaz güller ve yeşilliklerle hazırlanan klasik gelin buketi.\n\nÇiçek: Beyaz gül, gipsofila', price: 1200, categoryId: categories[3].id, tags: 'gelin,düğün,beyaz', featured: false },
    { name: 'Gelin Buketi - Modern', slug: 'gelin-buketi-modern', description: 'Sukulent ve tropikal çiçeklerle modern bir gelin buketi.\n\nStil: Asimetrik', price: 1500, categoryId: categories[3].id, tags: 'gelin,modern,tropikal', featured: false },
    { name: 'Nişan Masası Süsleme', slug: 'nisan-masasi-susleme', description: 'Nişan masanız için komple çiçek süsleme paketi.\n\nMasa ortası + 4 köşe aranjmanı', price: 3500, categoryId: categories[3].id, tags: 'nişan,masa,süsleme', featured: false },
    { name: 'Taziye Çelengi', slug: 'taziye-celengi', description: 'Beyaz çiçeklerden hazırlanan saygı ifadesi taziye çelengi.\n\nBoyut: 80x120 cm', price: 1800, categoryId: categories[4].id, tags: 'taziye,çelenk,cenaze', featured: false },
    { name: 'Taziye Aranjmanı', slug: 'taziye-aranjmani', description: 'Beyaz ve yeşil tonlarda hazırlanmış taziye aranjmanı.\n\nKap: Hasır sepet', price: 680, categoryId: categories[4].id, tags: 'taziye,aranjman,beyaz', featured: false },
    { name: 'Bonsai Ağacı', slug: 'bonsai-agaci', description: 'İthal bonsai ağacı, dekoratif seramik saksıda.\n\nYükseklik: 35-40 cm', price: 950, categoryId: categories[5].id, tags: 'bonsai,saksı,dekoratif', featured: false },
    { name: 'Sukulent Terrarium', slug: 'sukulent-terrarium', description: 'Cam fanus içinde çeşitli sukulentlerden oluşan terrarium.\n\nÇap: 20 cm', price: 320, categoryId: categories[5].id, tags: 'sukulent,terrarium', featured: false },
    { name: 'Lavanta Saksısı', slug: 'lavanta-saksisi', description: 'Mis kokulu lavanta bitkisi, dekoratif saksıda.\n\nYükseklik: 30 cm', price: 280, categoryId: categories[5].id, tags: 'lavanta,saksı,kokulu', featured: false },
    { name: 'Mor Orkide', slug: 'mor-orkide', description: 'Çift dallı mor orkide, şık beyaz seramik saksıda.\n\nYükseklik: 55 cm', price: 780, categoryId: categories[5].id, tags: 'orkide,mor,saksı', featured: false },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: { ...product, images: '[]', featured: product.featured || false, inStock: true, sortOrder: 0 },
    });
  }
  console.log(`✅ Created ${products.length} products`);

  await prisma.siteSettings.create({
    data: {
      id: 'main',
      phone: '+90 (216) 555 0123',
      whatsapp: '+902165550123',
      email: 'info@lotuscicekcilik.com',
      address: 'Bağdat Cad. No:123, Kadıköy/İstanbul',
      instagram: 'lotuscicekcilik',
      aboutText: 'Lotus Çiçekçilik, 2015 yılından bu yana İstanbul\'da hizmet vermektedir.',
      footerText: 'Her mevsim, her an, sevdiklerinize en özel çiçekleri hazırlıyoruz.',
    },
  });
  console.log('✅ Created site settings');
  console.log('🎉 Seed complete!');
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
