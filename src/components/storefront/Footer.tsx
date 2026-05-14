import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__grid}>
          <div className={styles.footer__brand}>
            <h3>❀ Lotus Çiçekçilik</h3>
            <p>
              Her mevsim, her an, sevdiklerinize en özel çiçekleri hazırlıyoruz. 
              Doğanın güzelliğini sizin için sanat eserine dönüştürüyoruz.
            </p>
          </div>

          <div className={styles.footer__col}>
            <h4>Menü</h4>
            <ul>
              <li><Link href="/">Anasayfa</Link></li>
              <li><Link href="/cicekler">Çiçekler</Link></li>
              <li><Link href="/hakkimizda">Hakkımızda</Link></li>
            </ul>
          </div>

          <div className={styles.footer__col}>
            <h4>Kategoriler</h4>
            <ul>
              <li><Link href="/kategori/buketler">Buketler</Link></li>
              <li><Link href="/kategori/aranjmanlar">Aranjmanlar</Link></li>
              <li><Link href="/kategori/kutuda-cicekler">Kutuda Çiçekler</Link></li>
              <li><Link href="/kategori/saksi-cicekleri">Saksı Çiçekleri</Link></li>
            </ul>
          </div>

          <div className={styles.footer__col}>
            <h4>İletişim</h4>
            <ul>
              <li>📍 Bağdat Cad. No:123, Kadıköy/İstanbul</li>
              <li>📞 +90 (216) 555 0123</li>
              <li>✉️ info@lotuscicekcilik.com</li>
              <li>🕐 Her gün 08:00 – 22:00</li>
            </ul>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <span>© {new Date().getFullYear()} Lotus Çiçekçilik. Tüm hakları saklıdır.</span>
          <div className={styles.footer__social}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
            <a href="https://wa.me/902165550123" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
