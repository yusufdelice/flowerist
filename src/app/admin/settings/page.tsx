'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from '../admin.module.css';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    instagram: '',
    aboutText: '',
    footerText: '',
  });

  const fetchSettings = useCallback(async () => {
    const res = await fetch('/api/settings');
    if (res.ok) {
      const data = await res.json();
      setForm({
        phone: data.phone || '',
        whatsapp: data.whatsapp || '',
        email: data.email || '',
        address: data.address || '',
        instagram: data.instagram || '',
        aboutText: data.aboutText || '',
        footerText: data.footerText || '',
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess('Settings saved successfully');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to save settings');
      }
    } catch {
      setError('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.emptyState}><p>Loading...</p></div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1>Settings</h1>
          <p>Store contact information and settings</p>
        </div>
      </div>

      {error && <div className={`${styles.alert} ${styles['alert--error']}`}>{error}</div>}
      {success && <div className={`${styles.alert} ${styles['alert--success']}`}>{success}</div>}

      <div className={styles.card}>
        <div className={styles.card__body}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className={styles.formInput} placeholder="+90 (216) 555 0123" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>WhatsApp</label>
                <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className={styles.formInput} placeholder="+902165550123" />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input name="email" value={form.email} onChange={handleChange} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Instagram</label>
                <input name="instagram" value={form.instagram} onChange={handleChange} className={styles.formInput} placeholder="lotuscicekcilik" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Address</label>
              <input name="address" value={form.address} onChange={handleChange} className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>About Text</label>
              <textarea name="aboutText" value={form.aboutText} onChange={handleChange} className={styles.formTextarea} rows={4} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Footer Text</label>
              <textarea name="footerText" value={form.footerText} onChange={handleChange} className={styles.formTextarea} rows={3} />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnPrimary} disabled={saving}>
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
