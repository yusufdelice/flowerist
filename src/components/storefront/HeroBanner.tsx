'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from '@/app/home.module.css';

interface BannerData {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  link: string | null;
}

export default function HeroBanner({ banners }: { banners: BannerData[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    if (banners.length > 1) {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, banners.length]);

  if (banners.length === 0) {
    // Fallback hero when no banners exist
    return (
      <section className={styles.hero}>
        <div
          className={`${styles.hero__slide} ${styles['hero__slide--active']}`}
          style={{
            background: 'linear-gradient(135deg, #4A6741 0%, #2C3E28 50%, #1A1A1A 100%)',
          }}
        />
        <div className={styles.hero__overlay}></div>
        <div className={styles.hero__content}>
          <div className={styles.hero__subtitle}>Lotus Çiçekçilik</div>
          <h1 className={styles.hero__title}>
            Doğanın En Güzel Hali
          </h1>
          <div className={styles.hero__cta}>
            <Link href="/cicekler" className="btn btn--primary btn--lg">
              Çiçekleri Keşfet
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.hero}>
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`${styles.hero__slide} ${
            index === activeIndex ? styles['hero__slide--active'] : ''
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className={styles.hero__image}
          />
        </div>
      ))}
      <div className={styles.hero__overlay}></div>
      <div className={styles.hero__content}>
        <div className={styles.hero__subtitle}>Lotus Çiçekçilik</div>
        <h1 className={styles.hero__title}>
          {banners[activeIndex]?.title || 'Doğanın En Güzel Hali'}
        </h1>
        <div className={styles.hero__cta}>
          {banners[activeIndex]?.link ? (
            <Link href={banners[activeIndex].link!} className="btn btn--primary btn--lg">
              Keşfet
            </Link>
          ) : (
            <Link href="/cicekler" className="btn btn--primary btn--lg">
              Çiçekleri Keşfet
            </Link>
          )}
        </div>
      </div>

      {banners.length > 1 && (
        <div className={styles.hero__dots}>
          {banners.map((_, index) => (
            <button
              key={index}
              className={`${styles.hero__dot} ${
                index === activeIndex ? styles['hero__dot--active'] : ''
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
