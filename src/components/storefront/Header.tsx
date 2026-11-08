'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBar__inner}>
          <div className={styles.topBar__message}>
            <span className={styles.topBar__icon}>🌸</span>
            <span>Kadıköy ve tüm İstanbul’a aynı gün özel kurye teslimatı</span>
            <span className={styles.topBar__dot}>•</span>
            <span className={styles.topBar__badge}>Taze Çiçek Garantisi</span>
          </div>
          <div className={styles.topBar__contact}>
            <a href="tel:+902165550123" className={styles.topBar__link}>
              📞 +90 (216) 555 0123
            </a>
            <Link href="/admin" className={styles.topBar__adminLink} title="Yönetim Paneli">
              ⚙️ CMS Paneli
            </Link>
          </div>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.header__inner}>
          <Link href="/" className={styles.header__logo}>
            <span className={styles['header__logo-icon']}>❀</span>
            <div className={styles.header__logoText}>
              <span className={styles.header__brandName}>Lotus Çiçekçilik</span>
              <span className={styles.header__brandTagline}>Atölye & Tasarım</span>
            </div>
          </Link>

          <nav className={styles.header__nav}>
            <Link href="/">Anasayfa</Link>
            <Link href="/cicekler">Tüm Çiçekler</Link>
            <Link href="/kategori/buketler">Buketler</Link>
            <Link href="/kategori/kutuda-cicekler">Kutuda Çiçekler</Link>
            <Link href="/hakkimizda">Hakkımızda</Link>
          </nav>

          <div className={styles.header__actions}>
            <a
              href="https://wa.me/902165550123"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.header__whatsappBtn}
            >
              <span>💬</span>
              <span>WhatsApp Sipariş</span>
            </a>

            <button
              className={styles['header__mobile-toggle']}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        <div className={`${styles['header__mobile-nav']} ${mobileOpen ? styles.open : ''}`}>
          <Link href="/" onClick={() => setMobileOpen(false)}>Anasayfa</Link>
          <Link href="/cicekler" onClick={() => setMobileOpen(false)}>Tüm Çiçekler</Link>
          <Link href="/kategori/buketler" onClick={() => setMobileOpen(false)}>Buketler</Link>
          <Link href="/kategori/kutuda-cicekler" onClick={() => setMobileOpen(false)}>Kutuda Çiçekler</Link>
          <Link href="/kategori/saksi-cicekleri" onClick={() => setMobileOpen(false)}>Saksı Çiçekleri</Link>
          <Link href="/hakkimizda" onClick={() => setMobileOpen(false)}>Hakkımızda</Link>
          <Link href="/admin" onClick={() => setMobileOpen(false)}>⚙️ CMS Yönetim Paneli</Link>
          <a
            href="https://wa.me/902165550123"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileWhatsappLink}
          >
            💬 WhatsApp ile Sipariş Ver
          </a>
        </div>
      </header>
    </>
  );
}
