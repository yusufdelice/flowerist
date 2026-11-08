import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/storefront/Header';
import Footer from '@/components/storefront/Footer';
import ProductCard from '@/components/storefront/ProductCard';
import ImageGallery from './ImageGallery';
import { prisma } from '@/lib/prisma';
import { formatPrice, generateWhatsAppLink } from '@/lib/utils';
import styles from './detail.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) return { title: 'Ürün Bulunamadı — Lotus Çiçekçilik' };

  return {
    title: `${product.name} — Lotus Çiçekçilik`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) notFound();

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      inStock: true,
    },
    include: { category: true },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  const images: string[] = JSON.parse(product.images || '[]');
  const tags = product.tags ? product.tags.split(',').map((t: string) => t.trim()) : [];
  const whatsappLink = generateWhatsAppLink(
    '+905000000000',
    product.name,
    `https://lotuscicekcilik.com/cicekler/${product.slug}`
  );

  return (
    <>
      <Header />
      <main className={styles.detail}>
        {/* Breadcrumbs */}
        <div className={styles.detail__breadcrumbs}>
          <Link href="/">Anasayfa</Link>
          <span>/</span>
          <Link href="/cicekler">Çiçekler</Link>
          <span>/</span>
          <Link href={`/cicekler?kategori=${product.category.slug}`}>
            {product.category.name}
          </Link>
          <span>/</span>
          <span className={styles.currentCrumb}>{product.name}</span>
        </div>

        {/* Main Content */}
        <div className={styles.detail__main}>
          <ImageGallery images={images} productName={product.name} />

          <div className={styles.info}>
            <div className={styles.info__topMeta}>
              <Link href={`/cicekler?kategori=${product.category.slug}`} className={styles.info__category}>
                {product.category.name}
              </Link>
              {product.featured && <span className={styles.info__featuredBadge}>★ Özel Koleksiyon</span>}
            </div>

            <h1 className={styles.info__name}>{product.name}</h1>
            <div className={styles.info__priceWrap}>
              <div className={styles.info__price}>{formatPrice(product.price)}</div>
              <span className={styles.info__taxHint}>KDV ve Özel Ambalaj Dahildir</span>
            </div>

            <div className={styles.info__divider}></div>

            <div className={styles.info__descTitle}>Çiçek Detayları & Açıklama</div>
            <div className={styles.info__description}>{product.description}</div>

            {tags.length > 0 && (
              <div className={styles.info__tags}>
                {tags.map((tag: string) => (
                  <span key={tag} className={styles.info__tag}>#{tag}</span>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className={styles.info__actions}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.info__whatsapp}
              >
                <span>💬</span>
                <span>WhatsApp ile Hızlı Sipariş Ver</span>
              </a>
              <a
                href="tel:+900000000000"
                className={styles.info__phoneBtn}
              >
                <span>📞</span>
                <span>Telefonla Sipariş: +90 (000) 000 00 00</span>
              </a>
            </div>

            <div className={`${styles.info__stock} ${!product.inStock ? styles.info__outOfStock : ''}`}>
              <div className={styles.info__stockDot}></div>
              {product.inStock ? 'Stokta mevcut • Aynı gün 2 saatte teslim edilebilir' : 'Şu anda tükendi'}
            </div>

            {/* Delivery & Trust Highlights */}
            <div className={styles.trustBox}>
              <div className={styles.trustBox__item}>
                <span className={styles.trustBox__icon}>🚀</span>
                <div>
                  <strong>Aynı Gün Özel Teslimat</strong>
                  <p>Kadıköy ve tüm İstanbul’a özel araçlı kuryemiz ile kırılmadan, ezilmeden ulaştırılır.</p>
                </div>
              </div>
              <div className={styles.trustBox__item}>
                <span className={styles.trustBox__icon}>💌</span>
                <div>
                  <strong>Ücretsiz El Yazısı Kart</strong>
                  <p>Siparişiniz sırasında ileteceğiniz özel mesajınız mühürlü zarfında eklenir.</p>
                </div>
              </div>
              <div className={styles.trustBox__item}>
                <span className={styles.trustBox__icon}>📷</span>
                <div>
                  <strong>Fotoğraflı WhatsApp Teyidi</strong>
                  <p>Buketiniz atölyemizde bağlandığında fotoğrafı çekilip onayınıza sunulur.</p>
                </div>
              </div>
            </div>

            {/* Flower Care Guide */}
            <div className={styles.careGuide}>
              <h4>🌸 Çiçeğinizin Ömrünü Uzatacak İpuçları</h4>
              <ul>
                <li>Çiçekleri direkt güneş ışığından ve klima üflemesinden uzak tutunuz.</li>
                <li>Vazodaki suyu 2 günde bir tazeleyin ve sap uçlarını 45° açıyla 1 cm kesin.</li>
                <li>Geceleri serin bir ortamda tutmak çiçeklerin canlılığını 2 kat uzatır.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className={styles.related}>
            <h2>Benzer Çiçek Tasarımları</h2>
            <div className="section-divider"></div>
            <p className="text-center text-muted" style={{ marginBottom: 32 }}>
              Aynı kategorideki diğer popüler seçeneklerimizi inceleyin
            </p>
            <div className={styles.related__grid}>
              {relatedProducts.map((rp) => (
                <ProductCard
                  key={rp.id}
                  slug={rp.slug}
                  name={rp.name}
                  price={rp.price}
                  images={rp.images}
                  categoryName={rp.category.name}
                  featured={rp.featured}
                  inStock={rp.inStock}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
