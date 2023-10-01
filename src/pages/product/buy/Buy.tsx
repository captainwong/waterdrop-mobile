import { IProduct } from '@/types/product';
import { Grid } from 'antd-mobile';
import { PhoneFill } from 'antd-mobile-icons';
import styles from './Buy.module.less';

interface IProps {
  product: IProduct | undefined;
}

export const Buy = ({ product }: IProps) => {
  return (
    <Grid columns={10} className={styles.container}>
      <Grid.Item span={4}>
        <span className={styles.price}>
          ￥
          {product?.price}
        </span>
        <span className={styles.originalPrice}>
          ￥
          {product?.originalPrice}
        </span>
      </Grid.Item>
      <Grid.Item span={2}>
        <a href={`tel:${product?.organization?.tel}`}>
          <PhoneFill className={styles.tel} />
        </a>
      </Grid.Item>
      <Grid.Item span={4} className={styles.buy}>
        立即抢购
      </Grid.Item>
    </Grid>
  );
};
