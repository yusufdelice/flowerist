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
      where: { inStock: true },
      include: { category: true },
      orderBy: [
        { featured: 'desc' },
        { sortOrder: 'asc' },
      ],
      take: 8,
    }),
    prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
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
        {/* Hero Banner Carousel */}
        <HeroBanner banners={banners} />

        {/* Feature Highlights / Trust Badges */}
        <section className={styles.features}>
          <div className={styles.features__inner}>
            <div className={styles.featureItem}>
              <div className={styles.featureItem__icon}>🚀</div>
              <div className={styles.featureItem__text}>
                <h4>Aynı Gün Teslimat</h4>
                <p>Kadıköy ve tüm İstanbul’a 2 saatte özel kurye</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureItem__icon}>🌸</div>
              <div className={styles.featureItem__text}>
                <h4>%100 Taze Çiçek</h4>
                <p>Her sabah mezattan seçilen birinci sınıf çiçekler</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureItem__icon}>✍️</div>
              <div className={styles.featureItem__text}>
                <h4>Ücretsiz Not Kartı</h4>
                <p>Özel zarfında el yazısıyla yazılmış şık mesajınız</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureItem__icon}>📷</div>
              <div className={styles.featureItem__text}>
                <h4>Fotoğraflı Onay</h4>
                <p>Buketiniz yola çıkmadan WhatsApp ile teyit</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        {categories.length > 0 && (
          <section className={styles.categories}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionHeader__eyebrow}>Koleksiyonlar</span>
              <h2>Kategoriye Göre Keşfedin</h2>
              <div className={styles.sectionHeader__divider}></div>
              <p>Her duyguya, her ana ve her kutlamaya özel tasarımlar</p>
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
                  <div className={styles.categoryCard__content}>
                    <span className={styles.categoryCard__name}>{cat.name}</span>
                    <span className={styles.categoryCard__count}>
                      {cat._count.products} Çiçek Tasarımı →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className={styles.featured}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionHeader__eyebrow}>En Çok Tercih Edilenler</span>
              <h2>Öne Çıkan Çiçekler</h2>
              <div className={styles.sectionHeader__divider}></div>
              <p>Sizin için floral tasarımcılarımız tarafından hazırlanan popüler aranjmanlar</p>
            </div>
            <div className={styles.featured__grid}>
              {featuredProducts.map((product) => (
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
              <Link href="/cicekler" className="btn btn--primary btn--lg">
                Tüm Koleksiyonu Görüntüle ({featuredProducts.length}+)
              </Link>
            </div>
          </section>
        )}

        {/* Story / About with real photo */}
        <section className={styles.story}>
          <div className={styles.story__inner}>
            <div className={styles.story__imageWrap}>
              <img
                src="/uploads/story-florist.jpg"
                alt="Lotus Çiçekçilik Atölyesi"
                className={styles.story__image}
              />
              <div className={styles.story__badge}>
                <span className={styles.story__badgeYear}>2015’ten Beri</span>
                <span className={styles.story__badgeText}>Bağdat Caddesi, Kadıköy</span>
              </div>
            </div>
            <div className={styles.story__content}>
              <div className={styles.story__label}>Atölye Hikayemiz</div>
              <h2>Doğanın En Saf Renklerini Sevgiyle Dokuyoruz</h2>
              <p>
                Lotus Çiçekçilik, 2015 yılından bu yana İstanbul Kadıköy’de çiçekçilik
                zanaatını modern estetikle buluşturuyor. Bizim için bir buket, yalnızca
                çiçeklerin bir araya gelmesi değil; en değerli duygularınızın söze
                dökülmüş halidir.
              </p>
              <p>
                Her sabah yerli ve ithal üreticilerden özenle seçilen en taze çiçekler,
                usta floristlerimizin ellerinde kişiye özel sanat eserlerine dönüşür.
              </p>

              {/* Stats */}
              <div className={styles.story__stats}>
                <div className={styles.storyStat}>
                  <span className={styles.storyStat__num}>10+</span>
                  <span className={styles.storyStat__label}>Yıllık Zanaat</span>
                </div>
                <div className={styles.storyStat}>
                  <span className={styles.storyStat__num}>15K+</span>
                  <span className={styles.storyStat__label}>Mutlu Müşteri</span>
                </div>
                <div className={styles.storyStat}>
                  <span className={styles.storyStat__num}>%100</span>
                  <span className={styles.storyStat__label}>Tazelik Garantisi</span>
                </div>
              </div>

              <div style={{ marginTop: 28 }}>
                <Link href="/hakkimizda" className="btn btn--outline">
                  Atölyemiz Hakkında Daha Fazla Bilgi →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Testimonials / Reviews */}
        <section className={styles.testimonials}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionHeader__eyebrow}>Müşteri Deneyimleri</span>
            <h2>Bizi Tercih Edenler Ne Diyor?</h2>
            <div className={styles.sectionHeader__divider}></div>
            <p>Sevdiklerine çiçek gönderen müşterilerimizin paylaştığı güzel anılar</p>
          </div>

          <div className={styles.testimonials__grid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialCard__stars}>★★★★★</div>
              <p className={styles.testimonialCard__quote}>
                “Evlilik teklifim için kırmızı gül buketi siparişi verdim. Güller o kadar
                taze ve büyük ki fotoğraftakinden bile güzel geldi. Özel kurye tam söz
                verilen dakikada ulaştırdı, teşekkürler!”
              </p>
              <div className={styles.testimonialCard__author}>
                <strong>Barış T.</strong>
                <span>Kadıköy, İstanbul</span>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialCard__stars}>★★★★★</div>
              <p className={styles.testimonialCard__quote}>
                “Annemin doğum günü için silindir kutuda çiçek gönderdim. WhatsApp üzerinden
                hazırlanış fotoğrafını atıp onay aldılar, bu incelikleri gerçekten çok hoşuma
                gitti. Çiçekler 10 gün boyunca capcanlı kaldı.”
              </p>
              <div className={styles.testimonialCard__author}>
                <strong>Elif K.</strong>
                <span>Ataşehir, İstanbul</span>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialCard__stars}>★★★★★</div>
              <p className={styles.testimonialCard__quote}>
                “Ofis açılışı için tek dallı orkide ve bonsai sipariş ettik. Saksı kalitesi,
                paketi ve el yazısı kartı çok zarifti. Artık tüm kurumsal çiçek siparişlerimizde
                tek adresimiz.”
              </p>
              <div className={styles.testimonialCard__author}>
                <strong>Selin & Murat A.</strong>
                <span>Beşiktaş, İstanbul</span>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Mini Gallery */}
        <section className={styles.instagramSection}>
          <div className={styles.instagramSection__header}>
            <div>
              <h3>Instagram’da Bizi Takip Edin</h3>
              <p className="text-muted">Günlük atölye kareleri ve yeni tasarımlar için @lotuscicekcilik</p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline btn--sm"
            >
              📷 @lotuscicekcilik
            </a>
          </div>
          <div className={styles.instagramGrid}>
            <div className={styles.instagramItem}>
              <img src="/uploads/red-roses.png" alt="Instagram 1" />
            </div>
            <div className={styles.instagramItem}>
              <img src="/uploads/orchid.png" alt="Instagram 2" />
            </div>
            <div className={styles.instagramItem}>
              <img src="/uploads/box-roses.png" alt="Instagram 3" />
            </div>
            <div className={styles.instagramItem}>
              <img src="/uploads/pink-roses.png" alt="Instagram 4" />
            </div>
            <div className={styles.instagramItem}>
              <img src="/uploads/daisy.png" alt="Instagram 5" />
            </div>
            <div className={styles.instagramItem}>
              <img src="/uploads/seasonal-bouquet.jpg" alt="Instagram 6" />
            </div>
          </div>
        </section>

        {/* WhatsApp Banner */}
        <section className={styles.whatsappBanner}>
          <div className={styles.whatsappBanner__inner}>
            <div className={styles.whatsappBanner__text}>
              <span className={styles.whatsappBanner__badge}>Anında Yanıt</span>
              <h3>Özel Tasarım veya Hızlı Sipariş mi İstiyorsunuz?</h3>
              <p>
                Floristlerimizle WhatsApp üzerinden canlı görüşebilir, istediğiniz renk ve
                çiçeklerle size özel buket hazırlatabilirsiniz.
              </p>
            </div>
            <a
              href="https://wa.me/905000000000"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBanner__btn}
            >
              💬 WhatsApp ile Hemen Danışın
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
