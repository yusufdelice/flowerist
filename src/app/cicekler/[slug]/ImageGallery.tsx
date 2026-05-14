'use client';

import { useState } from 'react';
import styles from './detail.module.css';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.gallery__main}>
          <div className={styles.gallery__placeholder}>🌸</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__main}>
        <img
          src={images[activeIndex]}
          alt={`${productName} - ${activeIndex + 1}`}
          className={styles.gallery__mainImage}
        />
      </div>
      {images.length > 1 && (
        <div className={styles.gallery__thumbs}>
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`${styles.gallery__thumb} ${idx === activeIndex ? styles['gallery__thumb--active'] : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <img src={img} alt={`${productName} thumbnail ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
