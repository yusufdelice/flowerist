import Header from '@/components/storefront/Header';
import Footer from '@/components/storefront/Footer';
import styles from './hakkimizda.module.css';

export const metadata = {
  title: 'Hakkımızda — Lotus Çiçekçilik',
  description: 'Lotus Çiçekçilik hakkında bilgi alın. Hikayemiz, değerlerimiz ve iletişim bilgilerimiz.',
};

export default function HakkimizdaPage() {
  return (
    <>
      <Header />
      <main className={styles.about}>
        <div className={styles.about__hero}>
          <h1>Hakkımızda</h1>
          <div className="section-divider"></div>
          <p>
            Çiçeklerin dilinden anlayan, doğanın güzelliğini sanat eserine dönüştüren bir atölye.
          </p>
        </div>

        <div className={styles.about__content}>
          {/* Story */}
          <div className={styles.about__story}>
            <div className={styles.about__storyImage}>🌿</div>
            <div className={styles.about__storyContent}>
              <h2>Hikayemiz</h2>
              <p>
                Lotus Çiçekçilik, çiçeklere olan tutkuyla 2015 yılında İstanbul&apos;da kuruldu.
                Amacımız, her bir aranjmanda doğanın eşsiz güzelliğini yansıtmak ve
                müşterilerimize unutulmaz anlar yaşatmak.
              </p>
              <p>
                Uzman floristlerimiz, en taze çiçekleri özenle seçerek sizin için benzersiz
                tasarımlar oluşturuyor. Her buketimiz, bir hikaye anlatır; her aranjmanımız,
                bir duyguyu ifade eder.
              </p>
              <p>
                Yıllar içinde binlerce mutlu müşteriye hizmet verdik ve her geçen gün
                kendimizi geliştirmeye devam ediyoruz.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className={styles.about__values}>
            <h2>Değerlerimiz</h2>
            <div className="section-divider"></div>
            <div className={styles.about__valuesGrid}>
              <div className={styles.about__value}>
                <div className={styles.about__valueIcon}>🌱</div>
                <h3>Tazelik</h3>
                <p>
                  Çiçeklerimiz her gün taze olarak temin edilir.
                  En kaliteli ürünleri sizlere sunmak önceliğimizdir.
                </p>
              </div>
              <div className={styles.about__value}>
                <div className={styles.about__valueIcon}>🎨</div>
                <h3>Tasarım</h3>
                <p>
                  Her aranjman, uzman floristlerimiz tarafından
                  özenle ve yaratıcılıkla tasarlanır.
                </p>
              </div>
              <div className={styles.about__value}>
                <div className={styles.about__valueIcon}>💚</div>
                <h3>Güven</h3>
                <p>
                  Zamanında teslimat ve müşteri memnuniyeti
                  bizim için en önemli değerdir.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className={styles.about__contact}>
            <h2>İletişim</h2>
            <div className="section-divider"></div>
            <div className={styles.about__contactGrid}>
              <div className={styles.about__contactCard}>
                <h4>Adres</h4>
                <p>Bağdat Caddesi No:123</p>
                <p>Kadıköy / İstanbul</p>
              </div>
              <div className={styles.about__contactCard}>
                <h4>Telefon</h4>
                <p>📞 <a href="tel:+902165550123">+90 (216) 555 0123</a></p>
                <p>💬 <a href="https://wa.me/902165550123" target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
              </div>
              <div className={styles.about__contactCard}>
                <h4>E-Posta</h4>
                <p>✉️ <a href="mailto:info@lotuscicekcilik.com">info@lotuscicekcilik.com</a></p>
              </div>
              <div className={styles.about__contactCard}>
                <h4>Çalışma Saatleri</h4>
                <p>Pazartesi – Cumartesi: 08:00 – 22:00</p>
                <p>Pazar: 09:00 – 20:00</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
