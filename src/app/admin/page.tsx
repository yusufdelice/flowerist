import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';
import styles from './admin.module.css';

export default async function AdminDashboard() {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect('/admin/login');

  const [productCount, categoryCount, bannerCount, featuredCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.banner.count({ where: { active: true } }),
    prisma.product.count({ where: { featured: true } }),
  ]);

  const recentProducts = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to Lotus Çiçekçilik admin panel</p>
        </div>
        <Link href="/admin/products/new" className={styles.btnPrimary}>
          + Add Product
        </Link>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <div className={styles.stat__icon}>🌸</div>
          <div className={styles.stat__value}>{productCount}</div>
          <div className={styles.stat__label}>Products</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.stat__icon}>📁</div>
          <div className={styles.stat__value}>{categoryCount}</div>
          <div className={styles.stat__label}>Categories</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.stat__icon}>🖼️</div>
          <div className={styles.stat__value}>{bannerCount}</div>
          <div className={styles.stat__label}>Active Banners</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.stat__icon}>⭐</div>
          <div className={styles.stat__value}>{featuredCount}</div>
          <div className={styles.stat__label}>Featured</div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.card__header}>
          <span className={styles.card__title}>Recent Products</span>
          <Link href="/admin/products" className={styles.btnSecondary}>
            View All
          </Link>
        </div>
        {recentProducts.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((product) => {
                const images = JSON.parse(product.images || '[]');
                return (
                  <tr key={product.id}>
                    <td>
                      {images[0] ? (
                        <img src={images[0]} alt="" className={styles.table__thumb} />
                      ) : (
                        <div className={styles.table__thumbPlaceholder}>🌸</div>
                      )}
                    </td>
                    <td><strong>{product.name}</strong></td>
                    <td>{product.category.name}</td>
                    <td>₺{product.price.toLocaleString('tr-TR')}</td>
                    <td>
                      <span className={`${styles.badge} ${product.inStock ? styles['badge--green'] : styles['badge--red']}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyState__icon}>🌸</div>
            <h3>No products yet</h3>
            <p>Start by adding your first product</p>
          </div>
        )}
      </div>
    </>
  );
}
