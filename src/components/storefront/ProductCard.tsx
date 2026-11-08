import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  slug: string;
  name: string;
  price: number;
  images: string;
  categoryName?: string;
  featured?: boolean;
  inStock?: boolean;
}

export default function ProductCard({
  slug,
  name,
  price,
  images,
  categoryName,
  featured,
  inStock = true,
}: ProductCardProps) {
  let imageList: string[] = [];
  try {
    imageList = JSON.parse(images || '[]');
  } catch {
    imageList = [];
  }
  const mainImage = imageList[0];

  return (
    <div className={styles.cardContainer}>
      <Link href={`/cicekler/${slug}`} className={styles.productCard}>
        <div className={styles.productCard__imageWrap}>
          {mainImage ? (
            <img
              src={mainImage}
              alt={name}
              className={styles.productCard__image}
              loading="lazy"
            />
          ) : (
            <div className={styles.productCard__placeholder}>🌸</div>
          )}
          <div className={styles.productCard__badges}>
            {featured && <span className={styles.productCard__featured}>★ Özel Seçim</span>}
            {!inStock && <span className={styles.productCard__outOfStock}>Tükendi</span>}
          </div>
          <div className={styles.productCard__hoverOverlay}>
            <span className={styles.productCard__viewBtn}>İncele & Sipariş Ver →</span>
          </div>
        </div>
        <div className={styles.productCard__body}>
          {categoryName && (
            <div className={styles.productCard__category}>{categoryName}</div>
          )}
          <h3 className={styles.productCard__name}>{name}</h3>
          <div className={styles.productCard__footer}>
            <div className={styles.productCard__price}>{formatPrice(price)}</div>
            <span className={styles.productCard__deliveryHint}>⚡ Aynı Gün Teslimat</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
