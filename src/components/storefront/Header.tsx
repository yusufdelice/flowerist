'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Link href="/" className={styles.header__logo}>
          <span className={styles['header__logo-icon']}>❀</span>
          Lotus Çiçekçilik
        </Link>

        <nav className={styles.header__nav}>
          <Link href="/">Anasayfa</Link>
          <Link href="/cicekler">Çiçekler</Link>
          <Link href="/hakkimizda">Hakkımızda</Link>
        </nav>

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

      <div className={`${styles['header__mobile-nav']} ${mobileOpen ? styles.open : ''}`}>
        <Link href="/" onClick={() => setMobileOpen(false)}>Anasayfa</Link>
        <Link href="/cicekler" onClick={() => setMobileOpen(false)}>Çiçekler</Link>
        <Link href="/hakkimizda" onClick={() => setMobileOpen(false)}>Hakkımızda</Link>
      </div>
    </header>
  );
}
