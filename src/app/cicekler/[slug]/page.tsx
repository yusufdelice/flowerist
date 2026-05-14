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
  params: Promise<{ slug: string }>
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
  params: Promise<{ slug: string }>
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
    '+902165550123',
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
          <span>{product.name}</span>
        </div>

        {/* Main Content */}
        <div className={styles.detail__main}>
          <ImageGallery images={images} productName={product.name} />

          <div className={styles.info}>
            <Link href={`/cicekler?kategori=${product.category.slug}`} className={styles.info__category}>
              {product.category.name}
            </Link>
            <h1 className={styles.info__name}>{product.name}</h1>
            <div className={styles.info__price}>{formatPrice(product.price)}</div>

            <div className={styles.info__divider}></div>

            <div className={styles.info__descTitle}>Açıklama</div>
            <div className={styles.info__description}>{product.description}</div>

            {tags.length > 0 && (
              <div className={styles.info__tags}>
                {tags.map((tag: string) => (
                  <span key={tag} className={styles.info__tag}>{tag}</span>
                ))}
              </div>
            )}

            <div className={styles.info__actions}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.info__whatsapp}
              >
                💬 WhatsApp ile Sipariş Ver
              </a>
            </div>

            <div className={`${styles.info__stock} ${!product.inStock ? styles.info__outOfStock : ''}`}>
              <div className={styles.info__stockDot}></div>
              {product.inStock ? 'Stokta mevcut' : 'Stokta yok'}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className={styles.related}>
            <h2>Benzer Çiçekler</h2>
            <div className="section-divider"></div>
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
