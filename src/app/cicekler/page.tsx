import Link from 'next/link';
import Header from '@/components/storefront/Header';
import Footer from '@/components/storefront/Footer';
import ProductCard from '@/components/storefront/ProductCard';
import SortSelect from '@/components/storefront/SortSelect';
import { prisma } from '@/lib/prisma';
import styles from './cicekler.module.css';

const PRODUCTS_PER_PAGE = 12;

export const metadata = {
  title: 'Çiçekler — Lotus Çiçekçilik',
  description: 'Lotus Çiçekçilik ürün koleksiyonu. Buketler, aranjmanlar, kutuda çiçekler ve daha fazlası.',
};

export default async function CiceklerPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const sort = (params.sort as string) || 'newest';
  const categorySlug = params.kategori as string | undefined;

  // Build where clause
  const where: Record<string, unknown> = {};
  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  // Build orderBy
  let orderBy: Record<string, string> = { createdAt: 'desc' };
  if (sort === 'price-asc') orderBy = { price: 'asc' };
  else if (sort === 'price-desc') orderBy = { price: 'desc' };
  else if (sort === 'name') orderBy = { name: 'asc' };

  const [products, totalCount, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      skip: (page - 1) * PRODUCTS_PER_PAGE,
      take: PRODUCTS_PER_PAGE,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({ orderBy: { sortOrder: 'asc' } }),
  ]);

  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE);

  const buildUrl = (params: Record<string, string | number>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val) searchParams.set(key, String(val));
    });
    return `/cicekler?${searchParams.toString()}`;
  };

  return (
    <>
      <Header />
      <main className={styles.productsPage}>
        <div className={styles.productsPage__banner}>
          <h1>{categorySlug ? categories.find(c => c.slug === categorySlug)?.name || 'Çiçekler' : 'Tüm Çiçekler'}</h1>
          <p className="text-muted">
            {totalCount} ürün bulundu
          </p>
        </div>

        <div className={styles.productsPage__content}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebar__section}>
              <div className={styles.sidebar__title}>Kategoriler</div>
              <div className={styles.sidebar__list}>
                <Link
                  href="/cicekler"
                  className={`${styles.sidebar__link} ${!categorySlug ? styles['sidebar__link--active'] : ''}`}
                >
                  Tümü
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={buildUrl({ kategori: cat.slug, sort })}
                    className={`${styles.sidebar__link} ${categorySlug === cat.slug ? styles['sidebar__link--active'] : ''}`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div>
            <div className={styles.sortBar}>
              <span className={styles.sortBar__count}>{totalCount} ürün</span>
              <SortSelect currentSort={sort} className={styles.sortBar__select} />
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                {page > 1 && (
                  <Link
                    href={buildUrl({ kategori: categorySlug || '', sort, page: page - 1 })}
                    className={styles.pagination__btn}
                  >
                    ‹
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={buildUrl({ kategori: categorySlug || '', sort, page: p })}
                    className={`${styles.pagination__btn} ${p === page ? styles['pagination__btn--active'] : ''}`}
                  >
                    {p}
                  </Link>
                ))}
                {page < totalPages && (
                  <Link
                    href={buildUrl({ kategori: categorySlug || '', sort, page: page + 1 })}
                    className={styles.pagination__btn}
                  >
                    ›
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
