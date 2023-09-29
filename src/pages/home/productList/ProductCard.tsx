import { IProduct } from '@/types/product';
import { Image } from 'antd-mobile';
import styles from './ProductCard.module.less';

interface IProps {
  product: IProduct;
}

export const ProductCard = ({ product }:IProps) => {
  return (
    <div className={styles.container}>
      <Image src={product.cover} className={styles.cover} />
      <div className={styles.info}>
        <div className={styles.name}>{product.name}</div>

        <div className={styles.organization}>
          <span className={styles.organizationName}>
            {product.organization?.name}
          </span>
          <span className={styles.organizationDistance}>
            -
          </span>
        </div>

        <div className={styles.prices}>
          <div className={styles.price}>
            ￥
            {product.price}
          </div>
          <div className={styles.originalPrice}>
            ￥
            {product.originalPrice}
          </div>
        </div>
      </div>
    </div>
  );
};
