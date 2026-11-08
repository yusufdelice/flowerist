import Header from '@/components/storefront/Header';
import Footer from '@/components/storefront/Footer';
import styles from './hakkimizda.module.css';

export const metadata = {
  title: 'Hakkımızda — Lotus Çiçekçilik',
  description: 'Lotus Çiçekçilik hakkında bilgi alın. 2015’ten bu yana Kadıköy’deki atölyemiz, hikayemiz, değerlerimiz ve iletişim bilgilerimiz.',
};

export default function HakkimizdaPage() {
  return (
    <>
      <Header />
      <main className={styles.about}>
        <div className={styles.about__hero}>
          <span className={styles.about__eyebrow}>Kadıköy, İstanbul</span>
          <h1>Doğanın Zarafeti, Çiçeğin Sanatı</h1>
          <div className="section-divider"></div>
          <p>
            2015 yılından bu yana çiçeklerin büyüleyici dilini en özel anlarınıza taşıyan butik çiçek atölyesi.
          </p>
        </div>

        <div className={styles.about__content}>
          {/* Story with real photo */}
          <div className={styles.about__story}>
            <div className={styles.about__storyImageWrap}>
              <img
                src="/uploads/story-florist.jpg"
                alt="Lotus Çiçekçilik Atölye ve Florist"
                className={styles.about__storyImg}
              />
            </div>
            <div className={styles.about__storyContent}>
              <span className={styles.about__subhead}>Biz Kimiz?</span>
              <h2>Çiçeklere Aşık Bir Ekip</h2>
              <p>
                Lotus Çiçekçilik, doğanın en saf renklerini insan ruhuna dokunan tasarımlara
                dönüştürme tutkusuyla kuruldu. Bağdat Caddesi’ndeki sıcak atölyemizde her sabah,
                çiçek mezatından taze gelen tomurcukları tek tek seçerek güne başlıyoruz.
              </p>
              <p>
                Bizim için hiçbir sipariş sıradan bir kutu veya paket değildir. Bir annenin
                gülümsemesi, sevdiğine kavuşan bir kalbin heyecanı ya da dostluğun en samimi
                ifadesidir.
              </p>
              <p>
                Uluslararası floristik trendleri yerel el işçiliğiyle harmanlıyor; her mevsime
                özgü en taze dokuları sanat eseri titizliğiyle bir araya getiriyoruz.
              </p>

              <div className={styles.about__stats}>
                <div>
                  <strong>10+</strong>
                  <span>Yıllık Deneyim</span>
                </div>
                <div>
                  <strong>15.000+</strong>
                  <span>Teslim Edilen Çiçek</span>
                </div>
                <div>
                  <strong>%100</strong>
                  <span>Tazelik Garantisi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className={styles.about__values}>
            <div className="section-title">
              <h2>İlkelerimiz ve Değerlerimiz</h2>
              <div className="section-divider"></div>
              <p>Neden binlerce kişi sevdiklerini sevindirirken bize güveniyor?</p>
            </div>
            <div className={styles.about__valuesGrid}>
              <div className={styles.about__value}>
                <div className={styles.about__valueIcon}>🌸</div>
                <h3>Kusursuz Tazelik</h3>
                <p>
                  Asla bekletilmiş çiçek kullanmıyoruz. Sabah mezatından gelen çiçekleri
                  aynı gün kuryemizle sıcağı sıcağına teslim ediyoruz.
                </p>
              </div>
              <div className={styles.about__value}>
                <div className={styles.about__valueIcon}>🎨</div>
                <h3>Özgün & Butik Tasarım</h3>
                <p>
                  Kalıplaşmış buketler yerine, renk teorisi ve doku uyumuyla floristlerimiz
                  tarafından hazırlanan benzersiz aranjmanlar sunuyoruz.
                </p>
              </div>
              <div className={styles.about__value}>
                <div className={styles.about__valueIcon}>🚀</div>
                <h3>Özel Araçlı Teslimat</h3>
                <p>
                  Çiçekleriniz toplu kargolarla ezilmez; kendi özel araçlı kuryelerimizle
                  tam saatinde ve kusursuz formda alıcısına ulaştırılır.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className={styles.about__contact}>
            <div className="section-title">
              <h2>Atölyemize Bekleriz</h2>
              <div className="section-divider"></div>
              <p>Kahvemizi içmeye veya çiçeğinizi kendi gözlerinizle seçmeye davetlisiniz.</p>
            </div>
            <div className={styles.about__contactGrid}>
              <div className={styles.about__contactCard}>
                <span className={styles.contactIcon}>📍</span>
                <h4>Atölye Adresi</h4>
                <p>Bağdat Caddesi No:123</p>
                <p>Kadıköy / İstanbul</p>
              </div>
              <div className={styles.about__contactCard}>
                <span className={styles.contactIcon}>📞</span>
                <h4>Telefon & WhatsApp</h4>
                <p><a href="tel:+900000000000">+90 (000) 000 00 00</a></p>
                <p><a href="https://wa.me/905000000000" target="_blank" rel="noopener noreferrer" style={{ color: '#27ae60', fontWeight: 600 }}>WhatsApp Sohbeti Başlat →</a></p>
              </div>
              <div className={styles.about__contactCard}>
                <span className={styles.contactIcon}>✉️</span>
                <h4>E-Posta</h4>
                <p><a href="mailto:info@lotuscicekcilik.com">info@lotuscicekcilik.com</a></p>
                <p className="text-muted" style={{ fontSize: '0.8rem' }}>2 saat içinde yanıtlanır</p>
              </div>
              <div className={styles.about__contactCard}>
                <span className={styles.contactIcon}>🕐</span>
                <h4>Açık Olduğumuz Saatler</h4>
                <p>Hafta içi: 08:30 – 22:00</p>
                <p>Hafta sonu: 09:00 – 21:00</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
