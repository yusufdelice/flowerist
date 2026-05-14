'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string;
  featured: boolean;
  inStock: boolean;
  category: { id: string; name: string };
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const limit = 20;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (search) params.set('search', search);
    if (categoryFilter) params.set('category', categoryFilter);

    const res = await fetch(`/api/products?${params}`);
    if (res.status === 401) {
      router.push('/admin/login');
      return;
    }
    const data = await res.json();
    setProducts(data.products || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, search, categoryFilter, router]);

  const fetchCategories = useCallback(async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" ürününü silmek istediğinize emin misiniz?`)) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1>Products</h1>
          <p>{total} total products</p>
        </div>
        <Link href="/admin/products/new" className={styles.btnPrimary}>
          + Add Product
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.toolbar} style={{ padding: '16px 20px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className={styles.toolbar__search}
          />
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            className={styles.toolbar__select}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className={styles.emptyState}>
            <p>Loading...</p>
          </div>
        ) : products.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 56 }}></th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Featured</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
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
                    <td>
                      {product.featured && (
                        <span className={`${styles.badge} ${styles['badge--blue']}`}>Featured</span>
                      )}
                    </td>
                    <td>
                      <div className={styles.table__actions}>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className={styles.table__actionBtn}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className={`${styles.table__actionBtn} ${styles['table__actionBtn--danger']}`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyState__icon}>🌸</div>
            <h3>No products found</h3>
            <p>{search ? 'Try a different search term' : 'Add your first product'}</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <span>Page {page} of {totalPages}</span>
            <div className={styles.pagination__buttons}>
              <button
                className={styles.pagination__btn}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ‹ Prev
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const startPage = Math.max(1, Math.min(page - 2, totalPages - 4));
                const p = startPage + i;
                if (p > totalPages) return null;
                return (
                  <button
                    key={p}
                    className={`${styles.pagination__btn} ${p === page ? styles['pagination__btn--active'] : ''}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                className={styles.pagination__btn}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next ›
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
