// Complete seed script for Lotus Çiçekçilik
// Run with: npm run seed or npx tsx prisma/seed.ts

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

  // Create categories with images
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Buketler', slug: 'buketler', image: '/uploads/red-roses.png', sortOrder: 1 } }),
    prisma.category.create({ data: { name: 'Aranjmanlar', slug: 'aranjmanlar', image: '/uploads/orchid.png', sortOrder: 2 } }),
    prisma.category.create({ data: { name: 'Kutuda Çiçekler', slug: 'kutuda-cicekler', image: '/uploads/box-roses.png', sortOrder: 3 } }),
    prisma.category.create({ data: { name: 'Düğün & Nişan', slug: 'dugun-nisan', image: '/uploads/bridal-classic.jpg', sortOrder: 4 } }),
    prisma.category.create({ data: { name: 'Cenaze Çiçekleri', slug: 'cenaze-cicekleri', image: '/uploads/condolence-wreath.jpg', sortOrder: 5 } }),
    prisma.category.create({ data: { name: 'Saksı Çiçekleri', slug: 'saksi-cicekleri', image: '/uploads/bonsai.jpg', sortOrder: 6 } }),
  ]);
  console.log(`✅ Created ${categories.length} categories with images`);

  const categoryMap: Record<string, string> = {
    buketler: categories[0].id,
    aranjmanlar: categories[1].id,
    'kutuda-cicekler': categories[2].id,
    'dugun-nisan': categories[3].id,
    'cenaze-cicekleri': categories[4].id,
    'saksi-cicekleri': categories[5].id,
  };

  const products = [
    {
      name: 'Kırmızı Gül Buketi',
      slug: 'kirmizi-gul-buketi',
      description: 'En kaliteli kırmızı güllerden oluşan muhteşem bir buket. 25 adet ithal kırmızı gül ile özenle hazırlanmıştır. Aşkınızı ve bağlılığınızı en zarif yoldan ifade edin.\n\nBuket yüksekliği: 50 cm\nÇiçek sayısı: 25 adet\nAmbalaj: Özel tasarım kraft kağıt ve saten kurdele',
      price: 850,
      categoryId: categoryMap['buketler'],
      images: JSON.stringify(['/uploads/red-roses.png']),
      tags: 'romantik,sevgiliye,kırmızı,gül,yıldönümü',
      featured: true,
    },
    {
      name: 'Beyaz Papatya Buketi',
      slug: 'beyaz-papatya-buketi',
      description: 'Masumiyet ve saflığın simgesi taze beyaz papatyalardan oluşan zarif bir buket. Doğal yeşillik dokunuşlarıyla zenginleştirilmiştir.\n\nBuket yüksekliği: 40 cm\nAmbalaj: Doğal keten ip ve vintage ambalaj',
      price: 420,
      categoryId: categoryMap['buketler'],
      images: JSON.stringify(['/uploads/daisy.png']),
      tags: 'papatya,beyaz,zarif,doğal',
      featured: true,
    },
    {
      name: 'Mevsim Çiçekleri Buketi',
      slug: 'mevsim-cicekleri-buketi',
      description: 'Mevsimin en taze ve rengarenk çiçeklerinden oluşan enerji dolu kır buketi. Günün en taze çiçekleriyle usta floristlerimizce derlenir.\n\nBuket yüksekliği: 45 cm\nİçerik: Gül, lisianthus, statis, okaliptüs',
      price: 550,
      categoryId: categoryMap['buketler'],
      images: JSON.stringify(['/uploads/seasonal-bouquet.jpg']),
      tags: 'mevsim,renkli,taze,enerjik',
      featured: true,
    },
    {
      name: 'Pembe Gül & Lilyum',
      slug: 'pembe-gul-lilyum',
      description: 'Zarif pembe güller ve mis kokulu beyaz oryantal lilyumlardan oluşan büyüleyici buket.\n\nBuket yüksekliği: 55 cm\n15 pembe gül, 3 dal tomurcuklu lilyum',
      price: 750,
      categoryId: categoryMap['buketler'],
      images: JSON.stringify(['/uploads/pink-roses.png']),
      tags: 'pembe,gül,lilyum,şık,zarif',
      featured: true,
    },
    {
      name: 'Ayçiçeği Buketi',
      slug: 'aycicegi-buketi',
      description: 'Neşe, sadakat ve güneşin sıcaklığını getiren taptaze ayçiçeklerinden oluşan enerjik buket.\n\nÇiçek sayısı: 10 adet büyük boy ayçiçeği',
      price: 480,
      categoryId: categoryMap['buketler'],
      images: JSON.stringify(['/uploads/sunflowers.jpg']),
      tags: 'ayçiçeği,sarı,neşeli,yaz',
      featured: false,
    },
    {
      name: 'Orkide Aranjmanı',
      slug: 'orkide-aranjmani',
      description: 'Özel beyaz seramik saksıda tek dallı beyaz phalaenopsis orkide. Kalıcı güzellik ve zarafet arayanlar için ideal.\n\nYükseklik: 60 cm\nSaksı: Lüks mat beyaz seramik',
      price: 650,
      categoryId: categoryMap['aranjmanlar'],
      images: JSON.stringify(['/uploads/orchid.png']),
      tags: 'orkide,beyaz,dekoratif,zarif',
      featured: true,
    },
    {
      name: 'Masa Aranjmanı',
      slug: 'masa-aranjmani',
      description: 'Zarif cam vazoda renkli mevsim çiçekleri ve egzotik yeşilliklerle hazırlanmış yuvarlak masa aranjmanı.\n\nÇap: 30 cm\nKap: Özel tasarım cam vazo',
      price: 380,
      categoryId: categoryMap['aranjmanlar'],
      images: JSON.stringify(['/uploads/table-arrangement.jpg']),
      tags: 'masa,aranjman,renkli,ofis',
      featured: false,
    },
    {
      name: 'Gül Aranjmanı',
      slug: 'gul-aranjmani',
      description: 'Kırmızı ve beyaz birinci sınıf güllerin gold detaylı sepette göz alıcı uyumu.\n\n30 adet ithal gül\nKap: Gold metal lüks sepet',
      price: 920,
      categoryId: categoryMap['aranjmanlar'],
      images: JSON.stringify(['/uploads/rose-arrangement.jpg']),
      tags: 'gül,aranjman,premium,lüks',
      featured: true,
    },
    {
      name: 'Silindir Kutuda Güller',
      slug: 'silindir-kutuda-guller',
      description: 'Özel kadife dokulu siyah silindir kutuda özenle dizilmiş 20 adet kırmızı ithal gül.\n\nKutu boyutu: 20x22 cm',
      price: 1100,
      categoryId: categoryMap['kutuda-cicekler'],
      images: JSON.stringify(['/uploads/box-roses.png']),
      tags: 'kutu,gül,lüks,hediye,prestij',
      featured: true,
    },
    {
      name: 'Kalp Kutuda Çiçekler',
      slug: 'kalp-kutuda-cicekler',
      description: 'Kalp şeklinde özel kutuda taze kırmızı güller ve yanında lüks çikolatalar. En romantik hediye seçeneği.\n\nKutu boyutu: 25x25 cm\nGül sayısı: 15 adet',
      price: 1350,
      categoryId: categoryMap['kutuda-cicekler'],
      images: JSON.stringify(['/uploads/heart-box.jpg']),
      tags: 'kalp,kutu,sevgililer,çikolata',
      featured: true,
    },
    {
      name: 'Pastel Kutu Aranjmanı',
      slug: 'pastel-kutu-aranjmani',
      description: 'Soft pastel pembe, somon ve krem tonlarda gül, karanfil ve lisyantuslardan oluşan romantik kutu tasarımı.\n\nKutu boyutu: 18x18 cm pastel kutu',
      price: 780,
      categoryId: categoryMap['kutuda-cicekler'],
      images: JSON.stringify(['/uploads/pastel-box.jpg']),
      tags: 'pastel,kutu,zarif,soft',
      featured: false,
    },
    {
      name: 'Gelin Buketi - Klasik',
      slug: 'gelin-buketi-klasik',
      description: 'Beyaz ithal güller, gipsofila ve taze okaliptüs yapraklarıyla hazırlanan masalsı klasik gelin çiçeği.\n\nBuket çapı: 26 cm\nDamat yaka çiçeği hediye!',
      price: 1200,
      categoryId: categoryMap['dugun-nisan'],
      images: JSON.stringify(['/uploads/bridal-classic.jpg']),
      tags: 'gelin,düğün,beyaz,klasik',
      featured: false,
    },
    {
      name: 'Gelin Buketi - Modern',
      slug: 'gelin-buketi-modern',
      description: 'Kral protea, sukulent, kurutulmuş çiçekler ve asimetrik tropikal yapraklarla modern bohem gelin buketi.\n\nStil: Bohem & Modern',
      price: 1500,
      categoryId: categoryMap['dugun-nisan'],
      images: JSON.stringify(['/uploads/bridal-modern.jpg']),
      tags: 'gelin,modern,bohem,tropikal',
      featured: false,
    },
    {
      name: 'Nişan Masası Süsleme',
      slug: 'nisan-masasi-susleme',
      description: 'Söz ve nişan törenleriniz için komple canlı çiçek süsleme paketi. Masa runnerı ve köşe vazo düzenlemeleri dahildir.',
      price: 3500,
      categoryId: categoryMap['dugun-nisan'],
      images: JSON.stringify(['/uploads/engagement-table.jpg']),
      tags: 'nişan,masa,süsleme,davet',
      featured: false,
    },
    {
      name: 'Taziye Çelengi',
      slug: 'taziye-celengi',
      description: 'Beyaz krizantem, lilyum ve karanfillerle özenle hazırlanan ayaklı taziye ve cenaze çelengi.\n\nBoyut: 80x120 cm\nŞerit üzerine taziye yazısı dahildir.',
      price: 1800,
      categoryId: categoryMap['cenaze-cicekleri'],
      images: JSON.stringify(['/uploads/condolence-wreath.jpg']),
      tags: 'taziye,çelenk,cenaze,saygı',
      featured: false,
    },
    {
      name: 'Taziye Aranjmanı',
      slug: 'taziye-aranjmani',
      description: 'Hasır sepet içinde asil beyaz lilyum ve güllerden oluşan sade saygı ve taziye aranjmanı.\n\nYükseklik: 40 cm',
      price: 680,
      categoryId: categoryMap['cenaze-cicekleri'],
      images: JSON.stringify(['/uploads/condolence-basket.jpg']),
      tags: 'taziye,aranjman,beyaz,sepet',
      featured: false,
    },
    {
      name: 'Bonsai Ağacı',
      slug: 'bonsai-agaci',
      description: 'İthal form verilmiş mini Ficus bonsai ağacı, seramik dekoratif tabaklı saksıda. Ev ve ofisler için uzun ömürlü canlı sanat.\n\nYükseklik: 35-40 cm',
      price: 950,
      categoryId: categoryMap['saksi-cicekleri'],
      images: JSON.stringify(['/uploads/bonsai.jpg']),
      tags: 'bonsai,saksı,dekoratif,ofis,hediye',
      featured: true,
    },
    {
      name: 'Sukulent Terrarium',
      slug: 'sukulent-terrarium',
      description: 'Geometrik cam fanus içerisinde doğal yosunlar, taşlar ve 5 farklı sukulent türü ile hazırlanan mini bahçe.\n\nÇap: 20 cm',
      price: 320,
      categoryId: categoryMap['saksi-cicekleri'],
      images: JSON.stringify(['/uploads/succulent-terrarium.jpg']),
      tags: 'sukulent,terrarium,kolay-bakım',
      featured: false,
    },
    {
      name: 'Lavanta Saksısı',
      slug: 'lavanta-saksisi',
      description: 'Mis kokulu taze Akdeniz lavantası, el yapımı terracotta toprak saksıda.\n\nYükseklik: 30 cm',
      price: 280,
      categoryId: categoryMap['saksi-cicekleri'],
      images: JSON.stringify(['/uploads/lavender-pot.jpg']),
      tags: 'lavanta,saksı,kokulu,balkon',
      featured: false,
    },
    {
      name: 'Mor Orkide',
      slug: 'mor-orkide',
      description: 'Çift dallı lüks mor Phalaenopsis orkide, özel kabartmalı beyaz seramik saksıda.\n\nYükseklik: 55 cm',
      price: 780,
      categoryId: categoryMap['saksi-cicekleri'],
      images: JSON.stringify(['/uploads/purple-orchid.jpg']),
      tags: 'orkide,mor,saksı,özel-gün',
      featured: false,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        inStock: true,
        sortOrder: 0,
      },
    });
  }
  console.log(`✅ Created ${products.length} products with photos and rich descriptions`);

  // Banners
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
  console.log('✅ Created 3 hero banners');

  // Site Settings
  await prisma.siteSettings.create({
    data: {
      id: 'main',
      phone: '+90 (216) 555 0123',
      whatsapp: '+902165550123',
      email: 'info@lotuscicekcilik.com',
      address: 'Bağdat Cad. No:123, Kadıköy/İstanbul',
      instagram: 'lotuscicekcilik',
      aboutText: 'Lotus Çiçekçilik, 2015 yılından bu yana İstanbul Kadıköy’de aşkla ve doğaya duyduğumuz tutkuyla hizmet vermektedir. Her bir buketimiz taze çiçek mezatından bizzat seçilen birinci sınıf çiçeklerle hazırlanır.',
      footerText: 'Her mevsim, her an, sevdiklerinize en özel çiçekleri hazırlıyoruz. Doğanın zarafetini sanatla buluşturuyoruz.',
    },
  });
  console.log('✅ Created site settings');

  console.log('🎉 Seed completed successfully!');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
