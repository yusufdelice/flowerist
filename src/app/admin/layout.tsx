'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navLinks = [
    { href: '/admin', icon: '📊', label: 'Dashboard' },
    { href: '/admin/products', icon: '🌸', label: 'Products' },
    { href: '/admin/categories', icon: '📁', label: 'Categories' },
    { href: '/admin/banners', icon: '🖼️', label: 'Banners' },
    { href: '/admin/settings', icon: '⚙️', label: 'Settings' },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebar__logo}>
          <h2>❀ Lotus</h2>
          <span>Admin Panel</span>
        </div>
        <nav className={styles.sidebar__nav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.sidebar__link} ${
                pathname === link.href ? styles['sidebar__link--active'] : ''
              }`}
            >
              <span className={styles.sidebar__icon}>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.sidebar__bottom}>
          <Link href="/" className={styles.sidebar__bottomLink}>
            <span className={styles.sidebar__icon}>🌐</span>
            View Store
          </Link>
          <button onClick={handleLogout} className={styles.sidebar__bottomLink}>
            <span className={styles.sidebar__icon}>🚪</span>
            Logout
          </button>
        </div>
      </aside>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
