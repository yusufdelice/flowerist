import Link from 'next/link';
import Header from '@/components/storefront/Header';
import Footer from '@/components/storefront/Footer';
import ProductCard from '@/components/storefront/ProductCard';
import HeroBanner from '@/components/storefront/HeroBanner';
import { prisma } from '@/lib/prisma';
import styles from './home.module.css';

export default async function HomePage() {
  const [featuredProducts, categories, banners] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true, inStock: true },
      include: { category: true },
      orderBy: { sortOrder: 'asc' },
      take: 8,
    }),
    prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.banner.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    }),
  ]);

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <HeroBanner banners={banners} />

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className={styles.featured}>
            <div className={styles.featured__header}>
              <h2>Öne Çıkan Çiçekler</h2>
              <div className={styles.featured__divider}></div>
              <p>Sizin için özenle hazırladığımız en özel tasarımlar</p>
            </div>
            <div className={styles.featured__grid}>
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  images={product.images}
                  categoryName={product.category.name}
                  featured={product.featured}
                  inStock={product.inStock}
                />
              ))}
            </div>
            <div className={styles.featured__viewAll}>
              <Link href="/cicekler" className="btn btn--outline">
                Tüm Çiçekleri Gör
              </Link>
            </div>
          </section>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <section className={styles.categories}>
            <div className={styles.categories__header}>
              <h2>Kategoriler</h2>
              <div className="section-divider"></div>
              <p className="text-muted" style={{ maxWidth: 480, margin: '0 auto' }}>
                Aradığınız çiçeği kolayca bulun
              </p>
            </div>
            <div className={styles.categories__grid}>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/kategori/${cat.slug}`}
                  className={styles.categoryCard}
                >
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className={styles.categoryCard__image}
                    />
                  ) : (
                    <div className={styles.categoryCard__placeholder}>🌺</div>
                  )}
                  <div className={styles.categoryCard__overlay}></div>
                  <span className={styles.categoryCard__name}>{cat.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Story / About */}
        <section className={styles.story}>
          <div className={styles.story__inner}>
            <div className={styles.story__image}>
              <div className={styles.story__imagePlaceholder}>🌿</div>
            </div>
            <div className={styles.story__content}>
              <div className={styles.story__label}>Hikayemiz</div>
              <h2>Doğanın Güzelliğini Evinize Taşıyoruz</h2>
              <p>
                Lotus Çiçekçilik olarak, her bir aranjmanımızda doğanın eşsiz güzelliğini
                yansıtmayı hedefliyoruz. Taze çiçeklerimiz, uzman floristlerimiz tarafından
                özenle seçilip tasarlanıyor.
              </p>
              <p>
                Sevdiklerinize en özel anlarda en güzel çiçekleri göndermeniz için buradayız.
                Her mevsimde, her özel günde yanınızdayız.
              </p>
              <Link href="/hakkimizda" className="btn btn--outline" style={{ marginTop: 24 }}>
                Daha Fazla
              </Link>
            </div>
          </div>
        </section>

        {/* WhatsApp Banner */}
        <section className={styles.whatsappBanner}>
          <div className={styles.whatsappBanner__inner}>
            <div className={styles.whatsappBanner__text}>
              <h3>Sipariş Vermek Çok Kolay</h3>
              <p>WhatsApp üzerinden hızlıca sipariş verin, adresinize teslim edelim.</p>
            </div>
            <a
              href="https://wa.me/902165550123"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBanner__btn}
            >
              💬 WhatsApp ile Sipariş
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
