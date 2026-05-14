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
  const imageList: string[] = JSON.parse(images || '[]');
  const mainImage = imageList[0];

  return (
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
          {featured && <span className={styles.productCard__featured}>Öne Çıkan</span>}
          {!inStock && <span className={styles.productCard__outOfStock}>Stokta Yok</span>}
        </div>
      </div>
      <div className={styles.productCard__body}>
        {categoryName && (
          <div className={styles.productCard__category}>{categoryName}</div>
        )}
        <h3 className={styles.productCard__name}>{name}</h3>
        <div className={styles.productCard__price}>{formatPrice(price)}</div>
      </div>
    </Link>
  );
}
