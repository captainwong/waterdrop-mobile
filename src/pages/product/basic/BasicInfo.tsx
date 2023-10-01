import { IProduct } from '@/types/product';
import {
  Divider, DotLoading, Grid, Image,
} from 'antd-mobile';
import styles from './BasicInfo.module.less';

interface IProps {
  loading: boolean;
  product: IProduct | undefined;
}

export const BasicInfo = ({ loading, product }: IProps) => {
  if (loading) {
    return <DotLoading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src={product?.banner}
          alt="banner"
          className={styles.banner}
        />
        <div className={styles.title}>
          {product?.name}
        </div>
        <div className={styles.desc}>
          {product?.desc}
        </div>
      </div>
      <Divider />
      <Grid columns={3} gap={8} className={styles.grid}>
        <Grid.Item>
          库存：
          {product?.stock || 0}
        </Grid.Item>
        <Grid.Item>
          已售：
          {product?.sales || 0}
        </Grid.Item>
        <Grid.Item>
          限购：
          {product?.limit || 0}
        </Grid.Item>
      </Grid>
    </div>
  );
};
