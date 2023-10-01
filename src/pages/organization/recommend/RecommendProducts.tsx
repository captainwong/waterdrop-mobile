import {
  Card,
  Divider,
  DotLoading, Grid, Image, Result,
} from 'antd-mobile';
import { IOrganization } from '@/types/organization';
import { useProductsByOrganization } from '@/services/product';
import styles from './RecommendProducts.module.less';

interface IProps {
  loading: boolean;
  organization: IOrganization | undefined;
}

export const RecommendProducts = ({ loading, organization }: IProps) => {
  const {
    loading: recLoading, products,
  } = useProductsByOrganization(organization?.id || '');

  if (loading || !organization || recLoading) {
    return <DotLoading />;
  }

  if (!recLoading && products.length === 0) {
    return (
      <Result
        status="warning"
        title="没有找到相关课程"
      />
    );
  }

  return (
    <Card title="推荐课程" className={styles.container}>
      {
        products.map((product) => (
          <div key={product.id}>
            <Grid columns={12} className={styles.item}>
              <Grid.Item span={2}>
                <Image src={product.cover} alt="cover" className={styles.cover} />
              </Grid.Item>
              <Grid.Item span={8} className={styles.content}>
                <div className={styles.name}>
                  {product.name}
                </div>
                <div className={styles.desc}>
                  <span className={styles.descText}>
                    {product.desc}
                  </span>
                  <span className={styles.sales}>
                    已售&nbsp;
                    {product.sales || 0}
                  </span>
                </div>
              </Grid.Item>
              <Grid.Item span={2}>
                <div className={styles.price}>
                  ￥
                  {product.price}
                </div>
                <div className={styles.originalPrice}>
                  ￥
                  {product.originalPrice}
                </div>
              </Grid.Item>
            </Grid>
          </div>
        ))
      }
    </Card>
  );
};
