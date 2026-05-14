'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../admin.module.css';

interface Category {
  id: string;
  name: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    categoryId: '',
    tags: '',
    featured: false,
    inStock: true,
    sortOrder: '0',
  });

  const fetchProduct = useCallback(async () => {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) { router.push('/admin/products'); return; }
    const product = await res.json();
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: String(product.price),
      categoryId: product.categoryId,
      tags: product.tags || '',
      featured: product.featured,
      inStock: product.inStock,
      sortOrder: String(product.sortOrder),
    });
    setImages(JSON.parse(product.images || '[]'));
    setLoading(false);
  }, [id, router]);

  const fetchCategories = useCallback(async () => {
    const res = await fetch('/api/categories');
    if (res.ok) setCategories(await res.json());
  }, []);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [fetchProduct, fetchCategories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        setImages(prev => [...prev, data.url]);
      }
    }
    setUploading(false);
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          sortOrder: Number(form.sortOrder),
          images: JSON.stringify(images),
        }),
      });

      if (res.ok) {
        setSuccess('Product updated successfully');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.emptyState}><p>Loading...</p></div>;
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1>Edit Product</h1>
          <p>{form.name}</p>
        </div>
      </div>

      {error && <div className={`${styles.alert} ${styles['alert--error']}`}>{error}</div>}
      {success && <div className={`${styles.alert} ${styles['alert--success']}`}>{success}</div>}

      <div className={styles.card}>
        <div className={styles.card__body}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Product Name *</label>
                <input name="name" value={form.name} onChange={handleChange} className={styles.formInput} required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Slug</label>
                <input name="slug" value={form.slug} onChange={handleChange} className={styles.formInput} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} className={styles.formTextarea} required />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Price (₺) *</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} className={styles.formInput} required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Category *</label>
                <select name="categoryId" value={form.categoryId} onChange={handleChange} className={styles.formSelect} required>
                  <option value="">Select...</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Tags</label>
              <input name="tags" value={form.tags} onChange={handleChange} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Images</label>
              <div className={styles.imageUpload} onClick={() => document.getElementById('edit-image-upload')?.click()}>
                <div className={styles.imageUpload__icon}>📷</div>
                <div className={styles.imageUpload__text}>{uploading ? 'Uploading...' : 'Click to upload'}</div>
              </div>
              <input id="edit-image-upload" type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} />
              {images.length > 0 && (
                <div className={styles.imagePreview}>
                  {images.map((img, idx) => (
                    <div key={idx} className={styles.imagePreview__item}>
                      <img src={img} alt="" />
                      <button type="button" onClick={() => removeImage(idx)} className={styles.imagePreview__remove}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.formRow}>
              <label className={styles.formCheckbox}>
                <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} />
                Featured Product
              </label>
              <label className={styles.formCheckbox}>
                <input name="inStock" type="checkbox" checked={form.inStock} onChange={handleChange} />
                In Stock
              </label>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => router.push('/admin/products')} className={styles.btnSecondary}>
                Back to Products
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
