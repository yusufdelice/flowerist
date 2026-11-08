import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__grid}>
          <div className={styles.footer__brand}>
            <div className={styles.footer__brandTitle}>
              <span>❀</span> Lotus Çiçekçilik
            </div>
            <p>
              2015 yılından bu yana İstanbul’da el yapımı butik buketler, taze mevsim
              aranjmanları ve özel gün tasarımlarıyla sevdiklerinize unutulmaz hatıralar sunuyoruz.
            </p>
            <div className={styles.footer__badges}>
              <span>⚡ Aynı Gün Teslimat</span>
              <span>🌸 %100 Taze Çiçek</span>
            </div>
          </div>

          <div className={styles.footer__col}>
            <h4>Hızlı Menü</h4>
            <ul>
              <li><Link href="/">Anasayfa</Link></li>
              <li><Link href="/cicekler">Tüm Çiçekler</Link></li>
              <li><Link href="/hakkimizda">Hakkımızda & Atölye</Link></li>
              <li><Link href="/admin">⚙️ CMS Yönetim Paneli</Link></li>
            </ul>
          </div>

          <div className={styles.footer__col}>
            <h4>Koleksiyonlar</h4>
            <ul>
              <li><Link href="/kategori/buketler">Gül & Buketler</Link></li>
              <li><Link href="/kategori/kutuda-cicekler">Kutuda Lüks Çiçekler</Link></li>
              <li><Link href="/kategori/aranjmanlar">Masa & Vazo Aranjmanları</Link></li>
              <li><Link href="/kategori/dugun-nisan">Gelin Buketi & Nişan</Link></li>
              <li><Link href="/kategori/saksi-cicekleri">Orkide & Saksı Bitkileri</Link></li>
            </ul>
          </div>

          <div className={styles.footer__col}>
            <h4>İletişim & Konum</h4>
            <ul className={styles.footer__contactList}>
              <li>📍 Bağdat Cad. No:123, Kadıköy / İstanbul</li>
              <li>📞 <a href="tel:+902165550123">+90 (216) 555 0123</a></li>
              <li>💬 <a href="https://wa.me/902165550123" target="_blank" rel="noopener noreferrer">WhatsApp Destek Hattı</a></li>
              <li>✉️ info@lotuscicekcilik.com</li>
              <li>🕐 Her gün: 08:30 – 22:00</li>
            </ul>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <span>© {new Date().getFullYear()} Lotus Çiçekçilik. Tüm hakları saklıdır.</span>
          <div className={styles.footer__social}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              Instagram
            </a>
            <span className={styles.footer__sep}>•</span>
            <a href="https://wa.me/902165550123" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              WhatsApp
            </a>
            <span className={styles.footer__sep}>•</span>
            <Link href="/admin" className={styles.footer__adminBtn}>
              CMS Girişi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
