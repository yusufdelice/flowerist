'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from '../admin.module.css';

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  sortOrder: number;
  _count?: { products: number };
}

function slugify(text: string): string {
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I',
    'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U',
  };
  return text.split('').map(c => turkishMap[c] || c).join('')
    .toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-');
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', slug: '', image: '', sortOrder: '0' });

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/categories');
    if (res.ok) setCategories(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const resetForm = () => {
    setForm({ name: '', slug: '', image: '', sortOrder: '0' });
    setEditing(null);
    setShowForm(false);
    setError('');
  };

  const handleEdit = (cat: Category) => {
    setForm({ name: cat.name, slug: cat.slug, image: cat.image || '', sortOrder: String(cat.sortOrder) });
    setEditing(cat.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const url = editing ? `/api/categories/${editing}` : '/api/categories';
    const method = editing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }),
    });

    if (res.ok) {
      resetForm();
      fetchCategories();
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to save');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? Products in this category must be moved first.`)) return;
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchCategories();
    } else {
      const data = await res.json();
      alert(data.error || 'Cannot delete');
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1>Categories</h1>
          <p>Manage product categories</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className={styles.btnPrimary}>
          + Add Category
        </button>
      </div>

      {showForm && (
        <div className={styles.card} style={{ marginBottom: 24 }}>
          <div className={styles.card__header}>
            <span className={styles.card__title}>{editing ? 'Edit Category' : 'New Category'}</span>
            <button onClick={resetForm} className={styles.btnSecondary}>Cancel</button>
          </div>
          <div className={styles.card__body}>
            {error && <div className={`${styles.alert} ${styles['alert--error']}`}>{error}</div>}
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Name *</label>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: editing ? f.slug : slugify(e.target.value) }))}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Slug</label>
                  <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className={styles.formInput} />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Image URL</label>
                  <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className={styles.formInput} placeholder="/uploads/..." />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: e.target.value }))} className={styles.formInput} />
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.btnPrimary}>{editing ? 'Save Changes' : 'Create Category'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.card}>
        {loading ? (
          <div className={styles.emptyState}><p>Loading...</p></div>
        ) : categories.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Products</th>
                <th>Order</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id}>
                  <td><strong>{cat.name}</strong></td>
                  <td style={{ color: '#999' }}>{cat.slug}</td>
                  <td>{cat._count?.products ?? 0}</td>
                  <td>{cat.sortOrder}</td>
                  <td>
                    <div className={styles.table__actions}>
                      <button onClick={() => handleEdit(cat)} className={styles.table__actionBtn}>Edit</button>
                      <button onClick={() => handleDelete(cat.id, cat.name)} className={`${styles.table__actionBtn} ${styles['table__actionBtn--danger']}`}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyState__icon}>📁</div>
            <h3>No categories yet</h3>
          </div>
        )}
      </div>
    </>
  );
}
