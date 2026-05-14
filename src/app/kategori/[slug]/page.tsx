import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/storefront/Header';
import Footer from '@/components/storefront/Footer';
import ProductCard from '@/components/storefront/ProductCard';
import { prisma } from '@/lib/prisma';
import styles from '@/app/cicekler/cicekler.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: 'Kategori Bulunamadı' };
  return {
    title: `${category.name} — Lotus Çiçekçilik`,
    description: `${category.name} kategorisindeki çiçeklerimizi keşfedin.`,
  };
}

export default async function KategoriPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const ITEMS_PER_PAGE = 12;

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const [products, totalCount, categories] = await Promise.all([
    prisma.product.findMany({
      where: { categoryId: category.id },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.product.count({ where: { categoryId: category.id } }),
    prisma.category.findMany({ orderBy: { sortOrder: 'asc' } }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <>
      <Header />
      <main className={styles.productsPage}>
        <div className={styles.productsPage__banner}>
          <h1>{category.name}</h1>
          <p className="text-muted">{totalCount} ürün bulundu</p>
        </div>

        <div className={styles.productsPage__content}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebar__section}>
              <div className={styles.sidebar__title}>Kategoriler</div>
              <div className={styles.sidebar__list}>
                <Link href="/cicekler" className={styles.sidebar__link}>Tümü</Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/kategori/${cat.slug}`}
                    className={`${styles.sidebar__link} ${cat.slug === slug ? styles['sidebar__link--active'] : ''}`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className={styles.sortBar}>
              <span className={styles.sortBar__count}>{totalCount} ürün</span>
            </div>

            {products.length > 0 ? (
              <div className={styles.productGrid}>
                {products.map((product) => (
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
            ) : (
              <div className="empty-state">
                <div className="empty-state__icon">🌸</div>
                <h3>Henüz ürün eklenmemiş</h3>
                <p className="text-muted">Bu kategoride ürün bulunmuyor.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/kategori/${slug}?page=${p}`}
                    className={`${styles.pagination__btn} ${p === page ? styles['pagination__btn--active'] : ''}`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
