'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../admin.module.css';

interface Category {
  id: string;
  name: string;
  slug: string;
}

function slugify(text: string): string {
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G',
    'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O',
    'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U',
  };
  return text.split('').map(char => turkishMap[char] || char).join('')
    .toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
}

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
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

  const fetchCategories = useCallback(async () => {
    const res = await fetch('/api/categories');
    if (res.ok) {
      const data = await res.json();
      setCategories(data);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'name' ? { slug: slugify(value) } : {}),
    }));
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
    setSaving(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          sortOrder: Number(form.sortOrder),
          images: JSON.stringify(images),
        }),
      });

      if (res.ok) {
        router.push('/admin/products');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to create product');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1>New Product</h1>
          <p>Add a new flower to your catalog</p>
        </div>
      </div>

      {error && <div className={`${styles.alert} ${styles['alert--error']}`}>{error}</div>}

      <div className={styles.card}>
        <div className={styles.card__body}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Product Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="e.g. Kırmızı Gül Buketi"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Slug</label>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="auto-generated"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className={styles.formTextarea}
                placeholder="Describe the flower arrangement..."
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Price (₺) *</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="0"
                  min="0"
                  step="1"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Category *</label>
                <select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  className={styles.formSelect}
                  required
                >
                  <option value="">Select category...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Tags (comma separated)</label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className={styles.formInput}
                placeholder="romantik, sevgiliye, kırmızı"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Images</label>
              <div className={styles.imageUpload} onClick={() => document.getElementById('image-upload')?.click()}>
                <div className={styles.imageUpload__icon}>📷</div>
                <div className={styles.imageUpload__text}>
                  {uploading ? 'Uploading...' : 'Click to upload images'}
                </div>
                <div className={styles.imageUpload__hint}>JPEG, PNG, WebP — Max 5MB</div>
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              {images.length > 0 && (
                <div className={styles.imagePreview}>
                  {images.map((img, idx) => (
                    <div key={idx} className={styles.imagePreview__item}>
                      <img src={img} alt={`Upload ${idx + 1}`} />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className={styles.imagePreview__remove}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formCheckbox}>
                  <input
                    name="featured"
                    type="checkbox"
                    checked={form.featured}
                    onChange={handleChange}
                  />
                  Featured Product
                </label>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formCheckbox}>
                  <input
                    name="inStock"
                    type="checkbox"
                    checked={form.inStock}
                    onChange={handleChange}
                  />
                  In Stock
                </label>
              </div>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary} disabled={saving}>
                {saving ? 'Saving...' : 'Create Product'}
              </button>
              <button type="button" onClick={() => router.back()} className={styles.btnSecondary}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
