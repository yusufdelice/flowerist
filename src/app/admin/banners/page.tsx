'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from '../admin.module.css';

interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  link: string | null;
  active: boolean;
  sortOrder: number;
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: '', subtitle: '', image: '', link: '', active: true, sortOrder: '0' });

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/banners');
    if (res.ok) setBanners(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchBanners(); }, [fetchBanners]);

  const resetForm = () => {
    setForm({ title: '', subtitle: '', image: '', link: '', active: true, sortOrder: '0' });
    setEditing(null);
    setShowForm(false);
    setError('');
  };

  const handleEdit = (banner: Banner) => {
    setForm({
      title: banner.title,
      subtitle: banner.subtitle || '',
      image: banner.image,
      link: banner.link || '',
      active: banner.active,
      sortOrder: String(banner.sortOrder),
    });
    setEditing(banner.id);
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    if (res.ok) {
      const data = await res.json();
      setForm(f => ({ ...f, image: data.url }));
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const url = editing ? `/api/banners/${editing}` : '/api/banners';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }),
    });
    if (res.ok) { resetForm(); fetchBanners(); }
    else { const d = await res.json(); setError(d.error || 'Failed'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this banner?')) return;
    await fetch(`/api/banners/${id}`, { method: 'DELETE' });
    fetchBanners();
  };

  const toggleActive = async (banner: Banner) => {
    await fetch(`/api/banners/${banner.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...banner, active: !banner.active }),
    });
    fetchBanners();
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1>Banners</h1>
          <p>Manage homepage hero banners</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className={styles.btnPrimary}>
          + Add Banner
        </button>
      </div>

      {showForm && (
        <div className={styles.card} style={{ marginBottom: 24 }}>
          <div className={styles.card__header}>
            <span className={styles.card__title}>{editing ? 'Edit Banner' : 'New Banner'}</span>
            <button onClick={resetForm} className={styles.btnSecondary}>Cancel</button>
          </div>
          <div className={styles.card__body}>
            {error && <div className={`${styles.alert} ${styles['alert--error']}`}>{error}</div>}
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={styles.formInput} required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Subtitle</label>
                <input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Banner Image *</label>
                {form.image && (
                  <div style={{ marginBottom: 8, borderRadius: 8, overflow: 'hidden', maxHeight: 200 }}>
                    <img src={form.image} alt="Preview" style={{ width: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div className={styles.imageUpload} onClick={() => document.getElementById('banner-upload')?.click()}>
                  <div className={styles.imageUpload__text}>{uploading ? 'Uploading...' : form.image ? 'Change image' : 'Upload banner image'}</div>
                </div>
                <input id="banner-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Link (optional)</label>
                  <input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} className={styles.formInput} placeholder="/cicekler" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: e.target.value }))} className={styles.formInput} />
                </div>
              </div>
              <label className={styles.formCheckbox}>
                <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
                Active
              </label>
              <div className={styles.formActions}>
                <button type="submit" className={styles.btnPrimary}>{editing ? 'Save' : 'Create Banner'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.card}>
        {loading ? (
          <div className={styles.emptyState}><p>Loading...</p></div>
        ) : banners.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: 80 }}></th>
                <th>Title</th>
                <th>Status</th>
                <th>Order</th>
                <th style={{ width: 180 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map(b => (
                <tr key={b.id}>
                  <td><img src={b.image} alt="" className={styles.table__thumb} style={{ width: 64, height: 36, borderRadius: 4 }} /></td>
                  <td><strong>{b.title}</strong>{b.subtitle && <span style={{ color: '#999', marginLeft: 8 }}>{b.subtitle}</span>}</td>
                  <td><span className={`${styles.badge} ${b.active ? styles['badge--green'] : styles['badge--gray']}`}>{b.active ? 'Active' : 'Inactive'}</span></td>
                  <td>{b.sortOrder}</td>
                  <td>
                    <div className={styles.table__actions}>
                      <button onClick={() => toggleActive(b)} className={styles.table__actionBtn}>{b.active ? 'Deactivate' : 'Activate'}</button>
                      <button onClick={() => handleEdit(b)} className={styles.table__actionBtn}>Edit</button>
                      <button onClick={() => handleDelete(b.id)} className={`${styles.table__actionBtn} ${styles['table__actionBtn--danger']}`}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyState__icon}>🖼️</div>
            <h3>No banners yet</h3>
          </div>
        )}
      </div>
    </>
  );
}
