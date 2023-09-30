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
          <span className={styles.orgName}>
            {product.organization?.name}
          </span>
          <span className={styles.distance}>
            {product.distance}
          </span>
        </div>

        <div className={styles.prices}>
          <span className={styles.price}>
            ￥
            {product.price}
          </span>
          <span className={styles.originalPrice}>
            ￥
            {product.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};
