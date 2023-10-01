/* eslint-disable jsx-a11y/click-events-have-key-events */
import { IProduct } from '@/types/product';
import { Image } from 'antd-mobile';
import { useGoTo } from '@/hooks';
import { ROUTE_KEYS } from '@/routes/menu';
import styles from './ProductCard.module.less';

interface IProps {
  product: IProduct;
}

export const ProductCard = ({ product }: IProps) => {
  const { go } = useGoTo();
  const goToOrganization = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (id) { go(ROUTE_KEYS.ORGANIZATION, { id }); }
  };

  return (
    <div className={styles.container}>
      <Image src={product.cover} className={styles.cover} />
      <div className={styles.info}>
        <div className={styles.name}>{product.name}</div>

        <div
          role="presentation"
          className={styles.organization}
          onClick={
            (e) => goToOrganization(e, product.organization?.id || '')
          }
        >
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
